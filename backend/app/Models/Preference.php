<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\UsesUuid;
use Database\Factories\PreferenceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Preference extends Model
{
    /** @use HasFactory<PreferenceFactory> */
    use HasFactory, UsesUuid;

    protected $fillable = [
        'uuid',
        'providers',
        'categories',
        'authors',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'providers' => 'array',
            'categories' => 'array',
            'authors' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
