<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'uuid' => $this->faker->uuid,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'source' => $this->faker->randomElement(['NewsAPI', 'The Guardian', 'BBC News', 'New York Times']),
            'author' => $this->faker->name(),
            'category' => $this->faker->word(),
            'published_at' => $this->faker->dateTimeThisYear(),
            'url' => $this->faker->url(),
        ];
    }
}
