<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => ucwords($this->faker->colorName . ' ' . $this->faker->word),
            'price' => $this->faker->randomFloat(2, 3, 5), // Generates a random price between 3 and 5 euros
        ];
    }
}

