---
title: Editing records
description: Edit a tenant-scoped Eloquent record with a Resource Page and a safe Laravel PATCH action.
sidebar:
  order: 4
---

On the current Resource branches, `edit` registers `/{record}/edit` and checks the **update Policy** against the model loaded from `Resource::query()`. A record outside the tenant scope returns 404.

## Choose any Page presentation

~~~php
final class EditTicket extends SplitPage implements ResourcePageContract
{
    use InteractsWithResource;

    public static function resource(): string { return TicketResource::class; }
    public static function resourceAction(): string { return 'edit'; }

    protected function leftComponents(): array
    {
        $ticket = $this->record();

        return [
            PageHeader::make('Edit ' . $ticket->title),
            // Form fields with an authorized PATCH submission target.
        ];
    }

    protected function rightComponents(): array
    {
        return [
            Section::make('Inspector')
                ->description('Audit history and related information.'),
        ];
    }
}
~~~

This is a **presentation page**, not a mutation handler. `record()` is only populated after the scoped query and Laravel Policy pass.

## Handle updates on the server

For your host PATCH endpoint, resolve the model from the **scoped** Resource Builder, not `Ticket::find($id)`:

~~~php
public function update(UpdateTicketRequest $request, string $record): RedirectResponse
{
    $ticket = TicketResource::query()->whereKey($record)->firstOrFail();

    Gate::authorize('update', $ticket);

    DB::transaction(function () use ($ticket, $request): void {
        $ticket->update([
            'title' => $request->validated('title'),
        ]);
    });

    return back();
}
~~~

The Form Request must validate all writable fields and enforce authorization; repeat the Policy check at the mutation boundary. Explicitly check tenancy again because a user may have changed teams between displaying and submitting the form.

## UX and lifecycle

Use Inertia validation errors, preserve input on validation failures, disable the submit button while processing, and avoid sending arbitrary model attributes to the browser. For financial or concurrent editing workflows, introduce version checks or optimistic locking and protect side effects inside transactions.

Filament's `mutateFormDataBeforeSave()` and `handleRecordUpdate()` have **no direct Lavertia equivalent yet**. They are proposed for a later write-side Resource API.

Reference: [Filament 5 Editing records](https://filamentphp.com/docs/5.x/resources/editing-records).
