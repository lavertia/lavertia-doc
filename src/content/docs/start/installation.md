---
title: Installation
description: Install the experimental Lavertia packages in an existing Laravel Inertia Starter Kit.
---

:::caution[Development branches, not Packagist releases]
The installation below is for local development. The current packages are **private experimental repositories**, not stable publicly published Composer releases.
:::

## Prerequisites

- PHP 8.3+ and a Laravel 12/13 application (check package constraints first).
- An official Laravel **Inertia Starter Kit**: Vue, React or Svelte.
- Node.js and npm installed.
- Read access to [lavertia/support](https://github.com/lavertia/support) and [lavertia/panels](https://github.com/lavertia/panels).

## Clone alongside your application

```text
Lavertia/
├── support/
├── panels/
└── playground/
    ├── vue/
    ├── react/
    └── svelte/
```

Checkout compatible branches:

```bash
git -C support fetch origin
git -C support switch feat/component-protocol-v1

git -C panels fetch origin
git -C panels switch feat/tables-forms-i18n-v02
```

## Configure Composer path repositories

Run inside your Starter Kit application (for example `playground/vue`):

```bash
composer config repositories.lavertia-support '{"type":"path","url":"../../support","options":{"symlink":true,"versions":{"lavertia/support":"0.1.0"}}}'
composer config repositories.lavertia-panels '{"type":"path","url":"../../panels","options":{"symlink":true,"versions":{"lavertia/panels":"0.1.0"}}}'
composer require 'lavertia/panels:^0.1'
```

These paths assume the directory structure above. Adjust them if your project lives elsewhere.

## Install a frontend renderer

Choose **one** stack per Laravel application:

```bash
php artisan lavertia:install --stack=vue
# --stack=react or --stack=svelte
php artisan vendor:publish --tag=lavertia-config

php artisan optimize:clear
npm run build
```

The installer copies TypeScript and framework-specific page/renderer files into `resources/js`. It refuses to overwrite existing files unless `--force` is passed. Review local changes before using `--force`.

## Verify

```bash
php artisan route:list --path=admin -v
php artisan test
```

You must still register a Page class in `config/lavertia.php` and use your application's existing authentication before visiting its panel route.

See [first page](/lavertia-doc/start/first-page/) and the [Playground guide](/lavertia-doc/guides/three-stack-playground/).
