---
title: Support package
description: Component contracts, composable containers and versioned serialization.
---

**Repository:** [lavertia/support](https://github.com/lavertia/support)

**Status:** Experimental 0.1 development on `feat/component-protocol-v1`.

Support is the framework-neutral layer of the Lavertia system. It defines component contracts, immutable builder-style components and a JSON-safe serializer.

```php
use Lavertia\Support\Components\Column;
use Lavertia\Support\Components\Card;
use Lavertia\Support\Components\Text;
use Lavertia\Support\Serialization\ComponentProtocol;

$layout = Column::make([
    Card::make([
        Text::make('Hello from Lavertia'),
    ]),
]);

$payload = ComponentProtocol::from($layout);
```

The output includes a protocol version and a serializable component tree. It is passed to the frontend through Inertia or another controlled transport.

## What Support does not do

Support does not manage Laravel routes, authentication, database queries or frontend-specific rendering. It should remain reusable without Panels.

**Security:** Only serialize props you intend to expose. A field that is hidden visually can still be present in the JSON response; never expose secrets through component props.
