---
title: Panels package
description: Laravel Inertia Pages, navigation, dashboard Widgets and modular discovery.
---

**Repository:** [lavertia/panels](https://github.com/lavertia/panels) · **Status:** public development alpha, code merged to main; no stable tag.

`lavertia/panels` now provides:

- `Panel::make($id)` with URL prefix, middleware and Page registration.
- `Panel::discoverPages()` and module Service Provider `PanelRegistry::discoverPages()`.
- `NavigationItem` entries registered per Panel with route verification, groups, ordering and optional Laravel Gate abilities.
- `DashboardWidget`, `DashboardPage`, `PanelRegistry::discoverWidgets()` and explicit widget registration.
- Shared `lavertia/page` Component Protocol v1 Inertia payload with optional `navigation` metadata.
- React, Vue, Svelte renderer installer via `php artisan lavertia:install --stack=react|vue|svelte`.

## Basic Panel

```php
'panels' => [
    'admin' => [
        'path' => 'admin',
        'middleware' => ['web', 'auth'],
        'pages' => [\Lavertia\Panels\Pages\DashboardPage::class],
        'navigation' => [
            ['slug' => 'dashboard', 'label' => 'Dashboard'],
        ],
        'dashboard_widgets' => [],
    ],
],
```

Use **plain arrays** in `config/lavertia.php` for navigation so `php artisan config:cache` works. Add Widgets and links dynamically through Service Providers when working with Composer-backed modules.

## Authorization

Laravel middleware protects Page routes; hidden NavigationItem links alone never grant or revoke permission. Check explicit Gates/Policies for features, scope all Eloquent queries by organization/tenant and use `DashboardWidget::canView()` for per-request visibility.

## Next

Resources, Relation Managers, standalone auth screens, cluster-style organization and a public Plugin SDK are **not implemented yet**.

See the [v0.3 Modular Panels guide](/lavertia-doc/guides/modular-panels/) for working examples and verified CI references.
