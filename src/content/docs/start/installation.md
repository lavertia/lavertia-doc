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
git -C support switch main

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

## Experimental v0.2 canonical package migration (draft branches only)

Forms and Tables source now has **private draft** Composer packages. To test the cross-package integration, clone `support`, `forms`, `tables`, `panels`, and `playground` as siblings. Use these branches:

```bash
git -C support switch main
git -C forms switch feat/v02-canonical-descriptors
git -C tables switch feat/v02-canonical-table-engine
git -C panels switch feat/v02-package-integration
git -C playground switch feat/v02-canonical-packages-integration
```

The experimental Panels version still uses a local Composer path alias of `0.1.0`, while Forms and Tables use local `0.2.0` aliases (these are **not published tags**). The Playground integration PR adds path repositories for all packages and a temporary Composer lock refresh in CI. **Regenerate and commit each Starter Kit's `composer.lock` before merging**; never hand-edit lock contents.

While these repositories are private, `LAVERTIA_READ_TOKEN` must have restricted `Contents: Read` access to Support, Panels, Forms and Tables, configured as an Actions secret where the CI needs cross-repo checkout. Never commit or share the token.

See [Panels migration PR #7](https://github.com/lavertia/panels/pull/7) and [Playground integration PR #4](https://github.com/lavertia/playground/pull/4).
