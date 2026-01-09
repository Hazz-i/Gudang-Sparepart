<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'booking_code',
        'evidence',
        'status',
        'quantity',
        'total_price',
        'payment_method',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
