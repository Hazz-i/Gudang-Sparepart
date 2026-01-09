<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with real data.
     */
    public function index()
    {
        // Stats
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalStock = Product::sum('stock');
        $lowStockCount = Product::where('status', 'low_stock')->orWhere('status', 'out_of_stock')->count();

        // Low stock products (stock <= 10 or out of stock)
        $lowStockProducts = Product::whereIn('status', ['low_stock', 'out_of_stock'])
            ->orderBy('stock', 'asc')
            ->limit(5)
            ->get();

        // Order stats
        $pendingOrders = Order::where('status', 'pending')->count();
        $confirmedOrders = Order::where('status', 'confirmed')->count();
        $cancelledOrders = Order::where('status', 'cancelled')->count();
        $completedOrders = Order::where('status', 'completed')->count();

        // Recent orders
        $recentOrders = Order::with('product')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalProducts' => $totalProducts,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
            ],
            'lowStockProducts' => $lowStockProducts,
            'orderStats' => [
                'pending' => $pendingOrders,
                'confirmed' => $confirmedOrders,
                'cancelled' => $cancelledOrders,
                'completed' => $completedOrders,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
