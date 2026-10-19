---
title: Project status
description: Verified package functionality and remaining release gates.
---

Last reviewed: **19 October 2026**. All seven Lavertia source repositories are **public**; that does not mean a stable package release exists.

| Area | Implemented and verified | Reference |
| --- | --- | --- |
| Component Protocol v1 | Merged to Support main; golden fixtures, serialization limits and CI | [Support](https://github.com/lavertia/support) |
| Panel/Page routing and auth middleware | Merged, Laravel 13 integration verified | [Panels](https://github.com/lavertia/panels) |
| Canonical Forms/Tables | Merged to public packages, included in Playground v0.2 | [Playground PR #9](https://github.com/lavertia/playground/pull/9) |
| React/Vue/Svelte | Three-stack Laravel/Pest, TypeScript and production builds successful | [Playground CI](https://github.com/lavertia/playground/actions) |
| SQLite/PostgreSQL persistence | Guarded model demo and automated PostgreSQL integration verified | [v0.2 CI](https://github.com/lavertia/playground/actions/runs/39191592220) |
| PHP development auto refresh | Vite full-browser refresh on app and module PHP changes | [Playground PR #11](https://github.com/lavertia/playground/pull/11) |
| Module-owned Pages | PSR-4 discovery with installed InterNACHI/modular, secure Panel routes and cache | [Panels PR #9](https://github.com/lavertia/panels/pull/9) |
| Navigation + Dashboard Widgets | v0.3 alpha merged; Gate-filtered, Panel-scoped; tested after config/route caching | [Panels PR #11](https://github.com/lavertia/panels/pull/11) |
| v0.3 Starter Kit showcase | Navigation/Inventory/Model demo Pages and Widget in three stacks, CI verified | [Playground PR #12](https://github.com/lavertia/playground/pull/12) |
| Resources / Relation Managers | Planned, not implemented | [v0.3 plan](https://github.com/lavertia/lavertia/issues/6) |
| Standalone Auth UI / OIDC and Plugin SDK | Planned, not implemented | [Auth concepts](/lavertia-doc/concepts/panels-and-auth/) |

:::danger[Not production ready]
No supported stable tags or public Packagist release have been approved. Browser-level end-to-end QA, accessibility, mobile/RTL reviews, version compatibility and maintainer security/asset reviews are still pending. Source merges and automated CI do not certify production readiness.
:::

See the [public release readiness issue](https://github.com/lavertia/lavertia/issues/3) and [v0.3 roadmap](https://github.com/lavertia/lavertia/issues/6).
