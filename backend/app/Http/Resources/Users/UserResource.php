<?php

declare(strict_types=1);

namespace App\Http\Resources\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private ?string $token = null;

    public function __construct($resource, ?string $token = null)
    {
        parent::__construct($resource);

        $this->token = $token;
    }

    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid ?? null,
            'name' => $this->name,
            'email' => $this->email,
            'token' => $this->when($this->token, $this->token),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'preference' => new UserPreferenceResource($this->preferences),
        ];
    }
}
