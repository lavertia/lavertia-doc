---
title: Managing relationships
description: Keep Eloquent relationship management scoped to the parent Resource and current tenant.
sidebar:
  order: 7
---

Lavertia supports ordinary Eloquent relationships because the backend is Laravel. **Filament-style Relation Managers are not yet shipped**: there is currently no automatic `HasMany` manager, attachment modal, or relationship CRUD screen generator.

## Use the parent record as the authority

Consider `Project hasMany Tasks`. After loading a Project through a tenant-scoped Resource query and checking its Policy, build the related query **through the parent relationship**:

~~~php
$project = ProjectResource::query()->whereKey($record)->firstOrFail();

Gate::authorize('view', $project);

$tasks = $project->tasks()
    ->where('visibility', 'public')
    ->orderBy('created_at', 'desc');
~~~

For viewing, a Lavertia Table can accept a scoped Eloquent Builder and explicit authorization closure. For mutation, repeat the parent and child Policies and ensure the foreign key belongs to that parent. Do not trust a submitted `project_id` if it can be derived from the authorized route context.

## Three useful composition patterns

- **Read-only relation Section:** reuse a Table component in a View Page or SplitPage inspector.
- **Dedicated child Resource:** a separate Resource is best when the child entity needs its own navigation, permissions and lifecycle.
- **Nested child routes:** include a parent identifier and validate it against the tenant and relationship before resolving a child.

In all three patterns, backend ownership remains in the module that owns the model. A frontend Widget does not authorize related data.

## Future Relation Manager API

The planned implementation must support `HasMany`, `BelongsToMany`, attach/detach and pivot fields, relation counts, soft deletes, action boundaries, and independent authorization per related model. The design may resemble Filament's Relation Managers, but it will use Laravel actions and Inertia components rather than Livewire.

Avoid claiming a `RelationManager::make()` class exists until it is released.

See [Filament 5 Managing relationships](https://filamentphp.com/docs/5.x/resources/managing-relationships).
