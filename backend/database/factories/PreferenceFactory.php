<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PreferenceFactory>
 */
class PreferenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid,
            'providers' => $this->faker->randomElements,
            'authors' => $this->faker->randomElements,
            'categories' => $this->faker->randomElements,
        ];
    }
}
