---
title: Nested resources
description: Design secure parent-child URLs and model binding across tenants.
sidebar:
  order: 8
---

Nested resources represent parent-child ownership, such as organizations → projects → tasks. Filament offers dedicated nesting helpers; Lavertia currently provides **custom Resource Page routes**, not a finished nested Resource registry.

## What works today

A Resource Page mapping can register dynamic paths inside its Resource prefix:

~~~php
protected static array $pages = [
    'view' => Pages\ViewProject::class,
    'timeline' => [
        'page' => Pages\ProjectTimeline::class,
        'route' => '/{record}/timeline/{year}',
        'action' => 'view',
        'parameters' => ['heading' => 'Project timeline'],
    ],
];
~~~

The `{record}` is resolved from `Resource::query()`, then Policy-authorized, before the Page gets to `mount()`. Extra placeholders such as `{year}` need application validation.

This is **not yet** the same thing as automatically nesting a second Resource, e.g. `/organizations/{organization}/projects/{project}`.

## Secure nested resolution

When implementing a host parent-child endpoint, resolve the parent from a tenant-scoped query, then the child through that parent's relationship:

~~~php
$organization = Organization::query()
    ->whereHas('members', fn ($query) => $query->whereKey(auth()->id()))
    ->findOrFail($organizationId);

$project = $organization->projects()
    ->whereKey($projectId)
    ->firstOrFail();

Gate::authorize('view', $project);
~~~

A route binding like `Project::findOrFail($projectId)` without the parent filter is vulnerable to cross-organization access even if the URL looks nested.

## Planned nested Resource support

A future registry will need parent route bindings, composite URL generation, relationship-aware breadcrumbs and navigation, query inheritance, tenant scoping, custom child Resource Pages and route cache consistency. Avoid premature abstractions for recursive nesting; first test one parent/child boundary and build out.

Reference: [Filament 5 Nested resources](https://filamentphp.com/docs/5.x/resources/nesting).
