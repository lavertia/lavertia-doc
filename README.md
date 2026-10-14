# Lavertia Documentation Portal

Source for Lavertia's documentation, blog and curated plugin directory.

**Website:** GitHub Pages, intended public URL: https://lavertia.github.io/lavertia-doc/ — **not verified live until Pages is enabled and deployment succeeds**.

Built on [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/). This is a static site: GitHub Pages serves HTML/CSS/JS, not a Laravel PHP runtime.

## Local development

Requirements: Node 24+, npm.

```bash
npm install
npm run dev
npm run lint:content
npm run build
```

Open the local URL shown by `npm run dev`. To test the site using the root path on localhost instead of `/lavertia-doc`, run `SITE_URL=http://localhost:4321 SITE_BASE=/ npm run dev`.

## Deploy directly from GitHub

1. Open **Settings → Pages** for `lavertia/lavertia-doc`.
2. Set **Build and deployment → Source: GitHub Actions**.
3. Merge the docs website PR to `main`. The `.github/workflows/deploy.yml` workflow builds and publishes the `dist/` directory.
4. Check the workflow and Pages settings for the **actual published URL**. For a public Pages project, it normally is `https://lavertia.github.io/lavertia-doc/`. Private publishing in an enterprise organization may use a unique Pages domain.
5. Since the source repository is currently **private**, choose the desired Pages visibility and check your GitHub plan/organization settings. GitHub Pages is not available from private repositories on every plan. Making source public is an explicit repository-visibility decision.
6. Do **not** claim the site is live until its URL opens successfully.

Changing to a custom domain? Update `SITE_URL` and `SITE_BASE=/` in the deployment environment and follow GitHub Pages DNS/CNAME instructions.

## Content structure

```text
src/content/docs/        Starlight Markdown/MDX docs
src/content/blog/        Posts (title, description, date, author, tags)
src/data/plugins.json    Curated plugin registry; initially empty
src/pages/blog/          Static posts listing and detail routes
src/pages/plugins/       Static directory, detail routes and search
src/styles/              Starlight + portal visual system
.github/workflows/       CI and GitHub Pages deployment
```

## Publish a post

Create a file under `src/content/blog` with frontmatter:

```yaml
---
title: "How to build a custom component"
description: "A practical guide to the Lavertia component protocol."
date: 2026-10-14
author: "Your Name"
tags: [Tutorial]
draft: false
---
```

Write Markdown below the frontmatter. Submit a PR. The blog is rebuilt at deploy time.

## List a plugin

The plugin registry is **curated and empty by design** until external packages have been reviewed. Open an issue using the **Plugin submission** template or add a checked entry to `src/data/plugins.json` via PR:

```json
{
  "slug": "example-plugin",
  "name": "Example Plugin",
  "description": "What this plugin does.",
  "author": "Maintainer",
  "repository": "https://github.com/example/example-plugin",
  "documentation": "https://example.org/docs",
  "category": "Tables",
  "frameworks": ["react", "vue"]
}
```

Do not submit the example as a real listing. A directory listing does not equal a security audit. Validate package provenance, compatibility, license and maintainer details.

## Source-of-truth policy

Do not document roadmap features as implemented. The package integration is currently experimental; cross-check the code and accompanying tests for API claims. Source code for Lavertia lives in its dedicated GitHub repositories.

License: MIT (website source). Names, logos and third-party materials retain their respective ownership.
