<?php

declare(strict_types=1);

namespace App\Traits;

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait UsesUuid
{
    protected static function bootUsesUuid()
    {
        static::creating(function (Model $model) {
            $model->uuid = Str::uuid()->toString();
        });
    }
}
