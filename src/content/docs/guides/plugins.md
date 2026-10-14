---
title: Building and submitting plugins
description: Extend Lavertia with components and adapters; list community projects via pull requests.
---

**Plugin support is a planned ecosystem feature.** Lavertia does not yet provide a stable plugin registration ABI or marketplace installation API.

The [Plugin directory](/lavertia-doc/plugins/) exists as a curated, static catalog. New entries require review through GitHub Pull Requests. No plugin should be shown as officially endorsed unless maintained by the Lavertia organization.

## Proposed plugin package

A future Composer plugin may publish:
- PHP Component contracts or additional field types.
- React/Vue/Svelte renderers matching a protocol version.
- Optional Laravel ServiceProvider registration.
- Clear dependencies and supported Laravel/Lavertia versions.
- Documentation, automated tests and security policy.

## Request a listing

Open a [Plugin submission issue](https://github.com/lavertia/lavertia-doc/issues/new?template=plugin-submission.yml). Include:
- Public source code URL and maintainer.
- Composer/npm installation instructions.
- License and compatible protocol/framework versions.
- Screenshots or a working demo if the plugin has a visual interface.
- Security disclosure process.

After review, maintainers can add an entry to `src/data/plugins.json` through a PR. GitHub Actions rebuild the static directory; there is no arbitrary user-uploaded HTML or executable plugin code on this site.

**Listing does not imply a security audit.** Users should vet third-party code before installing.
