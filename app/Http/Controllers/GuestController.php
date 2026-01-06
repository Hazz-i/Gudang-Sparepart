<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class GuestController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'in_stock')->limit(8)->get();
        return inertia('welcome', [
            'products' => $products,
        ]);
    }

    public function allProducts(Request $request)
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

        return inertia('products/index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['category', 'brand', 'status', 'search']),
        ]);
    }   

    public function productShow(Product $product)
    {
        return inertia('products/show', [
            'product' => $product,
        ]);
    }   
}
