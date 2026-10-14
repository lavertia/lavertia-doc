---
title: Eloquent, data safety & tenancy
description: Protect the server-to-browser component boundary with Policies, scoped queries and safe projections.
---

A UI component is **not** an authorization boundary. Every Eloquent query feeding a Table must be constrained to the active user/tenant and checked against Laravel Policies.

## Restrict a Table source

```php
Table::make('users')
    ->columns([
        TextColumn::make('name')->searchable(),
        TextColumn::make('email'),
    ])
    ->eloquent(
        User::query()->whereBelongsTo($organization),
        fn (): bool => auth()->user()?->can('viewAny', User::class) === true,
        perPage: 25,
    );
```

This is only safe when the **organization has already been validated** as accessible to the user. Re-check membership on every request.

## Checklist

- Scope every resource query to a validated organization/tenant.
- Check Policies on list, read and each write action.
- Allowlist orderable columns, filter names and directions.
- Select/project only fields that should reach the browser; column hiding does not redact them.
- Avoid N+1 by intentionally eager-loading relationships.
- Add indexes matching actual filter/order predicates, inspect `EXPLAIN` for large data.
- Rate-limit expensive filters and external APIs.
- Use Laravel Form Requests and CSRF for all state-changing routes.
- Keep API credentials server-side, not in component props.

For real examples and the current limitations, read [Tables](/lavertia-doc/packages/tables/) and [Forms](/lavertia-doc/packages/forms/).
