---
title: Forms
description: Current PHP form descriptors and planned validation and persistence engine.
---

**Status:** Experimental component previews in [Panels PR #6](https://github.com/lavertia/panels/pull/6). There is **no general-purpose save action** yet.

```php
Form::make('profile')
    ->label('Profile')
    ->components([
        TextInput::make('name')->label('Name'),
        Select::make('role')
            ->label('Role')
            ->options(['editor' => 'Editor', 'manager' => 'Manager']),
        Textarea::make('bio')->label('Biography')->rows(3),
        Checkbox::make('notify')->label('Send updates'),
    ]);
```

The React/Vue/Svelte templates display local input state. The form's submit button is intentionally disabled until secure server actions exist.

## Design goals inspired by Filament

| Form capability | Current state |
| --- | --- |
| TextInput, Select, Textarea, Checkbox | Local preview |
| Laravel FormRequest validation | Planned |
| Server submission and Policies | Planned |
| Hidden/Toggle/Radio/DatePicker | Planned |
| Conditional/dependent fields | Planned |
| Repeater and nested relationship forms | Planned |
| Wizard | Planned |
| FileUpload, private storage, downloads | Planned |
| RichEditor | Planned |

## Future persistence boundary

A production form must route through a Laravel controller/action that (1) authenticates, (2) authorizes the relevant model/tenant, (3) validates submitted fields, (4) performs changes in a transaction if needed, and (5) returns Inertia validation errors.

**Never treat client-side field visibility as permission to submit or modify a model attribute.**
