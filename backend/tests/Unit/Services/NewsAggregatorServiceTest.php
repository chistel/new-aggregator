<?php

declare(strict_types=1);

namespace Tests\Unit\Services;

use App\Services\NewsAggregator\NewsAggregatorService;
use App\Services\NewsAggregator\Sources\GuardianService;
use App\Services\NewsAggregator\Sources\NewsAPIService;
use App\Services\NewsAggregator\Sources\NYTimesService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class NewsAggregatorServiceTest extends TestCase
{
    public function test_news_aggregator_fetches_articles_from_all_sources()
    {
        Http::fake([
            'newsapi.org/*' => Http::response([
                'articles' => [
                    [
                        'author' => 'Joel Khalili',
                        'source' => [
                            'id' => 'wired',
                            'name' => 'Wired',
                        ],
                        'title' => 'NewsAPI Article',
                        'content' => 'On the campaign trail, Trump went out of his way to court their favor. In July, speaking to thousands of bitcoiners at a conference in Nashville, Tennessee, Trump duly sang from the bitcoin hymn shee… [+2014 chars]',
                        'url' => 'https://newsapi.org/article1',
                        'description' => 'ok',
                        'urlToImage' => 'https://media.wired.com/photos/672bda0a90a94384370310f4/191:100/w_1280,c_limit/business_crypto_faithful_trump.jpg',
                        'publishedAt' => '2024-11-06T21:11:39Z',
                    ],
                ],
            ], 200),

            'content.guardianapis.com/*' => Http::response([
                'response' => [
                    'results' => [
                        [
                            'webTitle' => 'Guardian Article',
                            'webUrl' => 'https://guardian.com/article1',
                            'fields' => [
                                'trailText' => 'A short description of the article.',
                                'thumbnail' => 'https://guardian.com/image1.jpg',
                            ],
                            'webPublicationDate' => '2024-11-25T10:00:00Z',
                        ],
                    ],
                ],
            ], 200),

            'api.nytimes.com/*' => Http::response([
                'results' => [
                    [
                        'section' => 'business',
                        'subsection' => '',
                        'title' => 'After Trump’s Tariff Threat, Is a China Currency War Next?',
                        'abstract' => 'While China could offset American tariffs by letting its currency fall, that might endanger Beijing’s recent efforts to stabilize the economy.',
                        'url' => 'https://www.nytimes.com/2024/11/26/business/trump-tariffs-us-china-currency.html',
                        'uri' => 'nyt://article/cfd56cce-ff96-5054-a43a-cae19b1ebc7a',
                        'byline' => 'By Keith Bradsher',
                        'item_type' => 'Article',
                        'updated_date' => '2024-11-26T05:52:15-05:00',
                        'created_date' => '2024-11-26T05:15:03-05:00',
                        'published_date' => '2024-11-26T05:15:03-05:00',
                        'material_type_facet' => '',
                        'kicker' => '',
                        'des_facet' => [
                            'Economic Conditions and Trends',
                            'Protectionism (Trade)',
                            'Currency',
                            'International Trade and World Market',
                            'Customs (Tariff)',
                        ],
                        'org_facet' => ["People's Bank of China"],
                        'per_facet' => [],
                        'geo_facet' => ['China'],
                        'multimedia' => [
                            [
                                'url' => 'https://static01.nyt.com/images/2024/11/26/multimedia/26China-CurrencyWar-wvgb/26China-CurrencyWar-wvgb-superJumbo.jpg',
                                'format' => 'Super Jumbo',
                                'height' => 1365,
                                'width' => 2048,
                                'type' => 'image',
                                'subtype' => 'photo',
                                'caption' => 'For China, a cheaper currency could partially or entirely offset the effects of extra tariffs on Chinese goods.',
                                'copyright' => 'Athit Perawongmetha/Reuters',
                            ],
                            [
                                'url' => 'https://static01.nyt.com/images/2024/11/26/multimedia/26China-CurrencyWar-wvgb/26China-CurrencyWar-wvgb-threeByTwoSmallAt2X.jpg',
                                'format' => 'threeByTwoSmallAt2X',
                                'height' => 400,
                                'width' => 600,
                                'type' => 'image',
                                'subtype' => 'photo',
                                'caption' => 'For China, a cheaper currency could partially or entirely offset the effects of extra tariffs on Chinese goods.',
                                'copyright' => 'Athit Perawongmetha/Reuters',
                            ],
                            [
                                'url' => 'https://static01.nyt.com/images/2024/11/26/multimedia/26China-CurrencyWar-wvgb/26China-CurrencyWar-wvgb-thumbLarge.jpg',
                                'format' => 'Large Thumbnail',
                                'height' => 150,
                                'width' => 150,
                                'type' => 'image',
                                'subtype' => 'photo',
                                'caption' => 'For China, a cheaper currency could partially or entirely offset the effects of extra tariffs on Chinese goods.',
                                'copyright' => 'Athit Perawongmetha/Reuters',
                            ],
                        ],
                        'short_url' => '',
                    ],
                ],
            ], 200),
        ]);

        $newsAPIService = new NewsAPIService('dummy_api_key');
        $guardianService = new GuardianService('dummy_api_key');
        $nyTimesService = new NYTimesService('dummy_api_key');

        $aggregator = new NewsAggregatorService([
            $newsAPIService,
            $guardianService,
            $nyTimesService,
        ]);

        $articles = $aggregator->fetchArticles();

        $this->assertIsArray($articles->toArray(), 'Articles should be an array');
        $this->assertCount(3, $articles->toArray(), 'There should be exactly 3 articles fetched.');

        $this->assertEquals('NewsAPI Article', $articles[0]['title']);
        $this->assertEquals('Guardian Article', $articles[1]['title']);
        $this->assertEquals('After Trump’s Tariff Threat, Is a China Currency War Next?', $articles[2]['title']);

        $this->assertEquals('https://newsapi.org/article1', $articles[0]['url']);
        $this->assertEquals('https://guardian.com/article1', $articles[1]['url']);
        $this->assertEquals('https://www.nytimes.com/2024/11/26/business/trump-tariffs-us-china-currency.html', $articles[2]['url']);
    }

    public function test_news_aggregator_handles_empty_responses_gracefully()
    {
        Http::fake([
            'newsapi.org/*' => Http::response(['articles' => []], 200),
            'content.guardianapis.com/*' => Http::response(['response' => ['results' => []]], 200),
            'api.nytimes.com/*' => Http::response(['results' => []], 200),
        ]);

        $newsAPIService = new NewsAPIService('dummy_api_key');
        $guardianService = new GuardianService('dummy_api_key');
        $nyTimesService = new NYTimesService('dummy_api_key');

        $aggregator = new NewsAggregatorService([
            $newsAPIService,
            $guardianService,
            $nyTimesService,
        ]);

        $articles = $aggregator->fetchArticles();

        $this->assertIsArray($articles->toArray(), 'Articles should be an array');
        $this->assertEmpty($articles->toArray(), 'Articles array should be empty if no results are returned');
    }

    public function test_news_aggregator_handles_failed_responses_gracefully()
    {
        Http::fake([
            'newsapi.org/*' => Http::response(null, 500),
            'content.guardianapis.com/*' => Http::response(null, 500),
            'api.nytimes.com/*' => Http::response(null, 500),
        ]);

        $newsAPIService = new NewsAPIService('dummy_api_key');
        $guardianService = new GuardianService('dummy_api_key');
        $nyTimesService = new NYTimesService('dummy_api_key');

        $aggregator = new NewsAggregatorService([
            $newsAPIService,
            $guardianService,
            $nyTimesService,
        ]);

        $articles = $aggregator->fetchArticles();

        $this->assertIsArray($articles->toArray(), 'Articles should be an array');
        $this->assertEmpty($articles->toArray(), 'Articles array should be empty if all responses fail');
    }
}
