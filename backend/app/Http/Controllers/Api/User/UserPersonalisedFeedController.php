<?php

declare(strict_types=1);

namespace app\Http\Controllers\Api\User;

use app\Http\Controllers\Api\Abstracts\BaseController;
use App\Http\Resources\Articles\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use OpenApi\Annotations as OA;

/**
 * @OA\Get(
 *     path="/api/user/personalized-feed",
 *     summary="Get personalized feed for user based on preferences",
 *     description="Fetches a personalized list of articles based on the user's preferences for sources, categories, and authors.",
 *     operationId="getUserPersonalizedFeed",
 *     tags={"User", "Articles"},
 *     security={{"bearerAuth": {}}},
 *
 *     @OA\Response(
 *         response=200,
 *         description="List of personalized articles returned successfully",
 *
 *         @OA\JsonContent(
 *             type="array",
 *
 *             @OA\Items(ref="#/components/schemas/ArticleResource")
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
 *     ),
 *
 *     @OA\Response(
 *         response=500,
 *         description="Server error",
 *
 *         @OA\JsonContent(
 *
 *             @OA\Property(property="message", type="string", example="An error occurred while fetching articles.")
 *         )
 *     )
 * )
 */
class UserPersonalisedFeedController extends BaseController
{
    public function __invoke(Request $request): JsonResponse|AnonymousResourceCollection
    {
        $preferences = $request->user()->preferences;

        $articles = Article::query()
            ->when($preferences->sources, function ($query) use ($preferences) {
                $query->whereIn('provider', $preferences->sources);
            })
            ->when($preferences->categories, function ($query) use ($preferences) {
                $query->whereIn('category', $preferences->categories);
            })
            ->when($preferences->authors, function ($query) use ($preferences) {
                $query->whereIn('author', $preferences->authors);
            })
            ->paginate(10);

        return ArticleResource::collection($articles);
    }
}
