---
title: Resource code quality
description: Reliable, secure and modular Resource engineering in Laravel and Inertia.
sidebar:
  order: 13
---

A Resource framework should reduce repetitive UI work without hiding important backend boundaries.

## Prefer a clear responsibility split

- **Resource:** Model identity, base tenant-scoped query, named Page routes and Policy contract.
- **Page:** Display lifecycle, selected Component tree, ListRecords `getTabs()`, header actions and presentation.
- **Forms/Actions:** Validation, input and state; real mutations occur through Laravel endpoints.
- **Host controller/action:** Form Requests, Gate/Policy, database transactions, idempotency and writes.
- **Inertia adapter:** Responsive rendering and interaction state, not Eloquent query decisions.
- **Theme:** Appearance tokens; never authorization or database queries.

## Make routing and cache deterministic

Static `$pages` arrays should hold class names and scalar configuration, **not runtime closures or Model instances**. If a query requires the signed-in user, use `ResourceQueryProvider` or a dynamic `query()` method. Use `Resource::getUrl()` to build named routes rather than concatenating paths.

The Page registration route/action must be validated. Prevent route collisions and ensure all required parameters are passed when navigating to `{record}`.

## Authorize at multiple boundaries

- A Page checks `canView()`.
- Resource route context authorizes `viewAny`, `create`, `view`, or `update`.
- Every read and write uses an explicit tenant-scoped Eloquent Builder.
- A POST/PATCH/DELETE endpoint repeats Policies after resolving the record.
- Widget badges and global search results must not reveal other tenants' counts.

Use database unique constraints and appropriate indexes; avoid N+1 and querying entire collections into Inertia payloads. Verify aggregation SQL with `EXPLAIN` before introducing an external search engine.

## Prefer thin Pages and composable Widgets

A page should define what to show, not an ad hoc repository, authentication provider or SQL query language. Extract reusable Sections, typed components, Form Requests and domain services when doing so clarifies responsibility.

## Test before release

~~~bash
composer lint:check
composer test
php artisan route:list --path=admin
php artisan test
npm run types:check
npm run build
~~~

Only run commands actually supported by your installed package. Add HTTP/Inertia tests for guest denial, tenant leaks (cross-organization IDs), invalid tabs, stale pagination, unchanged form data after validation failure, RTL first render, and record deletes.

## Alpha compatibility warning

The P0-06 through P0-08 Resource APIs are still in stacked **Draft PRs**. Do not treat these docs as a tagged stable contract until the merged release and CI status are confirmed.

Reference: [Filament 5 Resource code quality tips](https://filamentphp.com/docs/5.x/resources/code-quality-tips).
