<?php

declare(strict_types=1);

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\RefreshDatabaseOnce;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabaseOnce;

    /**
     * All the dispatched jobs.
     */
    protected array $dispatchedJobs = [];

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    protected function migrateUsing(): array
    {
        return [];
    }
}
