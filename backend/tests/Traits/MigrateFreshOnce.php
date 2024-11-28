<?php

namespace Tests\Traits;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\ParallelTesting;

trait MigrateFreshOnce
{
    /**
     * If true, setup has run at least once.
     */
    protected static bool $setUpHasRunOnce = false;

    /**
     * After the first run of setUp "migrate:fresh --seed"
     */
    protected function setUp(): void
    {
        parent::setUp();

        // We want to run this only for Normal testing, Parallel testing works differently
        if (! static::$setUpHasRunOnce && ParallelTesting::token() === false) {
            Artisan::call('migrate:fresh');
            static::$setUpHasRunOnce = true;
        }
    }
}
