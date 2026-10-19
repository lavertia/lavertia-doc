---
title: Three-stack Playground
description: Run and test Lavertia with React, Vue and Svelte in parallel.
---

The public [Playground repository](https://github.com/lavertia/playground) contains three independent Laravel 13 + Inertia 3 Starter Kit apps:

```text
playground/
  vue/
  react/
  svelte/
```

## Run locally

Install dependencies separately for each app as described in [Installation](/lavertia-doc/start/installation/). Start their Laravel servers:

```bash
(cd playground/vue && php artisan serve --port=8001)
(cd playground/react && php artisan serve --port=8002)
(cd playground/svelte && php artisan serve --port=8003)
```

| Stack | Admin dashboard | Inventory demo |
| --- | --- | --- |
| Vue | http://127.0.0.1:8001/admin/dashboard | http://127.0.0.1:8001/admin/inventory/overview |
| React | http://127.0.0.1:8002/admin/dashboard | http://127.0.0.1:8002/admin/inventory/overview |
| Svelte | http://127.0.0.1:8003/admin/dashboard | http://127.0.0.1:8003/admin/inventory/overview |

The v0.3 demo also includes a Model demo Page and explicitly registered Dashboard Widget. Sample data is illustrative; the separate v0.2 model example demonstrates authorized user-scoped Eloquent query and persisted form validation.

Sign in to each Starter Kit separately. Cookies are shared across ports on the same hostname, so configure distinct `SESSION_COOKIE` values in each `.env`. Separate Valet/Herd domains provide stronger isolation.

## Verification

The [v0.3 Playground PR #12](https://github.com/lavertia/playground/pull/12) is **merged to main**, with Pest tests on all three stacks, frontend TypeScript and production builds, and PostgreSQL and config/route caching checks. Real InterNACHI/modular module installation is tested in [Panels PR #11](https://github.com/lavertia/panels/pull/11).

These are experimental source demos, **not a stable or audited production release**.
