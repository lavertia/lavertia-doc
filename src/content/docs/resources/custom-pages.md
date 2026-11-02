---
title: Custom Resource pages
description: Reuse the same Page class under multiple custom routes with validated parameters.
sidebar:
  order: 12
---

Every Lavertia Resource Page is fundamentally a `Page`. Custom Pages can reuse `CardPage`, `FlatPage`, `SplitPage` or the unopinionated base, while keeping the Resource's route and authorization scope.

## Register custom routes and reuse a Page

~~~php
protected static array $pages = [
    'list' => Pages\ListTickets::class,
    'view' => Pages\ViewTicket::class,
    'history' => [
        'page' => Pages\ViewTicket::class,
        'route' => '/{record}/history/{period}',
        'action' => 'view',
        'parameters' => ['heading' => 'History'],
    ],
    'published' => [
        'page' => Pages\ListTickets::class,
        'route' => '/published',
        'action' => 'list',
        'parameters' => ['status' => 'published'],
    ],
];
~~~

The keys (`history` and `published`) become route-name suffixes. Routes that require a model use `{record}`; unbound List/Create pages must not require `{record}`, preventing accidental broken navigation URLs.

## Read both kinds of parameter

~~~php
protected function mount(): void
{
    $this->heading = $this->pageParameter('heading', 'Records');
    $this->period = $this->routeParameter('period');
}
~~~

Fixed registration parameters are **developer-owned** and cannot be changed by arbitrary query strings. Dynamic URL parameters must be validated by the application before use; `{record}` is resolved via the scoped Resource query and Policy before `mount()`.

A fluent alternative is available when overriding `pages()`:

~~~php
'history' => Pages\ViewTicket::route('/{record}/history/{period}')
    ->action('view')
    ->parameters(['heading' => 'History']),
~~~

## Named Resource URLs

~~~php
$url = TicketResource::getUrl(
    'history',
    ['record' => $ticket->getKey(), 'period' => '2026'],
    panelId: 'admin',
);
~~~

Panel Navigation may link to parameter-free custom Resources through `NavigationItem::resource('tickets', 'published')`. Record routes should be linked from an authorized record-specific action, not a global unbound Navigation Item.

## Future capabilities

Record subnavigation, nested Resource contexts, route-based cross-Resource breadcrumbs and modal custom Pages are not fully implemented. Keep Policy ownership within the same Resource and enforce the route's server-defined action.

Reference: [Filament 5 Custom Resource Pages](https://filamentphp.com/docs/5.x/resources/custom-pages).
