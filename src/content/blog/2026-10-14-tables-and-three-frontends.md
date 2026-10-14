---
title: "One PHP UI tree, three frontend stacks"
description: "Progress on React, Vue and Svelte rendering, table descriptors and scoped Eloquent pagination."
date: 2026-10-14
author: Lavertia Team
tags: [Engineering, Tables, Inertia]
---

The Lavertia Playground has been used to exercise the same PHP-defined interface through **React**, **Vue**, and **Svelte** Laravel Starter Kits.

## What exists in the draft branches

The current Panels branch includes a composable table descriptor, a basic column manager, local filters on bounded snapshots and an **experimental Eloquent source** which receives a pre-scoped Builder and explicit authorization callback.

Using Laravel pagination for database-backed tables avoids loading an unbounded collection of records into the browser just to paginate them.

## Why authorization stays on the server

Column hiding and UI filters are presentation capabilities, not security controls. The server must decide which rows and fields may be sent to the frontend, and the application must enforce tenant membership and Policies independently of any Component.

## Next steps

We are tracking API-backed tables, persisted forms, repeaters, wizard steps and a standalone panel shell in separate issues and draft Pull Requests.

**Status:** Development preview, not a stable package release. Follow [lavertia/panels PR #6](https://github.com/lavertia/panels/pull/6) and the [Playground](https://github.com/lavertia/playground).
