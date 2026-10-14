---
title: Tables
description: Snapshot tables, draft Eloquent pagination, filters, sorting and column controls.
---

:::caution[Experimental, not a released table engine]
Current Table code is still inside the `lavertia/panels` feature branch, before extraction into `lavertia/tables`. Check [PR #6](https://github.com/lavertia/panels/pull/6).
:::

## Snapshot data (client-side interactions)

```php
Table::make('members')
    ->label('Team')
    ->searchable()
    ->columnManager()
    ->reorderableColumns()
    ->filters([
        SelectFilter::make('status')
            ->options(['active' => 'Active', 'pending' => 'Pending']),
    ])
    ->columns([
        TextColumn::make('name')->sortable()->searchable(),
        TextColumn::make('email')->toggleable(true, true),
        TextColumn::make('status')->badge(['active' => 'success']),
    ])
    ->rows([
        ['name' => 'Maya', 'email' => 'maya@example.com', 'status' => 'active'],
    ]);
```

`rows()` accepts only bounded scalar snapshots (100 records maximum). In this mode, search/filter/sort/page operations apply **only** to the received rows; they cannot find records that were never sent.

**Column visibility is presentation, not authorization.** Hidden columns may still be serialized.

## Draft Eloquent source

```php
Table::make('team_members')
    ->columns([
        TextColumn::make('name')->sortable()->searchable(),
        TextColumn::make('email')->toggleable(),
    ])
    ->eloquent(
        User::query()->where('organization_id', $organization->id),
        fn (): bool => auth()->user()?->can('viewAny', User::class) === true
            && auth()->user()->organizations()->whereKey($organization->id)->exists(),
        perPage: 20,
    );
```

The caller must supply a scoped Builder and an explicit authorization callback. The draft engine allowlists defined columns, builds a Laravel `paginate()` query and projects declared scalar values.

:::danger[Query and policy responsibility]
Do not pass an unscoped model query in a multi-tenant app. Filter options, sorting and rendering never replace Policies or row/tenant authorization. Validate every mutation independently.
:::

## Features still missing

A first-class API DataSource adapter with cursor pagination, persisted column preferences, row actions, bulk actions, record reorder, remote filters and stable browser E2E coverage are **planned**, not shipped. For external APIs today, fetch server-side and pass a bounded sanitized snapshot.
