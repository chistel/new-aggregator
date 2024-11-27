<?php

declare(strict_types=1);

namespace App\Services\NewsAggregator;

use Illuminate\Support\Collection;

class NewsAggregatorService
{
    public function __construct(protected array $providers = []) {}

    /**
     * Aggregate articles from all Providers.
     */
    public function fetchArticles(): Collection
    {
        $allArticles = collect();

        foreach ($this->providers as $provider) {
            $allArticles = $allArticles->merge($provider->fetchArticles());
            if (app()->environment('testing') === false) {
                sleep(4);
            }
        }

        return $allArticles;
    }
}
