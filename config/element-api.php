<?php

use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
    'endpoints' => [
        'posts.json' => [
            'elementType' => Entry::class,
            'criteria' => ['section' => 'posts'],
            'elementsPerPage' => 5,
            'transformer' => function(Entry $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'url' => $entry->url,
                    'url' =>  "/{$entry->slug}",
                    'jsonUrl' => UrlHelper::url("posts/{$entry->slug}.json"),
                    'content' => $entry->postContent,
                ];
            },
        ],
        'posts/<slug:{slug}>.json' => function($slug) {
            return [
                'elementType' => Entry::class,
                'criteria' => ['slug' => $slug],
                'one' => true,
                'cache' => 86400, // 1 day
                'transformer' => function(Entry $entry) {
                    return [
                        'title' => $entry->title,
                        'url' => $entry->url,
                        'content' => $entry->postContent,
                    ];
                },
            ];
        },
    ]
];
