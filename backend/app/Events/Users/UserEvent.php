<?php

declare(strict_types=1);

namespace App\Events\Users;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public User $user) {}
}
