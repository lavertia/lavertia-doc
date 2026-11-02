---
title: Viewing records
description: Display a scoped model through a reusable CardPage, SplitPage or custom Infolist.
sidebar:
  order: 5
---

Resource viewing is a **GET route** with the `view` Laravel Policy. Any Resource Page presentation is allowed.

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
            PageHeader::make($ticket->title),
            Infolist::make('ticket')->components([
                TextEntry::make('title')
                    ->label('Title')
                    ->value((string) $ticket->title),
            ]),
        ];
    }
}
~~~

`record()` gives you the Eloquent instance already fetched using `TicketResource::query()->whereKey(...)` and authorized by the model Policy. Selecting fields for serialization remains the Page's responsibility. Never serialize a full Eloquent model without reviewing hidden attributes and relationships.

## Use record-specific URLs

~~~php
TicketResource::getUrl(
    'view',
    ['record' => $ticket->getKey()],
    panelId: 'admin',
);
~~~

The URL generator rejects unknown Resource Page names. Under the P0-07 mapping system, the same View Page may be registered for custom modes:

~~~php
'history' => [
    'page' => Pages\ViewTicket::class,
    'route' => '/{record}/history/{period}',
    'action' => 'view',
    'parameters' => ['heading' => 'History'],
],
~~~

Use `pageParameter('heading')` for fixed configuration and `routeParameter('period')` for the validated dynamic parameter. Record authorization always occurs before the Page's `mount()`.

## Future enhancements

Relation tabs, audit timelines, automatically generated record subnavigation, media galleries and default View widgets are planned as composable Resources, not required core dependencies.

Reference: [Filament 5 Viewing records](https://filamentphp.com/docs/5.x/resources/viewing-records).
