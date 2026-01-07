<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\SettingsController;


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
    
    Route::get('/stock', [ProductController::class, 'index'])->name('stock.index');
    Route::post('/stock', [ProductController::class, 'store'])->name('stock.store');
    Route::put('/stock/{product}', [ProductController::class, 'update'])->name('stock.update');
    Route::post('/stock/{product}', [ProductController::class, 'update'])->name('stock.update.post'); // For file upload with method spoofing
    Route::delete('/stock/{product}', [ProductController::class, 'destroy'])->name('stock.destroy');

    Route::get('/orders', function () {
        return Inertia::render('admin/orders/index');
    })->name('orders.index');

    // Settings routes
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile.update');
    Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password.update');
});

// require __DIR__.'/settings.php';
