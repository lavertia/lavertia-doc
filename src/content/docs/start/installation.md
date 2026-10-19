---
title: Installation
description: Install the public development-alpha Lavertia packages into a Laravel Inertia Starter Kit.
---

:::caution[Local development source, not Packagist stable]
The repositories are public but package versions have **not** been approved or tagged as supported releases. The examples below use Composer path repositories and explicit local version aliases. Never mistake these aliases for published tags.
:::

## Prerequisites

- PHP 8.3+ and Laravel 12/13, subject to package constraints.
- Laravel Inertia Starter Kit with React, Vue or Svelte.
- Node.js, npm and Composer.

## Clone source as sibling directories

```text
Lavertia/
  support/
  panels/
  forms/
  tables/
  playground/
    react/
    vue/
    svelte/
```

Clone the public GitHub repositories [support](https://github.com/lavertia/support), [panels](https://github.com/lavertia/panels), [forms](https://github.com/lavertia/forms), [tables](https://github.com/lavertia/tables) and optionally [playground](https://github.com/lavertia/playground). Use compatible `main` branches.

## Resolve local packages

The Playground applications already commit compatible `composer.lock` files and path repositories. In `playground/react` (or `vue` or `svelte`), run:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm ci
npm run build
```

For a **new** Starter Kit project, configure equivalent local Composer path repositories for all four packages with `composer config repositories.*`. The aliases currently used by Playground are `lavertia/support:0.1.0`, `lavertia/panels:0.1.0`, `lavertia/forms:0.2.0`, and `lavertia/tables:0.2.0`. Paths must match your local filesystem; the aliases are **not** published package versions.

## Install the renderer

```bash
php artisan lavertia:install --stack=react
# Or choose --stack=vue / --stack=svelte
php artisan vendor:publish --tag=lavertia-config
php artisan optimize:clear
npm run build
```

The installer does not overwrite existing frontend assets without `--force`. Review changes before reinstalling an adapter.

Configure a Panel Page in `config/lavertia.php`, preserve your Laravel auth middleware and visit the Panel while signed in. [Create your first Page](/lavertia-doc/start/first-page/) or [enable modular Navigation and Widgets](/lavertia-doc/guides/modular-panels/).

## Verify

```bash
php artisan route:list --path=admin
php artisan test
npm run types:check
npm run build
```

To live-refresh PHP edits during development, run `npm run dev` with Vite. This is full-browser refresh for PHP changes, not PHP hot swapping. For separate React/Vue/Svelte apps, use unique session cookie names or separate local domains.
