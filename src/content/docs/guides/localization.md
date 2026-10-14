---
title: Localization & RTL
description: Current en/ar/fr controls and how to localize your Laravel component pages.
---

The experimental panel flow has basic language support for **English, Arabic and French**.

- `ResolveLocale` validates `?lang=en`, `?lang=ar` or `?lang=fr` and stores the selection in the Laravel session.
- Page metadata carries a `locale` and a `direction` (`rtl` for Arabic).
- Generic frontend table controls use an en/ar/fr dictionary with fallback to English.
- Application-specific PHP labels are translated through standard Laravel `__()` calls.

Example:

```php
PageHeader::make(__('lavertia.title'));
```

In the app, add `lang/ar/lavertia.php`:

```php
return [
    'title' => 'نظرة عامة',
];
```

Try the [Playground](/lavertia-doc/guides/three-stack-playground/) route `/admin/dashboard?lang=ar`.

:::note[Limited RTL scope]
Only the Lavertia **content area** has draft RTL support. Full translation and RTL of every Starter Kit sidebar, accessibility of mixed-direction strings and all components must still be tested. Do not claim complete multilingual readiness.
:::
