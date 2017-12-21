<?php

return [
    "application_id" => getenv('ALGOLIA_APP_ID'),
    "admin_api_key" => getenv('ALGOLIA_ADMIN_API_KEY'),
    "mappings" => [
        [
            'indexName' => getenv('ALGOLIA_INDEX_NAME'),
            'elementType' => \craft\elements\Entry::class,
            'criteria' => [
                'section' => 'posts'
            ],
            'transformer' => function (craft\base\Element $element) {
                return [
                  'title' => $element->title,
                  'url' => $element->url,
                  'content' => $element->postContent,
                ];
            }
        ],
    ],
];