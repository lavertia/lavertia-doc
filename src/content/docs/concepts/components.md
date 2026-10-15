---
title: Composable components
description: Components, props, nested schemas and what the protocol guarantees.
---

The key abstraction is a **Component**: a PHP object with a type, stable key, JSON-safe props and optional child components.

Current experimental primitives include:

- Layouts: `Column`, `Row`, `Card`, `Section`, `PageHeader`.
- Display: `Text`, `Stat`, `StatsGrid`, `Infolist`, `TextEntry`.
- Tables: `Table`, `TextColumn`, `SelectFilter`.
- Forms: `Form`, `TextInput`, `Select`, `Textarea`, `Checkbox`; optional Inertia submission to explicitly authorized Laravel routes.
- Navigation: `Action` with a validated URL.

## Composing arbitrary layouts

```php
Column::make([
    PageHeader::make('Customers'),
    Section::make('Summary')->components([
        StatsGrid::make([Stat::make('Total', 120)]),
        Table::make('recent')->columns([
            TextColumn::make('name'),
        ])->rows([
            ['name' => 'Example'],
        ]),
    ]),
]);
```

A Table can appear in a Section, a Card, or a full page. No Resource subclass is required.

## Server safety

The Support serializer bounds tree size and depth and rejects unserializable values. This is not a replacement for authorization: your Laravel code must scope Eloquent builders and check Policies before sending data.

The component **types and APIs are still experimental**. See the [Component Protocol v1 guide](/lavertia-doc/concepts/component-protocol-v1/) for the checked JSON Schema, golden compatibility fixture and limits.
