<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'confirmed', 'cancelled'];
        $paymentMethods = ['Transfer Bank', 'COD', 'QRIS', 'E-Wallet'];

        // Customer names for realistic data
        $customers = [
            ['name' => 'Ahmad Rizki', 'email' => 'ahmad.rizki@email.com', 'phone' => '081234567890'],
            ['name' => 'Budi Santoso', 'email' => 'budi.santoso@email.com', 'phone' => '082345678901'],
            ['name' => 'Citra Dewi', 'email' => 'citra.dewi@email.com', 'phone' => '083456789012'],
            ['name' => 'Dimas Prasetyo', 'email' => 'dimas.prasetyo@email.com', 'phone' => '084567890123'],
            ['name' => 'Eka Putri', 'email' => 'eka.putri@email.com', 'phone' => '085678901234'],
            ['name' => 'Fajar Nugroho', 'email' => 'fajar.nugroho@email.com', 'phone' => '086789012345'],
            ['name' => 'Gita Rahayu', 'email' => 'gita.rahayu@email.com', 'phone' => '087890123456'],
            ['name' => 'Hendra Wijaya', 'email' => 'hendra.wijaya@email.com', 'phone' => '088901234567'],
            ['name' => 'Indah Permata', 'email' => 'indah.permata@email.com', 'phone' => '089012345678'],
            ['name' => 'Joko Susilo', 'email' => 'joko.susilo@email.com', 'phone' => '081122334455'],
        ];

        // Get all product IDs from database
        $productIds = Product::pluck('id')->toArray();

        // Generate 20 orders with random products
        for ($i = 0; $i < 20; $i++) {
            $customer = fake()->randomElement($customers);
            $productId = fake()->randomElement($productIds);
            $product = Product::find($productId);
            $quantity = fake()->numberBetween(1, 5);
            $totalPrice = $product->price * $quantity;

            // Generate booking code: ORD-YYYYMMDD-XXXXX
            $bookingCode = 'ORD-' . now()->subDays(fake()->numberBetween(0, 30))->format('Ymd') . '-' . strtoupper(fake()->randomLetter() . fake()->randomNumber(4, true));

            Order::create([
                'name' => $customer['name'],
                'email' => $customer['email'],
                'phone' => $customer['phone'],
                'booking_code' => $bookingCode,
                'evidence' => 'https://picsum.photos/seed/' . ($i + 1) . '/400/400',
                'status' => fake()->randomElement($statuses),
                'quantity' => $quantity,
                'total_price' => $totalPrice,
                'payment_method' => fake()->randomElement($paymentMethods),
                'product_id' => $productId,
                'created_at' => now()->subDays(fake()->numberBetween(0, 30))->subHours(fake()->numberBetween(0, 23)),
            ]);
        }
    }
}
