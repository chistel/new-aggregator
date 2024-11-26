<?php

declare(strict_types=1);

namespace app\Http\Controllers\Api\Abstracts;

use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="News Aggregator",
 *     version="1.0.0",
 *     description="API endpoints to manage articles"
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     in="header",
 *     description="Enter your Bearer token to access the API endpoints"
 * )
 *
 * @OA\Schema(
 *     schema="UserPreferenceResource",
 *     type="object",
 *
 *     @OA\Property(property="uuid", type="string", example="123e4567-e89b-12d3-a456-426614174000", description="The unique identifier for the preference"),
 *     @OA\Property(property="providers", type="array", items=@OA\Items(type="string"), description="List of providers"),
 *     @OA\Property(property="authors", type="array", items=@OA\Items(type="string"), description="List of authors"),
 *     @OA\Property(property="categories", type="array", items=@OA\Items(type="string"), description="List of categories")
 * )
 *
 * @OA\Schema(
 *     schema="UserResource",
 *     type="object",
 *
 *     @OA\Property(property="uuid", type="string", example="123e4567-e89b-12d3-a456-426614174000", description="The unique identifier for the user"),
 *     @OA\Property(property="name", type="string", example="John Doe", description="The name of the user"),
 *     @OA\Property(property="email", type="string", example="john.doe@example.com", description="The email of the user"),
 *     @OA\Property(property="token", type="string", example="your-jwt-token", description="The user's authentication token", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2024-11-26T12:34:56", description="The user account creation date"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-11-26T12:34:56", description="The last update date of the user account"),
 *     @OA\Property(property="preference", ref="#/components/schemas/UserPreferenceResource", description="The user's preferences")
 * )
 *
 * @OA\Schema(
 *      schema="ArticleResource",
 *      type="object",
 *      required={"uuid", "title", "description", "source", "published_at", "url", "category", "image_url", "provider", "created_at", "updated_at"},
 *
 *      @OA\Property(property="uuid", type="string", example="123e4567-e89b-12d3-a456-426614174000"),
 *      @OA\Property(property="title", type="string", example="Article Title"),
 *      @OA\Property(property="description", type="string", example="This is a description of the article."),
 *      @OA\Property(property="source", type="string", example="Provider Name"),
 *      @OA\Property(property="published_at", type="string", format="date-time", example="2024-11-26T12:34:56"),
 *      @OA\Property(property="url", type="string", example="https://example.com/article"),
 *      @OA\Property(property="category", type="string", example="Category Name"),
 *      @OA\Property(property="image_url", type="string", example="https://example.com/image.jpg"),
 *      @OA\Property(property="provider", type="string", example="Provider Name"),
 *      @OA\Property(property="created_at", type="string", format="date-time", example="2024-11-26T12:34:56"),
 *      @OA\Property(property="updated_at", type="string", format="date-time", example="2024-11-26T12:34:56")
 *  )
 */
class BaseController extends Controller
{
    /**
     * success response method.
     */
    public function sendResponse(mixed $result = [], string $message = ''): JsonResponse
    {
        $response = [
            'success' => true,
            'data' => $result,
        ];

        if ($message) {
            $response['message'] = $message;
        }

        return response()->json($response);
    }

    /**
     * return error response.
     */
    public function sendError($message = '', array $errorMessages = [], int $code = 404): JsonResponse
    {
        $response = [
            'code' => $code
        ];

        if (! empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }
        if ($message) {
            $response['message'] = $message;
        }

        return response()->json($response, $code);
    }
}
