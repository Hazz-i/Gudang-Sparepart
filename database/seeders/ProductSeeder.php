<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = ['Bosch', 'Denso', 'NGK', 'Aisin', 'Continental', 'Valeo', 'Delphi', 'Mahle', 'ACDelco', 'Brembo'];

        $products = [
            ['name' => 'Kampas Rem Set', 'category' => 'Sistem Rem'],
            ['name' => 'Filter Oli', 'category' => 'Filter'],
            ['name' => 'Busi', 'category' => 'Komponen Mesin'],
            ['name' => 'Filter Udara', 'category' => 'Filter'],
            ['name' => 'Alternator', 'category' => 'Kelistrikan'],
            ['name' => 'Shock Breaker', 'category' => 'Suspensi'],
            ['name' => 'Kopling Set', 'category' => 'Transmisi'],
            ['name' => 'Lampu Depan', 'category' => 'Lampu'],
            ['name' => 'Radiator', 'category' => 'Komponen Mesin'],
            ['name' => 'Aki', 'category' => 'Kelistrikan'],
            ['name' => 'Timing Belt', 'category' => 'Komponen Mesin'],
            ['name' => 'Pompa Bensin', 'category' => 'Komponen Mesin'],
            ['name' => 'Dinamo Starter', 'category' => 'Kelistrikan'],
            ['name' => 'CV Joint', 'category' => 'Transmisi'],
            ['name' => 'Cakram Rem', 'category' => 'Sistem Rem'],
            ['name' => 'Bearing Roda', 'category' => 'Suspensi'],
            ['name' => 'Koil Pengapian', 'category' => 'Kelistrikan'],
            ['name' => 'Pompa Air', 'category' => 'Komponen Mesin'],
            ['name' => 'Filter Kabin', 'category' => 'Filter'],
            ['name' => 'Lampu Belakang', 'category' => 'Lampu'],
            ['name' => 'Spion', 'category' => 'Body Parts'],
            ['name' => 'Bumper', 'category' => 'Body Parts'],
            ['name' => 'Handle Pintu', 'category' => 'Body Parts'],
            ['name' => 'Wiper', 'category' => 'Body Parts'],
            ['name' => 'Thermostat', 'category' => 'Komponen Mesin'],
        ];

        foreach ($products as $index => $product) {
            $originalPrice = fake()->randomFloat(2, 50000, 2000000);
            $discount = fake()->randomFloat(2, 0, 0.3);
            $price = $originalPrice * (1 - $discount);
            $stock = fake()->numberBetween(0, 100);

            // Determine status based on stock
            $status = match (true) {
                $stock === 0 => 'out_of_stock',
                $stock <= 10 => 'low_stock',
                default => 'in_stock',
            };

            Product::create([
                'name' => $product['name'],
                'description' => fake()->paragraph(2),
                'original_price' => $originalPrice,
                'price' => $price,
                'stock' => $stock,
                'status' => $status,
                'image_url' => 'https://picsum.photos/seed/' . ($index + 1) . '/400/400',
                'category' => $product['category'],
                'brand' => fake()->randomElement($brands),
            ]);
        }
    }
}
