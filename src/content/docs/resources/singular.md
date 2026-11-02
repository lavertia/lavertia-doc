---
title: Singular resources
description: Model settings and singleton editing using the common Lavertia Page system.
sidebar:
  order: 9
---

Some settings screens have one record rather than a collection: a company profile, a homepage, or billing preferences. A full List Page would add unnecessary navigation.

## Use a standalone or Panel Page

Lavertia's core `Page`, `CardPage`, `FlatPage` and `SplitPage` can model these views independently of Resource collection routes.

~~~php
final class ManageOrganizationProfile extends CardPage
{
    public static function slug(): string
    {
        return 'organization-profile';
    }

    protected function cardWidth(): string
    {
        return 'lg';
    }

    protected function components(): array
    {
        // Resolve the active organization through tenant middleware;
        // render a form with safe, selected fields only.
        return [PageHeader::make('Organization profile')];
    }
}
~~~

Register the Page in your PanelProvider, or as an independent Laravel route when it is not tied to one Panel.

## The write-side contract

Use a **single** Form Request / update action that selects the record according to the authenticated organization, validates permitted fields, checks the Policy and writes inside a transaction. If the record does not exist, the action may create it using a database unique constraint per owner or organization.

Never select a singleton solely via a client-supplied record ID. Avoid auto-generating a resource list if there should never be multiple records.

## Future SingularResource helper

An optional `SingularResource` convenience type may unify view/create/edit mode and route naming without changing Page ancestry. It is **not available** in the current Panels branches.

Reference: [Filament 5 Singular resources](https://filamentphp.com/docs/5.x/resources/singular).
