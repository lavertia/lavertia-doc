---
title: Modular panels, navigation and widgets
description: Build Filament-inspired modular panels on Laravel and Inertia without Livewire.
---

Introduced in **v0.3 development alpha**, Lavertia can discover Pages and Dashboard Widgets from Composer PSR-4 Laravel packages, including `internachi/modular`. The framework remains independent from Filament and does not require Modular to be installed.

:::caution[Source code is not a stable release]
These APIs are merged on the public `lavertia/panels` development branch but do not have supported Packagist version tags or a formal backward-compatibility guarantee.
:::

## 1. Configure a Panel

Register Pages and use plain arrays for Navigation inside `config/lavertia.php` so Laravel `config:cache` can export the file:

```php
<?php

use Lavertia\Panels\Pages\DashboardPage;

return [
    'panels' => [
        'admin' => [
            'path' => 'admin',
            'middleware' => ['web', 'auth'],
            'pages' => [DashboardPage::class],
            'navigation' => [
                ['slug' => 'dashboard', 'label' => 'Dashboard', 'sort' => 0],
            ],
            'dashboard_widgets' => [],
            'discover_widgets' => [],
        ],
    ],
];
```

`DashboardPage` is an optional registered Page. If an existing Dashboard already owns the `dashboard` slug, use that custom Page instead. To append Widgets to an existing dashboard's component list, use `...app(PanelRegistry::class)->dashboardComponents('admin')`.

## 2. Contribute from an Inventory module

Install `internachi/modular` in the **host app** if you want the optional Composer-backed module structure:

```bash
composer require internachi/modular
php artisan make:module inventory --accept-default-namespace
composer update modules/inventory -W
```

Then register Pages, Widgets and Navigation in the module's Laravel Service Provider:

```php
<?php

namespace Modules\Inventory\Providers;

use Illuminate\Support\ServiceProvider;
use Lavertia\Panels\Navigation\NavigationItem;
use Lavertia\Panels\PanelRegistry;

final class InventoryServiceProvider extends ServiceProvider
{
    public function boot(PanelRegistry $panels): void
    {
        $panels->discoverPages(
            panelId: 'admin',
            in: dirname(__DIR__).'/Lavertia/Pages',
            for: 'Modules\\Inventory\\Lavertia\\Pages',
        );

        $panels->discoverWidgets(
            panelId: 'admin',
            in: dirname(__DIR__).'/Lavertia/Widgets',
            for: 'Modules\\Inventory\\Lavertia\\Widgets',
        );

        $panels->navigationItem(
            panelId: 'admin',
            item: NavigationItem::make('inventory/overview', 'Inventory')
                ->group('Management')
                ->sort(20)
                ->ability('inventory.view'),
        );
    }
}
```

The route name for the Inventory Page becomes `lavertia.admin.inventory.overview`, with URL `/admin/inventory/overview`. Navigation items are emitted only for a real Page in the same Panel, and an optional Gate ability must be granted before a link is shown.

## 3. Implement a Widget

```php
<?php

namespace Modules\Inventory\Lavertia\Widgets;

use Lavertia\Panels\Components\Stat;
use Lavertia\Panels\Components\StatsGrid;
use Lavertia\Panels\Widgets\DashboardWidget;

final class InventoryMetrics extends DashboardWidget
{
    public static function sort(): int
    {
        return 20;
    }

    public function canView(): bool
    {
        return auth()->user()?->can('inventory.view') === true;
    }

    protected function components(): array
    {
        // Example value only; real Eloquent queries must be tenant-scoped.
        return [StatsGrid::make([Stat::make('Items', 12)])];
    }
}
```

Widget classes are lazy-loaded through Laravel's container. Duplicate/abstract classes are skipped. `canView()` runs before composing the Widget, but it is **not a substitute for model Policies and tenant-scoped queries**.

## 4. Render in React, Vue or Svelte

The same Page receives optional `lavertia.navigation` metadata (`slug`, `label`, `group`, `url` and `active`). The three official Inertia adapters render accessible responsive navigation with active links, focus outlines and RTL support. Component Protocol v1 remains unchanged.

Use `npm run dev` for frontend HMR and Vite's full-browser refresh when editing PHP files in `app/**` or `app-modules/*/src/**`.

## 5. Verify

```bash
composer dump-autoload
php artisan optimize:clear
php artisan route:list --path=admin
php artisan config:cache
php artisan route:cache
php artisan test
```

Lavertia CI has independently installed a real Laravel 13 + InterNACHI/modular Inventory module and tested guest redirects, authenticated Inertia pages, Navigation, Dashboard Widgets, and cached configuration/routes. Each of React, Vue and Svelte also passes installed-adapter TypeScript and production builds: [Panels PR #11](https://github.com/lavertia/panels/pull/11) and [Playground PR #12](https://github.com/lavertia/playground/pull/12).

**Not yet included:** Filament-style Resources, Relation Managers, Panel-auth UI, a full plugin SDK, stable releases or browser-level accessibility signoff.
