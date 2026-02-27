<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'original_price',
        'price',
        'stock',
        'status',
        'image_url',
        'category',
        'brand',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
