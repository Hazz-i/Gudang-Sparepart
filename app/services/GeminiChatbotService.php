<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Product;

class GeminiChatbotService
{
    private string $apiKey;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }


    private function retrieveRelevantContext(string $question): string
    {
        $questionLower = strtolower($question);
        
        // Mapping sinonim/alias untuk kategori sparepart
        $categoryAliases = [
            'rem' => ['brake', 'kampas', 'cakram', 'disc', 'caliper'],
            'oli' => ['oil', 'pelumas', 'lubricant'],
            'ban' => ['tire', 'velg', 'wheel', 'roda'],
            'mesin' => ['engine', 'piston', 'cylinder', 'silinder', 'boring'],
            'kelistrikan' => ['electrical', 'aki', 'battery', 'lampu', 'kabel'],
            'rantai' => ['chain', 'gear', 'sprocket', 'gir'],
            'filter' => ['saringan', 'udara', 'air filter'],
            'kopling' => ['clutch', 'kampas kopling'],
            'suspensi' => ['shock', 'shockbreaker', 'per', 'spring'],
        ];

        // Deteksi kategori dari pertanyaan
        $detectedCategory = null;
        foreach ($categoryAliases as $category => $aliases) {
            if (str_contains($questionLower, $category)) {
                $detectedCategory = $category;
                break;
            }
            foreach ($aliases as $alias) {
                if (str_contains($questionLower, $alias)) {
                    $detectedCategory = $category;
                    break 2;
                }
            }
        }

        // Query produk dengan prioritas kategori yang terdeteksi
        $query = Product::where('stock', '>', 0);
        
        if ($detectedCategory) {
            $query->where(function($q) use ($detectedCategory, $categoryAliases) {
                $q->where('category', 'LIKE', "%{$detectedCategory}%")
                  ->orWhere('name', 'LIKE', "%{$detectedCategory}%");
                
                foreach ($categoryAliases[$detectedCategory] ?? [] as $alias) {
                    $q->orWhere('category', 'LIKE', "%{$alias}%")
                      ->orWhere('name', 'LIKE', "%{$alias}%");
                }
            });
        }

        $products = $query->orderBy('created_at', 'desc')->limit(25)->get();

        // Jika tidak ada hasil dengan filter, ambil semua produk
        if ($products->isEmpty()) {
            $products = Product::where('stock', '>', 0)
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get();
        }

        if ($products->isEmpty()) {
            return "Maaf, saat ini tidak ada produk sparepart yang tersedia dalam stok.";
        }

        // Hitung skor relevansi berdasarkan multiple factors
        $searchTerms = array_filter(explode(' ', $questionLower), fn($w) => strlen($w) > 2);
        
        $ranked = $products->map(function ($p) use ($searchTerms, $detectedCategory) {
            $searchableText = strtolower(
                $p->name . ' ' .
                ($p->description ?? '') . ' ' .
                ($p->category ?? '') . ' ' .
                ($p->brand ?? '') . ' ' .
                ($p->material ?? '')
            );

            $score = 0;
            
            // Skor untuk setiap kata yang cocok
            foreach ($searchTerms as $term) {
                if (str_contains($searchableText, $term)) {
                    $score += 2;
                    // Bonus jika cocok di nama produk
                    if (str_contains(strtolower($p->name), $term)) {
                        $score += 3;
                    }
                }
            }
            
            // Bonus untuk kategori yang terdeteksi
            if ($detectedCategory && str_contains(strtolower($p->category ?? ''), $detectedCategory)) {
                $score += 5;
            }
            
            // Bonus untuk produk diskon
            if ($p->original_price > $p->price) {
                $score += 1;
            }
            
            // Bonus untuk stok tinggi
            if ($p->stock >= 10) {
                $score += 1;
            }

            $p->relevance_score = $score;
            return $p;
        })->sortByDesc('relevance_score')->take(6);

        // Format konteks dengan struktur yang lebih baik
        $context = "=== KATALOG PRODUK GUDANG SPAREPART ===\n\n";
        
        if ($detectedCategory) {
            $context .= "Kategori Terdeteksi: " . ucfirst($detectedCategory) . "\n\n";
        }

        $context .= "Produk yang tersedia:\n";
        $context .= str_repeat("-", 40) . "\n\n";

        $index = 1;
        foreach ($ranked as $p) {
            $context .= "【{$index}】 {$p->name}\n";
            $context .= "    ├─ Kategori  : {$p->category}\n";
            $context .= "    ├─ Merek     : {$p->brand}\n";
            
            if ($p->original_price > $p->price) {
                $discount = round((($p->original_price - $p->price) / $p->original_price) * 100);
                $context .= "    ├─ Harga     : Rp " . number_format($p->price, 0, ',', '.') . " (HEMAT {$discount}%)\n";
                $context .= "    │  └─ Normal : Rp " . number_format($p->original_price, 0, ',', '.') . "\n";
            } else {
                $context .= "    ├─ Harga     : Rp " . number_format($p->price, 0, ',', '.') . "\n";
            }
            
            $stockStatus = $p->stock > 10 ? "✅ Tersedia ({$p->stock} unit)" : 
                          ($p->stock > 0 ? "⚠️ Stok Terbatas ({$p->stock} unit)" : "❌ Habis");
            $context .= "    ├─ Stok      : {$stockStatus}\n";
            
            if (!empty($p->material)) {
                $context .= "    ├─ Material  : {$p->material}\n";
            }
            
            if (!empty($p->warranty)) {
                $context .= "    ├─ Garansi   : {$p->warranty}\n";
            }

            if (!empty($p->description)) {
                $desc = strlen($p->description) > 100 ? substr($p->description, 0, 100) . '...' : $p->description;
                $context .= "    └─ Info      : {$desc}\n";
            }

            $context .= "\n";
            $index++;
        }

        // Tambahkan ringkasan
        $totalProducts = $ranked->count();
        $priceRange = "Rp " . number_format($ranked->min('price'), 0, ',', '.') . 
                      " - Rp " . number_format($ranked->max('price'), 0, ',', '.');
        
        $context .= str_repeat("-", 40) . "\n";
        $context .= "📊 Ringkasan: {$totalProducts} produk ditampilkan | Rentang harga: {$priceRange}\n";

        return $context;
    }


    public function generateResponse(string $question): string
    {
        // 1. Ambil konteks produk dari database
        $context = $this->retrieveRelevantContext($question);

        // 2. Tambahkan konteks khusus jika pertanyaan berkaitan dengan cara pemesanan/booking
        $orderGuide = '';
        $keywords = [
            'cara pesan', 'cara order', 'cara membeli', 'cara booking', 'cara beli',
            'bagaimana pesan', 'bagaimana order', 'bagaimana booking',
            'checkout', 'pembayaran', 'pengiriman', 'ambil', 'pickup',
            'nomor booking', 'no booking', 'kode booking', 'status booking',
            'lacak pesanan', 'beli', 'tracking', 'transaksi', 'booking'
        ];
                    
        foreach ($keywords as $kw) {
            if (stripos($question, $kw) !== false) {
                // Baca file contexts.txt
                $contextFilePath = resource_path('js/lib/contexts.txt');
                if (file_exists($contextFilePath)) {
                    $orderGuide = "\n\n" . file_get_contents($contextFilePath);
                }
                break;
            }
        }

        // 3. Buat prompt gabungan
        $prompt = "Kamu adalah asisten chatbot Gudang Sparepart, toko sparepart motor terpercaya.\n\n" .
                  "Konteks produk sparepart:\n{$context}{$orderGuide}\n" .
                  "Pertanyaan pelanggan: {$question}\n\n" .
                  "Instruksi:\n" .
                  "- Berikan jawaban yang akurat, ramah, dan profesional\n" .
                  "- Bantu pelanggan memilih sparepart yang sesuai kebutuhan\n" .
                  "- Jika ditanya cara booking, jelaskan flow booking dengan jelas\n" .
                  "- Jangan menebak jika data tidak tersedia\n" .
                  "- Gunakan bahasa Indonesia yang baik dan sopan\n" .
                  "- Sertakan harga dan info stok jika relevan";

        // 4. Panggil API Gemini
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}?key={$this->apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ]);

        if (!$response->ok()) {
            return "Gagal terhubung ke Gemini API: " . $response->body();
        }

        $data = $response->json();
        return $data['candidates'][0]['content']['parts'][0]['text']
            ?? 'Tidak ada respons dari Gemini.';
    }
}
