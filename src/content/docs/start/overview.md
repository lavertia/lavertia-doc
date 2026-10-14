---
title: What is Lavertia?
description: Understand what Lavertia does and why it differs from an admin-panel-only framework.
---

Lavertia is an experimental **PHP-first component model** for applications using **Laravel and Inertia.js**. PHP describes the structure and data of a page. Frontend adapters render an equivalent interface in **React**, **Vue** or **Svelte**.

Unlike a framework that requires every table to belong to a Resource or an admin panel, Lavertia aims to let developers compose UI independently:

```php
return [
    PageHeader::make('Customers'),
    Section::make('Overview')->components([
        StatsGrid::make([
            Stat::make('Customers', 42),
        ]),
        Table::make('customers')
            ->columns([TextColumn::make('name')])
            ->rows([['name' => 'Example customer']]),
    ]),
];
```

This illustrates the compositional direction. Many of these components currently reside in the draft `lavertia/panels` package and will be extracted to their own packages.

## What it is not

- Not a Filament fork or API-compatible drop-in replacement.
- Not a Livewire library.
- Not an authentication provider or a replacement for Laravel guards.
- Not production ready: browser-level QA, permission tests and stable releases are still pending.

Read [architecture](/lavertia-doc/concepts/architecture/) and [current status](/lavertia-doc/project/status/) before integrating.
