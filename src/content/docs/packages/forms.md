---
title: Forms
description: Experimental Inertia form submissions, validation feedback and Laravel persistence.
---

:::caution[Draft v0.2 - not a stable Composer release]
Form submission is implemented on [Panels PR #6](https://github.com/lavertia/panels/pull/6), with an Eloquent-backed [Playground PR #2](https://github.com/lavertia/playground/pull/2). React, Vue and Svelte adapters build successfully; Laravel end-to-end browser coverage remains pending.
:::

## Composable server-bound form

```php
Form::make('profile')
    ->label('Profile settings')
    ->action('/account/profile')
    ->method('patch') // post (default), put, patch
    ->submitLabel('Save')
    ->components([
        TextInput::make('name')->label('Name')->required()->value($user->name),
        Select::make('role')
            ->label('Role')
            ->options(['editor' => 'Editor', 'manager' => 'Manager'])
            ->required(),
        Textarea::make('bio')->label('Biography')->rows(3),
        Checkbox::make('notify')->label('Send updates')->checked(),
    ]);
```

Without `action(...)`, the form remains a safe preview; no network request is sent. With a local action, the renderer collects named inputs and calls Inertia's router, using the Laravel session/CSRF stack. A hidden `0` value ensures unchecked checkboxes still submit. The UI disables submit during a request and displays Laravel validation errors returned by Inertia.

### Laravel owns security and persistence

Lavertia never serializes closures or mass-assigns user-provided form data automatically. Provide an authenticated, authorized, validated route with explicit persistence. Example:

```php
Route::patch('/account/profile', function (ProfileUpdateRequest $request) {
    $user = $request->user();
    $user->update($request->safe()->only(['name']));

    return back()->with('status', 'profile-updated');
})->middleware(['web', 'auth', 'verified']);
```

The `ProfileUpdateRequest` is your application's Form Request: it must define validation rules and authorize the target record or tenant. Never trust a client-supplied model ID, and never use `$request->all()` for model updates. Add a Policy and database transaction when required.

The Playground includes a working example storing `display_name`, `role`, `bio` and `notify` in a user-owned row, with feature tests covering authentication, invalid data, unauthorized user IDs and repeated updates. **Those feature tests have been authored but have not yet run in CI**, because private cross-repository dependencies require an authorized read token.

## Current capability matrix

| Capability | Current state |
| --- | --- |
| TextInput, Select, Textarea, Checkbox | Implemented in draft adapters |
| Explicit local POST / PUT / PATCH endpoints | Implemented in draft adapters |
| Laravel validation errors, processing state | Implemented in draft adapters |
| User-scoped Eloquent demo | Implemented on Playground branch |
| Framework-managed validation rules and Form Requests | Application-owned; no automatic generator |
| Hidden/Toggle/Radio/DatePicker | Planned |
| Conditional/dependent fields | Planned |
| Repeater / Wizard / relationship forms | Planned |
| Uploads, private storage, downloads | Planned |
| Full SSR/browser E2E and framework integration QA | Pending |

For production, retain Laravel's own route middleware, authorization, validation and policies.
