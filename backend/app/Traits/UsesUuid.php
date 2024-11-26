<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Str;

trait UsesUuid
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid()->toString();
        });
    }
}
