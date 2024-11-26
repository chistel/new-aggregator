<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use app\Http\Controllers\Api\Abstracts\BaseController;
use App\Http\Resources\Articles\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="ArticleCollection",
 *     type="array",
 *
 *     @OA\Items(ref="#/components/schemas/ArticleResource")
 * )
 */
class ArticleController extends BaseController
{
    /**
     * Get a paginated list of articles.
     *
     * @OA\Get(
     *     path="/articles",
     *     summary="List articles",
     *     tags={"Articles"},
     *
     *     @OA\Parameter(
     *         name="keyword",
     *         in="query",
     *         description="Keyword to filter articles",
     *         required=false,
     *
     *         @OA\Schema(type="string")
     *     ),
     *
     *     @OA\Parameter(
     *         name="provider",
     *         in="query",
     *         description="provider to filter articles",
     *         required=false,
     *
     *         @OA\Schema(type="string")
     *     ),
     *
     *     @OA\Parameter(
     *         name="category",
     *         in="query",
     *         description="Category to filter articles",
     *         required=false,
     *
     *         @OA\Schema(type="string")
     *     ),
     *
     *     @OA\Parameter(
     *         name="date",
     *         in="query",
     *         description="Filter articles for selected date (YYYY-MM-DD)",
     *         required=false,
     *
     *         @OA\Schema(type="string", format="date")
     *     ),
     *
     *     @OA\Parameter(
     *          name="page",
     *          in="query",
     *          description="next page",
     *          required=false,
     *
     *          @OA\Schema(type="string")
     *      ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *
     *         @OA\JsonContent(ref="#/components/schemas/ArticleCollection")
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Invalid query parameters")
     *         )
     *     )
     * )
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $articles = Article::query()
            ->latest()
            ->filterByKeyword($request->keyword)
            ->filterByProvider($request->provider)
            ->filterByCategory($request->category)
            ->filterByDate($request->date)
            ->paginate(10);

        return ArticleResource::collection($articles);
    }

    /**
     * @OA\Get(
     *     path="/articles/single/{articleId}",
     *     summary="Get a single article by articleId",
     *     tags={"Articles"},
     *
     *     @OA\Parameter(
     *         name="articleId",
     *         in="path",
     *         required=true,
     *
     *         @OA\Schema(type="string", example="ab9ecf70-2fa2-4817-9564-34e5a5a5b98d")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Single article",
     *
     *         @OA\JsonContent(ref="#/components/schemas/ArticleResource")
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Article not found")
     *         )
     *     )
     * )
     */
    public function single(Request $request): ArticleResource
    {
        $article = Article::where('uuid', $request->route('articleId'))->first();
        if (! $article) {
            abort(404, 'Article not found');
        }

        return new ArticleResource($article);
    }
}
