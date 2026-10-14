---
title: Panels package
description: Optional Laravel pages, panel routes, starter kit renderer installer and future standalone shell.
---

**Repository:** [lavertia/panels](https://github.com/lavertia/panels)

**Status:** Draft, experimental. [Panel UI PR](https://github.com/lavertia/panels/pull/5) and [advanced table PR](https://github.com/lavertia/panels/pull/6).

The current package provides:
- `Panel::make($id)`, path, middleware and Page registration.
- A base invokable `Page` which produces Inertia's `lavertia/page`.
- A `lavertia:install --stack=react|vue|svelte` renderer installer.
- Prototype component implementations which will be extracted to dedicated packages.

## Auth is not a property of the UI shell

Panels should reuse authentication already configured by the host Laravel app. Multiple Panels can share an `auth` middleware/guard and one login page.

```php
'panels' => [
    'admin' => [
        'path' => 'admin',
        'middleware' => ['web', 'auth'],
        'pages' => [\App\Lavertia\Pages\DashboardPage::class],
    ],
    'staff' => [
        'path' => 'staff',
        'middleware' => ['web', 'auth', 'can:access-staff'],
        'pages' => [\App\Lavertia\Pages\StaffPage::class],
    ],
],
```

This is illustrative configuration, not a substitute for correctly defined Gates and model Policies.

## Roadmap

Standalone layouts, navigation/resource registry, plugins, configurable identity providers and per-panel authorization are **not yet implemented**.

See [Panels and auth](/lavertia-doc/concepts/panels-and-auth/) for their intended boundaries.
