<?php

declare(strict_types=1);

namespace app\Http\Controllers\Api\User;

use app\Http\Controllers\Api\Abstracts\BaseController;
use App\Http\Requests\User\RequestResetLinkRequest;
use App\Http\Requests\User\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use OpenApi\Annotations as OA;

class PasswordResetController extends BaseController
{
    /**
     * Send a password reset link to the user's email
     *
     * @OA\Post(
     *     path="/user/password/email",
     *     summary="Send password reset link",
     *     tags={"Password Reset"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"email"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Password reset link sent successfully",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="We have e-mailed your password reset link!")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Invalid email or request",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Invalid email or request")
     *         )
     *     )
     * )
     */
    public function sendResetLinkEmail(RequestResetLinkRequest $request): JsonResponse
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }

    /**
     * Reset password with the provided token and new password
     *
     * @OA\Post(
     *     path="/user/password/reset",
     *     summary="Reset the password",
     *     tags={"Password Reset"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"email", "password", "password_confirmation", "token"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="newPassword123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="newPassword123"),
     *             @OA\Property(property="token", type="string", example="reset-token-here")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successfully",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Your password has been reset successfully!")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Invalid token or password reset request",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Invalid token or password reset request")
     *         )
     *     )
     * )
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }
}
