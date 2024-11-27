<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Support\Collection;

interface NewsSourceService
{
    public function providerName(): string;

    /**
     * Fetch articles from the news source.
     */
    public function fetchArticles(): Collection;
}
