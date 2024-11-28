<?php

declare(strict_types=1);

namespace Tests\Unit\Controllers\Api\User;

use App\Events\Users\UserLoggedInEvent;
use App\Events\Users\UserRegisteredEvent;
use App\Models\User;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthenticationControllerTest extends TestCase
{
    #[Test]
    public function test_register_creates_user_and_returns_token()
    {
        Event::fake();

        $response = $this->postJson(route('user.register'), [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'uuid',
                    'email',
                    'token',
                    'created_at',
                    'updated_at',
                    'preference' => [
                        'uuid',
                    ],
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);

        Event::assertDispatched(UserRegisteredEvent::class);
    }

    public function test_register_user_validation_error(): void
    {
        $response = $this->postJson('/api/user/register', [
            'email' => 'invalid-email',
            'password' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    /**
     * Test user login.
     */
    public function test_login_user_successfully(): void
    {
        Event::fake();

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/user/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['data' => ['uuid', 'email', 'created_at', 'updated_at', 'token']]);

        Event::assertDispatched(UserLoggedInEvent::class);
    }

    public function test_login_user_invalid_credentials(): void
    {
        $response = $this->postJson('/api/user/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Invalid Login details', 'code' => 401]);
    }

    /**
     * Test user logout.
     */
    public function test_logout_user_successfully(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->deleteJson('/api/user/logout');

        $response->assertStatus(200);

        $this->assertDatabaseMissing('personal_access_tokens', ['tokenable_id' => $user->id]);
    }

    public function test_logout_unauthorized(): void
    {
        $response = $this->deleteJson('/api/user/logout');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_logout_revokes_tokens()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->deleteJson('/api/user/logout');

        $response->assertStatus(200)
            ->assertJson([]);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
        ]);
    }
}
