<?php

use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
  'endpoints' => [
    'posts.json' => [
      'elementType' => Entry::class,
      'criteria' => ['section' => 'posts'],
      'transformer' => function(Entry $entry) {
        Craft::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', getenv('ENVIRONMENT') === 'dev' ? 'http://localhost:3000' : 'https://vue.tj.ie');

        return [
          'title' => $entry->title,
          'url' => $entry->url,
          'date_published' => $entry->postDate->format(\DateTime::ATOM),
          'slug' => $entry->slug,
          'jsonUrl' => UrlHelper::url("posts/{$entry->id}.json"),
        ];
      },
    ],
    'posts/<entryId:\d+>.json' => function($entryId) {
      return [
        'elementType' => Entry::class,
        'criteria' => ['id' => $entryId],
        'one' => true,
        'transformer' => function(Entry $entry) {
          Craft::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', getenv('ENVIRONMENT') === 'dev' ? 'http://localhost:3000' : 'https://vue.tj.ie');

          return [
              'title' => $entry->title,
              'url' => $entry->url,
              'slug' => $entry->slug,
              'date_published' => $entry->postDate->format(\DateTime::ATOM),
              'date_modified' => $entry->dateUpdated->format(\DateTime::ATOM),
              'body' => $entry->postContent,
              'categories' => array_map('strval', $entry->categories->all()),
          ];
        },
      ];
    },
  ]
];