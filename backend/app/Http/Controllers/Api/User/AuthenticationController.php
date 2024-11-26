<?php

declare(strict_types=1);

namespace app\Http\Controllers\Api\User;

use App\Events\Users\UserLoggedInEvent;
use App\Events\Users\UserRegisteredEvent;
use app\Http\Controllers\Api\Abstracts\BaseController;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Resources\Users\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use OpenApi\Annotations as OA;

class AuthenticationController extends BaseController
{
    /**
     * User registration
     *
     * @OA\Post(
     *     path="/user/register",
     *     summary="Register a new user",
     *     tags={"Authentication"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="User registered successfully",
     *
     *         @OA\JsonContent(ref="#/components/schemas/UserResource")
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Invalid data provided")
     *         )
     *     )
     * )
     */
    public function register(RegisterRequest $request): UserResource
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('NewsAggregatorToken')->plainTextToken;


        event(new UserRegisteredEvent($user));

        return new UserResource($user->refresh(), $token);
    }

    /**
     * User login
     *
     * @OA\Post(
     *     path="/user/login",
     *     summary="Log in an existing user",
     *     tags={"Authentication"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *
     *         @OA\JsonContent(ref="#/components/schemas/UserResource")
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Invalid credentials")
     *         )
     *     )
     * )
     */
    public function login(LoginRequest $request): JsonResponse|UserResource
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            //$request->session()->regenerate();
            $user = auth()->user();
            $token = $user->createToken('NewsAggregatorToken')->plainTextToken;

            event(new UserLoggedInEvent($user));

            return new UserResource($user->refresh(), $token);
        }

        return $this->sendError(message:'Invalid Login details', code: 401);
    }

    /**
     * Log out the current user
     *
     * @OA\Delete(
     *     path="/user/logout",
     *     summary="Log out the current user",
     *     tags={"Authentication"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Logged out successfully")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json();
    }
}
