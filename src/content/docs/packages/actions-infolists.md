---
title: Actions & Infolists
description: Navigation actions, read-only entries and their planned standalone packages.
---

Current **navigation actions** support a label, appearance and an explicitly validated path or HTTPS URL.

```php
Action::make('source')
    ->label('View source')
    ->appearance('primary')
    ->url('https://github.com/lavertia');
```

This is **not a server-side command**. It does not perform mutations, authorize record actions, submit a form or confirm dangerous operations.

Infolists display read-only, already-selected values:

```php
Infolist::make('workspace')->components([
    TextEntry::make('name')->label('Workspace')->value('Example'),
]);
```

The long-term goal is to extract `lavertia/actions` and `lavertia/infolists` from Panels, enabling both to render in ordinary Laravel pages.

### Planned Actions

- Authorized POST/PATCH/DELETE server handlers.
- Confirmation dialogs, loading and error state.
- Row/bulk actions with explicit scopes and CSRF.
- Policy evaluation and idempotency for high-impact operations.

### Planned Infolists

- Reusable nested layouts and typed fields.
- Relationship data loaded intentionally and without N+1.
- Controlled formatting, redaction, copy and download actions.

See [security guidance](/lavertia-doc/guides/eloquent-security/).
