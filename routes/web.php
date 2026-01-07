<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ChatbotController;


// GUEST ROUTES
Route::get('/register', function () {
    return redirect()->route('login');
})->name('register');

Route::get('/', [GuestController::class, 'index'])->name('home');

Route::get('/products', [GuestController::class, 'allProducts'])->name('products.index');
Route::get('/products/{product}', [GuestController::class, 'productShow'])->name('products.show');
// Route::get('/products', [ProductController::class, 'index'])->name('products.index');
// Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::get('/booking-status', function () {
    return Inertia::render('booking-status');
})->name('booking.status');


// CHATBOT ROUTES
Route::get('/chatbot', [ChatbotController::class, 'index'])->name('chatbot.index');
Route::post('/chatbot/ask', [ChatbotController::class, 'ask'])->name('chatbot.ask');


// ADMIN ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/stock', function () {
            return Inertia::render('admin/stock/index');
        })->name('stock.index');

        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index');
        })->name('orders.index');

        Route::get('/settings', function () {
            return Inertia::render('admin/settings/index');
        })->name('settings.index');
    });
});

require __DIR__.'/settings.php';
