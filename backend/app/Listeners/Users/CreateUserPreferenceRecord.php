<?php

declare(strict_types=1);

namespace App\Listeners\Users;

use App\Events\Users\UserLoggedInEvent;
use App\Events\Users\UserRegisteredEvent;

class CreateUserPreferenceRecord
{
    public function handle(UserRegisteredEvent|UserLoggedInEvent $event): void
    {
        $user = $event->user;

        if (! $user->preferences) {
            $user->preferences()->create([]);
        }
    }
}
