---
title: Architecture
description: Package boundaries, component protocol, frontend adapters and optional panels.
---

Lavertia separates **UI definition** from **rendering** and from **application shell**.

```text
Laravel application
  ├── Routes / Policies / Eloquent / Auth
  ├── PHP component descriptors
  │     ├── lavertia/support (contracts, JSON protocol)
  │     ├── lavertia/tables (planned extraction)
  │     ├── lavertia/forms (planned extraction)
  │     ├── lavertia/actions / infolists (planned)
  │     └── lavertia/panels (optional application shell)
  └── Inertia response
        └── React | Vue | Svelte renderer
```

## What belongs where?

| Repository | Responsibility | Current state |
| --- | --- | --- |
| [support](https://github.com/lavertia/support) | PHP contracts, composition, safe JSON serialization | Merged to main (experimental) |
| [panels](https://github.com/lavertia/panels) | Laravel routes, Page, panel configuration, generated adapters | Experimental implementation |
| [tables](https://github.com/lavertia/tables) | Reusable data-table engine | Extraction planned |
| [forms](https://github.com/lavertia/forms) | Reusable form engine | Extraction planned |
| [actions](https://github.com/lavertia/actions) | Server commands / action descriptors | Planned |
| [infolists](https://github.com/lavertia/infolists) | Read-only detail components | Planned |
| [ui](https://github.com/lavertia/ui) | Independent React/Vue/Svelte runtime adapters | Extraction planned |

## The wire protocol

PHP's `ComponentProtocol::from($root)` serializes a **versioned, JSON-safe** component tree. React, Vue and Svelte render that tree without executing PHP in the browser.

The browser must never receive closures, Laravel models, API credentials or permission decisions.

## Can I use Lavertia without a Panel?

**Architecturally yes.** You can compose Support components and return the serialized tree from a plain Inertia Controller/Route. However, the reusable frontend adapters are still bundled with the experimental Panels package; full standalone ergonomics are an upcoming milestone.

See [Panels and authentication](/lavertia-doc/concepts/panels-and-auth/).
