---
title: Your first page
description: Describe a page in PHP and render it through Inertia in an authenticated Laravel app.
---

Create `app/Lavertia/Pages/DashboardPage.php`:

```php
<?php

declare(strict_types=1);

namespace App\Lavertia\Pages;

use Lavertia\Panels\Components\PageHeader;
use Lavertia\Panels\Components\Stat;
use Lavertia\Panels\Components\StatsGrid;
use Lavertia\Panels\Components\Table;
use Lavertia\Panels\Components\TextColumn;
use Lavertia\Panels\Pages\Page;
use Lavertia\Support\Contracts\Component;

final class DashboardPage extends Page
{
    public static function slug(): string
    {
        return 'dashboard';
    }

    /** @return list<Component> */
    protected function components(): array
    {
        return [
            PageHeader::make('Overview'),
            StatsGrid::make([
                Stat::make('Members', 2),
            ]),
            Table::make('members')
                ->label('Team')
                ->columns([
                    TextColumn::make('name')->label('Name'),
                ])
                ->rows([
                    ['name' => 'Maya'],
                    ['name' => 'Omar'],
                ]),
        ];
    }
}
```

Then register the page in the published `config/lavertia.php`:

```php
'panels' => [
    'admin' => [
        'path' => 'admin',
        'middleware' => ['web', 'auth'],
        'pages' => [
            \App\Lavertia\Pages\DashboardPage::class,
        ],
    ],
],
```

Open `/admin/dashboard` after signing in with your application's existing Laravel authentication.

:::note[What the example does]
It renders a bounded sample dataset. For real records and pagination, read [Tables](/lavertia-doc/packages/tables/) and [Eloquent security](/lavertia-doc/guides/eloquent-security/).
:::
