<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory, UsesUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'uuid',
        'title',
        'author',
        'description',
        'content',
        'source',
        'published_at',
        'url',
        'category',
        'image_url',
        'provider',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    //    public function getRouteKeyName()
    //    {
    //        return 'uuid';
    //    }

    public function scopeFilterByKeyword(Builder $query, ?string $keyword = null): Builder
    {
        return $keyword ? $query->where('title', 'like', '%'.$keyword.'%')
            ->orWhere('description', 'like', '%'.$keyword.'%') : $query;
    }

    public function scopeFilterByProvider(Builder $query, ?string $provider = null): Builder
    {
        $provider = trim((string) $provider);

        if (! empty($provider)) {
            $query->where('provider', $provider);
        }

        return $query;
    }

    public function scopeFilterByCategory(Builder $query, ?string $category = null): Builder
    {
        return $category ? $query->where('category', $category) : $query;
    }

    //    public function scopeFilterByDate(Builder $query, $startDate = null, $endDate = null): Builder
    //    {
    //        if ($startDate) {
    //            $query->whereDate('published_at', '>=', $startDate);
    //        }
    //        if ($endDate) {
    //            $query->whereDate('published_at', '<=', $endDate);
    //        }
    //
    //        return $query;
    //    }
    public function scopeFilterByDate(Builder $query, $date = null): Builder
    {
        if ($date) {
            $query->whereDate('published_at', $date);
        }

        return $query;
    }
}
