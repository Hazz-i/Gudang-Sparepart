<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Filter by brand
        if ($request->has('brand') && $request->brand) {
            $query->where('brand', $request->brand);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Search by name
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->latest()->paginate(12);

        // Get unique categories and brands for filters
        $categories = Product::distinct()->pluck('category')->filter()->values();
        $brands = Product::distinct()->pluck('brand')->filter()->values();

        return inertia('admin/stock/index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['category', 'brand', 'status', 'search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'brand' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'warranty' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Determine status based on stock
        $stock = (int) $validated['stock'];
        if ($stock === 0) {
            $validated['status'] = 'out_of_stock';
        } elseif ($stock <= 10) {
            $validated['status'] = 'low_stock';
        } else {
            $validated['status'] = 'in_stock';
        }

        // Set original_price if not provided
        if (!isset($validated['original_price']) || !$validated['original_price']) {
            $validated['original_price'] = $validated['price'];
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        Product::create($validated);    

        return redirect()->route('stock.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // Get related products from the same category
        $relatedProducts = Product::where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->where('status', '!=', 'out_of_stock')
            ->limit(4)
            ->get();

        return inertia('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'brand' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'warranty' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Determine status based on stock
        $stock = (int) $validated['stock'];
        if ($stock === 0) {
            $validated['status'] = 'out_of_stock';
        } elseif ($stock <= 10) {
            $validated['status'] = 'low_stock';
        } else {
            $validated['status'] = 'in_stock';
        }

        // Set original_price if not provided
        if (!isset($validated['original_price']) || !$validated['original_price']) {
            $validated['original_price'] = $validated['price'];
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image_url && str_starts_with($product->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $product->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $product->update($validated);

        return redirect()->route('stock.index')->with('success', 'Produk berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image_url && str_starts_with($product->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $product->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $product->delete();

        return redirect()->route('stock.index')->with('success', 'Produk berhasil dihapus!');
    }
}
