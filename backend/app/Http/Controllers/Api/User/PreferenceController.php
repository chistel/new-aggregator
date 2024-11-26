<?php

declare(strict_types=1);

namespace app\Http\Controllers\Api\User;

use app\Http\Controllers\Api\Abstracts\BaseController;
use App\Http\Requests\User\UserPreferenceRequest;
use App\Http\Resources\Users\UserResource;
use App\Models\User;
use OpenApi\Annotations as OA;

class PreferenceController extends BaseController
{
    /**
     * @OA\Post(
     *     path="/user/preferences",
     *     summary="Store or update user preferences",
     *     description="This endpoint stores or updates the user preferences like providers, categories, and authors.",
     *     operationId="storeUserPreferences",
     *     tags={"User Preferences"},
     *     security={{
     *         "bearerAuth": {}
     *     }},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"providers", "categories", "authors"},
     *
     *             @OA\Property(property="providers", type="array", items=@OA\Items(type="string"), description="List of providers"),
     *             @OA\Property(property="categories", type="array", items=@OA\Items(type="string"), description="List of categories"),
     *             @OA\Property(property="authors", type="array", items=@OA\Items(type="string"), description="List of authors")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="User preferences successfully stored or updated",
     *
     *         @OA\JsonContent(ref="#/components/schemas/UserResource")
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Bad request, invalid input",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Validation failed")
     *         )
     *     )
     * )
     */
    public function store(UserPreferenceRequest $request): UserResource
    {
        /** @var User $user */
        $user = $request->user();
        $user->preferences()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only(['providers', 'categories', 'authors'])
        );

        return new UserResource($user->refresh());
    }
}
