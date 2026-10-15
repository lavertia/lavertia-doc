---
title: Three-stack Playground
description: Run Lavertia with Vue, React and Svelte in parallel.
---

The [Playground repository](https://github.com/lavertia/playground) contains three independent Laravel Inertia Starter Kit apps.

```text
playground/
  vue/
  react/
  svelte/
```

After installing dependencies and configuring each app, start them on different ports:

```bash
(cd playground/vue && php artisan serve --port=8001)
(cd playground/react && php artisan serve --port=8002)
(cd playground/svelte && php artisan serve --port=8003)
```

| App | Experimental dashboard |
| --- | --- |
| Vue | http://127.0.0.1:8001/admin/dashboard |
| React | http://127.0.0.1:8002/admin/dashboard |
| Svelte | http://127.0.0.1:8003/admin/dashboard |

Each app has its own Laravel DB and authentication. When running them all on `127.0.0.1`, use **distinct session cookie names**, otherwise browser cookies can overwrite each other across ports:

```dotenv
SESSION_COOKIE=lavertia_vue_session
```

Use a separate name for React and Svelte. Distinct local domains via Herd/Valet provide stronger session and CSRF cookie isolation.

The advanced feature preview is on [Playground PR #2](https://github.com/lavertia/playground/pull/2), including snapshot column controls, a scoped Eloquent example, initial en/ar/fr localization and a user-owned validated form persistence demo. It is **not merged or production verified**.

The demo POST endpoint is `/admin/demo-profile`. It is protected by `auth` and writes only validated data to the signed-in user's profile relation. Run the new `LavertiaAdvancedTest.php` tests in each stack once private package dependencies are accessible to CI.
