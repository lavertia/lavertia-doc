---
title: React, Vue & Svelte
description: The same versioned payload, different Inertia renderers.
---

Lavertia's current renderer templates target:

| Stack | UI technology | Experimental template |
| --- | --- | --- |
| React | React 19 + TypeScript | `react/renderer.tsx` |
| Vue | Vue 3 + TypeScript | `vue/renderer.vue` |
| Svelte | Svelte 5 + TypeScript | `svelte/renderer.svelte` |

Use the installer from [Installation](/lavertia-doc/start/installation/) to copy the matching renderer into your Laravel Starter Kit.

**Do not install all three runtimes into one app by default.** Each Starter Kit uses its own Inertia page resolver; the PHP schema is shared, not the client framework.

## Current behavior

- Responsive layouts, tables, basic form-field previews.
- Light and dark styling using the existing Starter Kit Tailwind CSS setup.
- Basic local interaction for bounded snapshots.
- Experimental en/ar/fr localized table labels and RTL content direction.

## Not yet verified

A passing Vite compilation is **not** full compatibility. Each adapter needs TypeScript checks, SSR/hydration tests, keyboard/mobile/RTL browser automation, authorization-focused integration tests and sustained maintenance.
