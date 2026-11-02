---
title: Resource global search
description: Design an authorized global search across Resource models without leaking tenant data.
sidebar:
  order: 10
---

Lavertia Panels has an evolving **global-search shell affordance**, but **automatic Resource model search integration is not yet implemented**. A search box on a Panel is not proof that an Eloquent Resource has an indexed, authorized search provider.

## A safe provider shape

A future Resource search provider should explicitly declare searchable fields, a capped result count and a human-readable record title. The provider must receive a tenant-scoped query, never `Model::query()` by default.

~~~php
// Host-side pattern, NOT an existing Lavertia global-search API.
public function searchTickets(string $term): Collection
{
    Gate::authorize('viewAny', Ticket::class);

    return TicketResource::query()
        ->where('title', 'like', '%' . $term . '%')
        ->limit(20)
        ->get(['id', 'title']);
}
~~~

A complete implementation must require a bounded search term, enforce record-level visibility, map record URLs only after authorization, avoid N+1 relationships and guard pagination/complex filters.

## SQL and indexing first

For low-volume data, indexed exact/prefix searches and the database's query planner may be sufficient. For multi-language full-text search, choose a supported PostgreSQL/MySQL strategy, or explicitly integrate Scout with a maintained engine when justified. Laravel Octane optimizes the long-running PHP worker lifecycle; it is **not a text search engine**.

Security tests must verify that a search cannot discover another tenant's names, even in suggestions, counts or cached results. Cache keys must include the user/tenant scope.

## Inertia-native UX

Use an accessible search dialog with keyboard navigation, debouncing, client-side cancellation of stale visits, and a small bounded payload. The server still validates all query terms and permissions. For larger result sets, return a dedicated results Page rather than shipping thousands of rows into the Panel shell.

## Planned API

Resource registration will eventually support searchable attributes, record titles, per-Resource result labels/icons, query adapters, and navigation into named View/Edit Pages. This is a roadmap item, not a property you should put into your Resource today.

Reference: [Filament 5 Global search](https://filamentphp.com/docs/5.x/resources/global-search).
