---
title: Listing records
description: Build Eloquent list pages with server-side getTabs, badges, filters and Inertia navigation.
sidebar:
  order: 2
---

A list page combines a Laravel Policy-protected Eloquent query with the independent `lavertia/tables` component. P0-08 introduces `ListRecords` and Filament-inspired `getTabs()`.

:::caution[Availability]
The Resource tabs API is under review in [Panels PR #38](https://github.com/lavertia/panels/pull/38). Do not use it against an older Panels release.
:::

## The simplest ListRecords Page

~~~php
namespace App\Lavertia\Resources\Pages;

use App\Lavertia\Resources\TicketResource;
use Lavertia\Panels\Resources\ListRecords;
use Lavertia\Tables\Components\Table;
use Lavertia\Tables\Components\TextColumn;

final class ListTickets extends ListRecords
{
    public static function resource(): string
    {
        return TicketResource::class;
    }

    public static function resourceAction(): string
    {
        return 'list';
    }

    protected function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID'),
                TextColumn::make('title')->label('Title'),
                TextColumn::make('status')->label('Status'),
            ])
            ->searchable();
    }
}
~~~

`ListRecords` constructs the Table, applies `Resource::query()`, and verifies the model's `viewAny` Policy. Page-header and table components use the same protocol in React, Vue, and Svelte.

## Add getTabs() to filter an Eloquent query

~~~php
use Illuminate\Database\Eloquent\Builder;
use Lavertia\Panels\Resources\Tabs\Tab;

protected function getTabs(): array
{
    return [
        'all' => Tab::make('All tickets'),
        'published' => Tab::make('Published')
            ->modifyQueryUsing(
                static fn (Builder $query) => $query->where('status', 'published')
            ),
        'drafts' => Tab::make('Drafts')
            ->modifyQueryUsing(
                static fn (Builder $query) => $query->where('status', 'draft')
            ),
    ];
}

protected function getDefaultActiveTab(): ?string
{
    return 'all';
}
~~~

Each array key becomes the **stable URL identity** in `?activeTab=published`. The label is independent of the key; if omitted, the readable key is used.

An invalid tab key falls back to the configured default (or first tab). Tab filtering is applied **to a clone of the already tenant-scoped Resource query**, never to an unscoped model builder. Do not use tabs to implement tenant boundaries; the Resource's query and Policy are always authoritative.

## Labels, badges, icon metadata and colors

~~~php
'published' => Tab::make('Published')
    ->icon('check-circle')
    ->iconPosition('before')
    ->badge(static fn (): int => TicketResource::query()
        ->where('status', 'published')
        ->count())
    ->badgeColor('success')
    ->modifyQueryUsing(
        static fn (Builder $query) => $query->where('status', 'published')
    ),
~~~

Supported badge color tokens: `neutral`, `primary`, `success`, `warning`, `danger`, and `info`. Badge callbacks run server-side when the page is rendered. They must return a short string, integer, or null; a closure is never serialized into Inertia props.

:::note[Deferred counts]
Automatic async/deferred badge loading, as described in Filament, is **not implemented in P0-08**. For expensive counts, omit badges or plan a dedicated endpoint using Inertia deferred props; avoid N count queries on every visit.
:::

## Query, search, sorting and pagination

`ListRecords` provides `modifyTableQuery(Builder $query): void` to narrow the model query after the active tab has been applied. Use it for extra **server-owned** filters; do not replace the scoped builder.

Table state lives in URL keys prefixed with `lvt_<table-name>_`. `lavertia/tables` supports pagination, registered Select filters, sorting, visibility controls and searchable columns. On tab click, Lavertia preserves safe search/filter/sort parameters and resets pagination.

The three frontends use Inertia Links with partial reloads (`only: ['lavertia']`), preserve current state and scroll, and avoid refetching unrelated shared Panel props. Laravel still evaluates the authorized Page payload on each visit. Future work may defer expensive tab badges separately rather than computing all badge counts for every tab switch.

## Header actions and customization

~~~php
protected function listTitle(): string
{
    return 'All tickets';
}

protected function getHeaderActions(): array
{
    return [
        Action::make('create-ticket')
            ->label('Create')
            ->url(TicketResource::getUrl('create', panelId: 'admin')),
    ];
}
~~~

`ListRecords` also exposes `tableName()`, `listDescription()` and `listSectionTitle()`. For a fully custom visual layout, use `HasResourceTabs` on an ordinary Resource Page and call `resourceTabLinks()` and `filteredResourceQuery()` yourself.

## Security and regression tests

Test anonymous access (403 or login redirect), invalid tab fallback, cross-tenant query isolation, counts that never reveal other organizations, preserving search state, and out-of-range pagination. The Playground provides a runnable example at `/admin/demo-tickets` in [P0-08 PR #25](https://github.com/lavertia/playground/pull/25).

Related: [Filament 5 Listing records](https://filamentphp.com/docs/5.x/resources/listing-records) explains the inspiration behind filter tabs and count badges.
