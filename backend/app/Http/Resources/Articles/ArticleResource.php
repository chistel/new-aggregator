<?php

declare(strict_types=1);

namespace App\Http\Resources\Articles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid ?? null,
            'title' => $this->title,
            'description' => $this->description,
            'source' => $this->source,
            'published_at' => $this->published_at,
            'url' => $this->url,
            'category' => $this->category,
            'image_url' => $this->image_url,
            'provider' => $this->provider,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
