---
title: Creating records
description: Design a Create Page and connect it to an authorized Laravel mutation action.
sidebar:
  order: 3
---

The P0-06 Resource system registers an authorized **GET Create Page**. It does not invent write endpoints. The correct division is: **Lavertia Page composes form widgets; Laravel Form Request validates input; a domain action creates the record; Inertia handles redirects and errors.**

:::caution[Current API]
`'create' => CreateTicket::class` is a supported Resource Page mapping on the P0-06/P0-07 branches. Automatic Filament-style `handleRecordCreation()` and `mutateFormDataBeforeCreate()` hooks are **planned**, not shipped by the framework.
:::

## Register a Create Page

~~~php
protected static array $pages = [
    'list' => Pages\ListTickets::class,
    'create' => Pages\CreateTicket::class,
];
~~~

Your Page can extend `FlatPage` or `CardPage` and implement `ResourcePageContract`:

~~~php
final class CreateTicket extends FlatPage implements ResourcePageContract
{
    use InteractsWithResource;

    public static function resource(): string
    {
        return TicketResource::class;
    }

    public static function resourceAction(): string
    {
        return 'create';
    }

    protected function components(): array
    {
        // Return Lavertia Forms fields configured to submit
        // to a real application POST endpoint.
        return [PageHeader::make('New ticket')];
    }
}
~~~

Before rendering, the Resource checks Laravel `TicketPolicy::create()`. Do not infer permissions from visible buttons.

## Implement a real Laravel write path

A simplified host Form Request (the exact fields and tenant resolver are application-specific):

~~~php
final class StoreTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('create', Ticket::class);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:160'],
        ];
    }
}
~~~

Example host controller action:

~~~php
public function store(StoreTicketRequest $request): RedirectResponse
{
    $ticket = DB::transaction(fn () => Ticket::query()->create([
        'title' => $request->validated('title'),
        'organization_id' => $request->user()->current_organization_id,
        'owner_id' => $request->user()->getAuthIdentifier(),
    ]));

    return redirect()->to(TicketResource::getUrl(
        'view',
        ['record' => $ticket->getKey()],
        panelId: 'admin',
    ));
}
~~~

Register this POST route inside the same `web`, `auth` and tenant middleware boundaries as the Resource. The code above is a **host application pattern**, not a generated Lavertia controller. Review model fillable attributes, duplicate handling, database constraints, and transactions.

## Inertia experience

Lavertia Forms integrate with Inertia's POST requests, Laravel validation errors, processing state, error messages and redirect-based success feedback. Prefer server-owned data, a single POST endpoint and idempotency handling for duplicate submissions. Implement redirect destinations from the Resource's named URL generator, not concatenated record IDs.

## Planned framework hooks

A future dedicated CreateRecord contract may add server hooks for pre-validation defaults, pre-save transformation, transactional creation, after-save actions and redirect customization. They must preserve validated fields, server tenant assignment and Policy checks.

Related reference: [Filament 5 Creating records](https://filamentphp.com/docs/5.x/resources/creating-records).
