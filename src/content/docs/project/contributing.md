---
title: Contributing
description: Help improve Lavertia documentation, plugins, examples and framework packages.
---

Lavertia is built across multiple repositories. Use the matching repository for each change:

- [Support](https://github.com/lavertia/support): Contracts and serialization.
- [Panels](https://github.com/lavertia/panels): Panel runtime and current adapter prototypes.
- [Playground](https://github.com/lavertia/playground): Three Laravel Starter Kit demos and tests.
- [Docs](https://github.com/lavertia/lavertia-doc): Guides, blog posts and plugin catalog.

## Improve a documentation page

Select **Edit this page** at the bottom of a documentation page (when signed in and authorized) or open a PR against `src/content/docs`.

Use a concrete code sample that matches the currently implemented API. Flag prototypes and planned features. Do not describe a draft PR as a stable release.

## Write a post

Add an English Markdown file under `src/content/blog/` with title, description, date, author and tags frontmatter. GitHub Actions rebuild the [Blog](/lavertia-doc/blog/) when merged.

## Submit a plugin

See [Building plugins](/lavertia-doc/guides/plugins/) and the [Plugin directory](/lavertia-doc/plugins/). All entries are reviewed in PRs; no automatic publication from unknown third parties.

## Quality gates

Run `npm run lint:content` and `npm run build`. Include links to package PRs, tests and compatibility claims where relevant.
