<?php

declare(strict_types=1);

namespace Tests\Traits;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Support\Facades\ParallelTesting;

trait RefreshDatabaseOnce
{
    use RefreshDatabase {
        refreshDatabase as baseRefreshDatabase;
    }

    protected function refreshTestDatabase()
    {
        if (! RefreshDatabaseState::$migrated && ParallelTesting::token() === false) {
            $this->artisan('migrate:fresh', $this->migrateFreshUsing());

            $this->app[Kernel::class]->setArtisan(null);

            RefreshDatabaseState::$migrated = true;
        }

        $this->beginDatabaseTransaction();
    }
}
