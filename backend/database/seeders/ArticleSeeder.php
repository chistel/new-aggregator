<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        Artisan::call('articles:fetch');
    }
}
