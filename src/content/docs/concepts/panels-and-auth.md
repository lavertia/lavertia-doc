---
title: Panels, Starter Kits & authentication
description: Optional panel shell and shared authentication architecture.
---

A **Panel** is a group of pages with a URL prefix and middleware. Authentication and authorization should be *separate concerns*.

## Implemented now

The current `lavertia/panels` package registers a Panel's `path`, `middleware` and `pages`, and also provides an opt-in v0.3 Navigation Registry and Dashboard Widgets. It can reuse the Laravel Starter Kit's existing `web` session guard and login page:

```php
'panels' => [
    'admin' => [
        'path' => 'admin',
        'middleware' => ['web', 'auth'],
        'pages' => [\App\Lavertia\Pages\DashboardPage::class],
    ],
],
```

Authorization remains an application responsibility. Protect routes with middleware/Policies; never assume the existence of a sidebar link grants access.

## Planned modes — not implemented

- **Starter Kit Mode:** keep existing app layout, sessions, Fortify/WorkOS and profile routes.
- **Standalone Panel Mode:** navigation and widget foundation exists; a complete standalone shell, themes and auth screens are still planned.
- **Shared Auth:** one Laravel guard/login/profile for multiple panels.
- **Central OIDC:** external Identity Provider and local app sessions; design must explicitly handle login return paths and logout scope.
- **Isolated Auth:** opt-in dedicated guards for sensitive interfaces.

Current Panels does **not** provide a complete standalone shell, universal Auth Manager, tenant management or OIDC adapter. This page describes the product direction, not working builder methods.

Read [current status](/lavertia-doc/project/status/).
