---
title: Component Protocol v1
description: Versioned JSON contract, golden fixture, security limits and schema.
---

Lavertia PHP components are serialized to a **frontend-neutral JSON protocol**. Its first envelope is version 1. The protocol implementation lives in `lavertia/support` and is now merged into `main`.

**Schema:** [Component Protocol v1 JSON Schema](/lavertia-doc/schemas/component-protocol-v1.json) · **Source:** [Support Protocol v1 documentation](https://github.com/lavertia/support/blob/main/docs/PROTOCOL_V1.md) · [Verified PHP 8.3/8.4 tests](https://github.com/lavertia/support/pull/5)

## Example

```json
{
  "version": 1,
  "tree": {
    "type": "column",
    "key": "root",
    "props": {},
    "components": [
      {
        "type": "text",
        "key": "root/heading",
        "props": {"content": "Hello"},
        "components": []
      }
    ]
  }
}
```

The four node fields are always `type`, `key`, `props` and `components`. Empty props serialize as `{}`, not `[]`. Keys are stable across renders. The protocol permits JSON-only values in props.

## Server-side guarantees

- Reject closures, PHP models, resources, non-finite floats and other non-JSON props.
- Reject duplicate sibling keys, invalid node types and cyclic component graphs.
- Reject trees with more than 1,000 nodes, depth beyond 32 and property nesting beyond 16.
- Preserve the version marker and require adapters to reject unsupported versions.

The JSON Schema validates **shape**, not all runtime constraints. The PHP serializer is authoritative for global limits, duplicate-key and cycle detection. The versioned golden fixture in Support is regression-tested in CI.

## Security boundary

Auth, Eloquent scoping, tenant isolation, validation and permissions are decided in Laravel, **before** serialization. React/Vue/Svelte render data already authorized by Laravel. A hidden UI element cannot secure a model or field.

## Stability

This is a **tested development protocol**, not a published semver-stable Composer release. v0.1 and v0.2 feature branches still require private-package Laravel integration and browser/SSR verification. See [project status](/lavertia-doc/project/status/).
