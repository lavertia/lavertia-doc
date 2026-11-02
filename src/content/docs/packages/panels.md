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

## Resource development preview

Resource GET routes and authorization are being developed in
[Panels PR #36](https://github.com/lavertia/panels/pull/36) and
[Panels PR #37](https://github.com/lavertia/panels/pull/37).
[Panels PR #38](https://github.com/lavertia/panels/pull/38) adds
the Filament-inspired `ListRecords::getTabs()` abstraction.

These APIs are **not included in a tagged stable release or guaranteed on main**.
Use the [Resources preview documentation](/lavertia-doc/resources/overview/)
only with compatible feature branches. Write-side CRUD actions, Relation
Managers, nested Resources and Resource global search remain planned.

## Next

Standalone authentication previews and Theme SDK development live on
stacked feature branches. Full CRUD, Relation Managers, production-ready
OIDC and the public Plugin SDK are **not available as stable releases**.

See the [v0.3 Modular Panels guide](/lavertia-doc/guides/modular-panels/) for working examples and verified CI references.
