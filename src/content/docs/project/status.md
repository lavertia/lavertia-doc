---
title: Project status
description: Evidence-based feature availability and release readiness.
---

Last reviewed: **2026-10-16**. The Support Protocol v1 implementation was merged into `main` on October 16. Panels and Playground remain draft branches pending integration testing.

| Area | State | Reference |
| --- | --- | --- |
| Immutable PHP component protocol | Merged to main; golden fixture and CI verified (experimental) | [Support PR #5](https://github.com/lavertia/support/pull/5) |
| Basic Panel/Page and Starter Kit installation | Experimental | [Panels PR #4](https://github.com/lavertia/panels/pull/4) |
| Filament-inspired visual primitives | Draft | [Panels PR #5](https://github.com/lavertia/panels/pull/5) |
| Old Panels PHP namespaces / canonical package bridge | Compatibility shims on draft branch, not merged | [Panels PR #7](https://github.com/lavertia/panels/pull/7) |
| Advanced table interactions and Eloquent | Panels draft; standalone package in [Tables PR #2](https://github.com/lavertia/tables/pull/2) | [Panels PR #6](https://github.com/lavertia/panels/pull/6) |
| React/Vue/Svelte frontend builds and shared runtime checks | CI-tested in draft branches | [Panels Actions](https://github.com/lavertia/panels/actions) |
| Laravel integration in all three apps | Tests authored but skipped: private cross-repository checkout not configured | [Playground PR #4](https://github.com/lavertia/playground/pull/4) |
| Explicit form submit + Laravel persistence demo | Panels draft; standalone package in [Forms PR #2](https://github.com/lavertia/forms/pull/2) | [Forms guide](/lavertia-doc/packages/forms/) |
| Repeaters, Wizards, file uploads | Planned | [Forms issue](https://github.com/lavertia/forms/issues/1) |
| External API TableSource | Planned | [Tables issue](https://github.com/lavertia/tables/issues/1) |
| Standalone Panel Auth shell / OIDC | Planned | [Panel authentication design](/lavertia-doc/concepts/panels-and-auth/) |
| Plugin marketplace/registry runtime | Planned | [Plugin guide](/lavertia-doc/guides/plugins/) |

:::danger[Not production ready]
There is no verified stable release, full three-stack Laravel/SSR/browser E2E suite, or formal backward-compatibility policy. Expect changing PHP methods and JSON component shapes.
:::

## Security and public-source readiness

All code repositories undergo a full-Git-history secret scan before public visibility. A successful scan reduces risk but cannot prove that no secrets were ever committed. Historical Git commit-author emails also need maintainer review before publication. See the [public-release checklist](https://github.com/lavertia/lavertia/blob/main/docs/PUBLIC_RELEASE_CHECKLIST.md) and [release readiness issue](https://github.com/lavertia/lavertia/issues/3).
