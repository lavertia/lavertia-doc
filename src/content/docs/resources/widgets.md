---
title: Resource page widgets
description: Compose dashboard statistics, charts and supporting content around Resource Pages.
sidebar:
  order: 11
---

Lavertia takes a component-first approach: a Resource Page is still a regular Lavertia Page, so it can compose `Section`, `PageHeader`, `StatsGrid`, `Infolist`, Table, Forms and any registered custom component supported by its frontend adapter.

## Current composition

~~~php
final class ViewTicket extends CardPage implements ResourcePageContract
{
    use InteractsWithResource;

    public static function resource(): string { return TicketResource::class; }
    public static function resourceAction(): string { return 'view'; }

    protected function components(): array
    {
        $ticket = $this->record();

        return [
            PageHeader::make('Ticket ' . $ticket->getKey()),
            Section::make('Details')
                ->description('Authorized record details go here.'),
        ];
    }
}
~~~

For more complex layouts, use `SplitPage::leftComponents()` and `rightComponents()` for an inspector or related content area. The same PHP component protocol is rendered by React, Vue and Svelte.

## Authorization and performance

A widget may show statistics derived from data, but every query still needs Gate/Policy authorization and tenant scoping. Prefer aggregated Eloquent queries, proper indexes and pagination to loading an entire relationship into Inertia props.

## What's not yet built

The `DashboardWidget` contract exists, but Filament-style `getHeaderWidgets()`, `getFooterWidgets()` and automatic per-Resource widget registration are **not part of the current P0-08 Resource API**. Keep widgets as explicit Page components until a cohesive, versioned Resource widget-slot API is implemented.

Reference: [Filament 5 Widgets on Resource Pages](https://filamentphp.com/docs/5.x/resources/widgets).
