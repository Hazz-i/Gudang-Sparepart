<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


// GUEST ROUTES
Route::get('/register', function () {
    return redirect()->route('login');
})->name('register');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/products', function () {
    return Inertia::render('products/index');
})->name('products.index');

Route::get('/products/{id}', function ($id) {
    return Inertia::render('products/show', [
        'productId' => $id,
    ]);
})->name('products.show');

Route::get('/booking-status', function () {
    return Inertia::render('booking-status');
})->name('booking.status');


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
