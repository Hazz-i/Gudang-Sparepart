<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Order;

class GuestController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'in_stock')->limit(8)->orderBy('created_at', 'desc')->get();
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

        $products = $query->latest()->paginate(16);

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
        $recommendedProducts = Product::where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return inertia('products/show', [
            'product' => $product,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }

    /**
     * Show checkout page for a product
     */
    public function checkout(Product $product)
    {
        return inertia('products/checkout', [
            'product' => $product,
        ]);
    }

    /**
     * Show booking status page
     */
    public function bookingStatus()
    {
        return inertia('booking-status');
    }

    /**
     * Check order status by booking code
     */
    public function checkBookingStatus(Request $request)
    {
        $request->validate([
            'booking_code' => 'required|string',
        ]);

        $order = Order::with('product')
            ->where('booking_code', $request->booking_code)
            ->first();

        if (!$order) {
            return back()->withErrors([
                'booking_code' => 'Kode booking tidak ditemukan.',
            ]);
        }

        return inertia('booking-status', [
            'order' => $order,
        ]);
    }
}

