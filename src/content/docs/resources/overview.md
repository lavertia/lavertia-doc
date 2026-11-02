---
title: Resource overview
description: Build policy-aware Laravel Eloquent resources as composable Lavertia Pages.
sidebar:
  order: 1
---

Lavertia Resources organize an Eloquent model and its routes while keeping **authorization, data access, and presentation separate**. This guide documents the evolving P0-07/P0-08 feature branches, not a stable Packagist release.

:::caution[Feature branch API]
The APIs below are implemented in [Panels PR #37](https://github.com/lavertia/panels/pull/37) and [Panels PR #38](https://github.com/lavertia/panels/pull/38). Both are review branches. Use the matching Playground branch; an older `main` installation may not support them.
:::

## 1. Create an Eloquent model and a Policy

A Resource does **not** grant access to a model automatically. Register a Laravel Policy with `viewAny`, `create`, `view`, `update`, and `delete` as needed. Keep every database query scoped to the signed-in user and active tenant.

~~~php
use Illuminate\Database\Eloquent\Builder;
use Lavertia\Panels\Resources\Resource;

final class TicketResource extends Resource
{
    protected static ?string $slug = 'tickets';
    protected static ?string $model = Ticket::class;
    protected static ?string $queryProvider = TicketQuery::class;

    protected static array $pages = [
        'list' => Pages\ListTickets::class,
        'create' => Pages\CreateTicket::class,
        'view' => Pages\ViewTicket::class,
        'edit' => Pages\EditTicket::class,
    ];
}
~~~

`TicketQuery` implements `ResourceQueryProvider` and returns a fresh, tenant-scoped Eloquent Builder on **every request**:

~~~php
final class TicketQuery implements ResourceQueryProvider
{
    public function query(): Builder
    {
        return Ticket::query()
            ->where('organization_id', auth()->user()->current_organization_id);
    }
}
~~~

Never place a mutable Builder containing a user's scope in a static property. You can still override `query(): Builder` directly instead of using a provider.

## 2. Register the Resource in a Panel

~~~php
return $panel
    ->id('admin')
    ->resources([TicketResource::class]);
~~~

The panel's `auth`, tenant middleware, locale, navigation, and Page shell continue to apply to registered GET routes. The current Resource layer does not silently install write routes.

## 3. Map resource Pages

List, Create, View, Edit, and custom Pages are all **Lavertia Pages**; they may inherit `Page`, `CardPage`, `FlatPage` or `SplitPage`, implementing `ResourcePageContract` when needed.

~~~php
protected static array $pages = [
    'list' => Pages\ListTickets::class,
    'published' => [
        'page' => Pages\ListTickets::class,
        'route' => '/published',
        'action' => 'list',
        'parameters' => ['status' => 'published'],
    ],
    'view' => Pages\ViewTicket::class,
    'edit' => Pages\EditTicket::class,
];
~~~

The same Page class may serve several named URLs. `pageParameter('status')` reads fixed, server-owned registration settings; `routeParameter('record')` reads a validated URL placeholder. No query string can change a registered Policy action.

## 4. Generate URLs and navigation

~~~php
$url = TicketResource::getUrl(
    'view',
    ['record' => $ticket->getKey()],
    panelId: 'admin',
);

NavigationItem::make('tickets', 'Tickets')
    ->resource('tickets');
~~~

Global sidebar links cannot point to required `{record}` placeholders without a resolved record. Resource routes remain scoped by the Resource query and Laravel Policy.

## Understand the feature boundaries

| Capability | Status |
| --- | --- |
| Property configuration, page mapping, named routes | Implemented on P0-07 branch |
| ListRecords and server-side `getTabs()` | Implemented on P0-08 branch |
| Tables, Eloquent filters, search and pagination | Available in `lavertia/tables` |
| View/Edit/Create Page GET routes with Policies | Available in P0-06 |
| Generic write-side CRUD handlers (POST/PATCH/DELETE) | Not yet shipped |
| First-class relationship managers, nested/singular resources | Planned |
| Resource-wide global search and widget extension APIs | Planned |
| SSR/route-cache/browser release verification | Must be completed before production |

## Next guides

Start with [Listing records](/lavertia-doc/resources/listing-records/) for `getTabs()`, then [Creating](/lavertia-doc/resources/creating-records/), [Editing](/lavertia-doc/resources/editing-records/) and [Custom pages](/lavertia-doc/resources/custom-pages/).

These guides take ideas from [Filament 5 Resources](https://filamentphp.com/docs/5.x/resources/overview) but describe **Lavertia's own API**, not Filament's classes or Livewire implementation.
