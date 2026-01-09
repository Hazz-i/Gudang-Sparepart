<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;


// GUEST ROUTES
Route::get('/register', function () {
    return redirect()->route('login');
})->name('register');

Route::get('/', [GuestController::class, 'index'])->name('home');

Route::get('/products', [GuestController::class, 'allProducts'])->name('products.index');
Route::get('/products/{product}', [GuestController::class, 'productShow'])->name('products.show');

// Customer order route (no auth required)
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

Route::get('/booking-status', [GuestController::class, 'bookingStatus'])->name('booking.status');
Route::post('/booking-status', [GuestController::class, 'checkBookingStatus'])->name('booking.check');


// CHATBOT ROUTES
Route::get('/chatbot', [ChatbotController::class, 'index'])->name('chatbot.index');
Route::post('/chatbot/ask', [ChatbotController::class, 'ask'])->name('chatbot.ask');


// ADMIN ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/stock', [ProductController::class, 'index'])->name('stock.index');
    Route::post('/stock', [ProductController::class, 'store'])->name('stock.store');
    Route::put('/stock/{product}', [ProductController::class, 'update'])->name('stock.update');
    Route::post('/stock/{product}', [ProductController::class, 'update'])->name('stock.update.post');
    Route::delete('/stock/{product}', [ProductController::class, 'destroy'])->name('stock.destroy');

    // Orders routes (admin)
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');

    // Settings routes
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile.update');
    Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password.update');
});

// require __DIR__.'/settings.php';

