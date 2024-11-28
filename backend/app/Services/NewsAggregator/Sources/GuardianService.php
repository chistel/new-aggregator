<?php

declare(strict_types=1);

namespace App\Services\NewsAggregator\Sources;

use App\Contracts\NewsSourceService;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class GuardianService implements NewsSourceService
{
    protected string $baseUrl = 'https://content.guardianapis.com';

    public function __construct(protected string $apiKey) {}

    public function providerName(): string
    {
        return 'guardian';
    }

    public function fetchArticles(): Collection
    {
        $response = Http::get("$this->baseUrl/search", [
            'api-key' => $this->apiKey,
            'show-fields' => 'all',
        ]);

        if ($response->successful()) {
            return collect($response->json('response.results'))->filter(function ($article) {
                return
                    $article['webTitle'] &&
                    Arr::get($article, 'fields.trailText') &&
                    Arr::get($article, 'fields.thumbnail') &&
                    $article['webPublicationDate'];
            })->map(function ($article) {
                return [
                    'title' => $article['webTitle'],
                    'source' => 'The Guardian',
                    'author' => 'The Guardian',
                    'provider' => 'guardian',
                    'description' => Arr::get($article, 'fields.trailText'),
                    'image_url' => Arr::get($article, 'fields.thumbnail'),
                    'url' => $article['webUrl'],
                    'published_at' => $article['webPublicationDate'],
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
