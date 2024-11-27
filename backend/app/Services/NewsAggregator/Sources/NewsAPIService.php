<?php

declare(strict_types=1);

namespace App\Services\NewsAggregator\Sources;

use App\Contracts\NewsSourceService;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class NewsAPIService implements NewsSourceService
{
    protected string $baseUrl = 'https://newsapi.org/v2';

    public function __construct(protected string $apiKey) {}

    public function providerName(): string
    {
        return 'news-api';
    }

    public function fetchArticles(): Collection
    {
        $response = Http::get("$this->baseUrl/everything", [
            'apiKey' => $this->apiKey,
            'language' => 'en',
        ]);

        if ($response->successful()) {
            return collect($response->json('articles'))->filter(function ($article) {
                return
                    $article['title'] &&
                    $article['description'] &&
                    $article['urlToImage'] &&
                    $article['publishedAt'];
            })->map(function ($article) {
                return [
                    'title' => str_contains($article['title'], '-') ? trim(substr($article['title'], 0, strrpos($article['title'], '-'))) : $article['title'],
                    'provider' => 'news-api',
                    'source' => Arr::get($article, 'source.name'),
                    'author' => $article['author'] ?? null,
                    'description' => $article['description'],
                    'content' => $article['content'],
                    'url' => $article['url'],
                    'image_url' => $article['urlToImage'],
                    'published_at' => $article['publishedAt'],
                ];
            })->values();
        }

        return collect();
    }
}
