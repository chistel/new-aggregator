<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\NewsAggregator\NewsAggregatorService;
use App\Services\NewsAggregator\Sources\GuardianService;
use App\Services\NewsAggregator\Sources\NewsAPIService;
use App\Services\NewsAggregator\Sources\NYTimesService;
use Illuminate\Support\ServiceProvider;

class NewsAggregatorServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(NewsAPIService::class, function () {
            return new NewsAPIService(config('services.newsapi.key'));
        });

        $this->app->singleton(GuardianService::class, function () {
            return new GuardianService(config('services.guardian.key'));
        });

        $this->app->singleton(NYTimesService::class, function () {
            return new NYTimesService(config('services.nytimes.key'));
        });

        $this->app->singleton(NewsAggregatorService::class, function ($app) {
            return new NewsAggregatorService([
                $app->make(NewsAPIService::class),
                $app->make(GuardianService::class),
                $app->make(NYTimesService::class),
            ]);
        });
    }

    public function boot(): void
    {
        //
    }
}
