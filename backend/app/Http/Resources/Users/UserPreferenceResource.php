<?php

declare(strict_types=1);

namespace App\Http\Resources\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPreferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid ?? null,
            'providers' => $this->providers,
            'authors' => $this->authors,
            'categories' => $this->categories,
        ];
    }
}
