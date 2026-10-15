---
title: Project status
description: Evidence-based feature availability and release readiness.
---

Last reviewed: **2026-10-16**. The Support Protocol v1 implementation was merged into `main` on October 16. Panels and Playground remain draft branches pending integration testing.

| Area | State | Reference |
| --- | --- | --- |
| Immutable PHP component protocol | Merged to main (experimental) | [Support repository](https://github.com/lavertia/support) |
| Basic Panel/Page and Starter Kit installation | Experimental | [Panels PR #4](https://github.com/lavertia/panels/pull/4) |
| Filament-inspired visual primitives | Draft | [Panels PR #5](https://github.com/lavertia/panels/pull/5) |
| Advanced table interactions and Eloquent | Draft | [Panels PR #6](https://github.com/lavertia/panels/pull/6) |
| React/Vue/Svelte frontend builds | CI-tested in draft branches | [Panels Actions](https://github.com/lavertia/panels/actions) |
| Laravel integration in all three apps | Incomplete / CI gated by private repo access | [Playground](https://github.com/lavertia/playground) |
| Explicit form submit + Laravel Eloquent persistence demo | Implemented in draft, not integration-verified | [Forms guide](/lavertia-doc/packages/forms/) |
| Repeaters, Wizards, file uploads | Planned | [Forms issue](https://github.com/lavertia/forms/issues/1) |
| External API TableSource | Planned | [Tables issue](https://github.com/lavertia/tables/issues/1) |
| Standalone Panel Auth shell / OIDC | Planned | [Panel authentication design](/lavertia-doc/concepts/panels-and-auth/) |
| Plugin marketplace/registry runtime | Planned | [Plugin guide](/lavertia-doc/guides/plugins/) |

:::danger[Not production ready]
There is no verified stable release, full three-stack Laravel/SSR/browser E2E suite, or formal backward-compatibility policy. Expect changing PHP methods and JSON component shapes.
:::
