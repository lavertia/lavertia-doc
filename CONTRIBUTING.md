# Contributing to Lavertia Docs

Thank you for improving the developer experience. This site is a GitHub Pages static project and accepts Pull Requests for guides, posts, translations, visual improvements and reviewed plugins.

1. Open an issue for substantial changes or documentation inaccuracies. Report security issues **privately**, as described in [SECURITY.md](SECURITY.md); never disclose a vulnerability or secret in a public issue.
2. Use Markdown/MDX under `src/content/docs` for product documentation.
3. Use `src/content/blog` for posts. Provide a real author, publish date and descriptive summary; draft posts are excluded from listing.
4. Submit third-party plugins through the [issue form](https://github.com/lavertia/lavertia-doc/issues/new?template=plugin-submission.yml); maintainers review entries and add them to `src/data/plugins.json`.
5. Run `npm run lint:content && npm run build` before creating a PR.
6. Distinguish experimental API behavior from stable published packages. Link to source PRs when making claims.

Do not include secrets, API tokens, contact data without consent, plagiarized docs content, or false package endorsements.

**Accessibility:** Check keyboard navigation, meaningful headings, color contrast, responsive layout and readable text.
