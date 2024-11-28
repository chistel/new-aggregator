<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ArticleController;
use app\Http\Controllers\Api\User\AuthenticationController;
use app\Http\Controllers\Api\User\PasswordResetController;
use app\Http\Controllers\Api\User\PreferenceController;
use app\Http\Controllers\Api\User\UserPersonalisedFeedController;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
    Route::as('register')->post('/register', [AuthenticationController::class, 'register']);
    Route::as('login')->post('/login', [AuthenticationController::class, 'login']);
    Route::group(['prefix' => 'password-reset'], function () {
        Route::post('/request', [PasswordResetController::class, 'sendResetLinkEmail']);
        Route::post('/change', [PasswordResetController::class, 'resetPassword']);
    });
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', function (Request $request) {
            return new UserResource($request->user());
        });
        Route::delete('/logout', [AuthenticationController::class, 'logout']);
        Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
        Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

        Route::post('/preferences', [PreferenceController::class, 'store']);
    });
});

Route::group(['prefix' => 'articles'], function () {
    Route::get('/', [ArticleController::class, 'index']);
    Route::get('/single/{articleId}', [ArticleController::class, 'single']);
    Route::get('/personalized', UserPersonalisedFeedController::class)->middleware(['auth:sanctum']);
});
