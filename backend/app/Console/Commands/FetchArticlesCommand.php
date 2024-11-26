<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Jobs\Articles\PullArticlesJob;
use Illuminate\Console\Command;

class FetchArticlesCommand extends Command
{
    protected $signature = 'articles:fetch';

    protected $description = 'Fetch articles from multiple news sources';

    public function handle(): void
    {
        dispatch(new PullArticlesJob)->delay(3);
    }
}
