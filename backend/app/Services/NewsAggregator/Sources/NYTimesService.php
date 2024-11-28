<?php

declare(strict_types=1);

namespace App\Services\NewsAggregator\Sources;

use App\Contracts\NewsSourceService;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class NYTimesService implements NewsSourceService
{
    protected string $baseUrl = 'https://api.nytimes.com/svc/topstories/v2';

    public function __construct(protected string $apiKey) {}

    public function providerName(): string
    {
        return 'nyt';
    }

    public function fetchArticles(): Collection
    {
        $response = Http::get("$this->baseUrl/home.json", [
            'api-key' => $this->apiKey,
        ]);

        if ($response->successful()) {

            return collect($response->json('results'))->filter(function ($article) {
                return
                    $article['title'] &&
                    $article['abstract'] &&
                    Arr::get($article, 'multimedia.0.url') &&
                    $article['created_date'];
            })->map(function ($article) {
                return [
                    'title' => $article['title'],
                    'source' => 'The New York Times',
                    'provider' => 'nyt',
                    'author' => 'The New York Times',
                    'description' => $article['abstract'],
                    'image_url' => Arr::get($article, 'multimedia.0.url'),
                    'url' => $article['url'],
                    'published_at' => $article['created_date'],
                    'category' => $article['section'],
                ];
            })->values();
        }

        return collect();
    }

    public function searchArticles(array $params = []): Collection
    {
        return collect();
    }
}
