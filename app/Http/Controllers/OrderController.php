<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders for admin.
     */
    public function index()
    {
        $orders = Order::with('product')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Store a newly created order from customer (product show page).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|max:50',
            'product_id' => 'required|exists:products,id',
        ]);

        // Get product to calculate total price
        $product = Product::findOrFail($validated['product_id']);
        
        // Check stock availability
        if ($product->stock < $validated['quantity']) {
            return back()->withErrors(['quantity' => 'Stok tidak mencukupi']);
        }

        // Generate booking code
        $bookingCode = 'ORD-' . now()->format('Ymd') . '-' . strtoupper(substr(uniqid(), -5));

        // Create order
        $order = Order::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'booking_code' => $bookingCode,
            'status' => 'pending',
            'quantity' => $validated['quantity'],
            'total_price' => $product->price * $validated['quantity'],
            'payment_method' => $validated['payment_method'],
            'product_id' => $validated['product_id'],
        ]);

        // Reduce product stock
        $product->decrement('stock', $validated['quantity']);
        
        // Update product status if needed
        if ($product->stock === 0) {
            $product->update(['status' => 'out_of_stock']);
        } elseif ($product->stock <= 10) {
            $product->update(['status' => 'low_stock']);
        }

        return redirect()->route('booking.status')->with([
            'success' => 'Pesanan berhasil dibuat!',
            'booking_code' => $bookingCode,
        ]);
    }

    /**
     * Update order status (admin only).
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        // If cancelling, restore stock
        if ($validated['status'] === 'cancelled' && $order->status !== 'cancelled') {
            $product = $order->product;
            $product->increment('stock', $order->quantity);
            
            // Update product status
            if ($product->stock > 10) {
                $product->update(['status' => 'in_stock']);
            } elseif ($product->stock > 0) {
                $product->update(['status' => 'low_stock']);
            }
        }

        $order->update(['status' => $validated['status']]);

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
