import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../src/content/docs/', import.meta.url);
const required = [
  'index.mdx',
  'start/overview.md',
  'start/installation.md',
  'start/first-page.md',
  'concepts/architecture.md',
  'concepts/components.md',
  'concepts/frontend-adapters.md',
  'concepts/panels-and-auth.md',
  'resources/overview.md',
  'resources/listing-records.md',
  'resources/creating-records.md',
  'resources/editing-records.md',
  'resources/viewing-records.md',
  'resources/deleting-records.md',
  'resources/managing-relationships.md',
  'resources/nesting.md',
  'resources/singular.md',
  'resources/global-search.md',
  'resources/widgets.md',
  'resources/custom-pages.md',
  'resources/code-quality-tips.md',
  'packages/support.md',
  'packages/panels.md',
  'packages/tables.md',
  'packages/forms.md',
  'packages/actions-infolists.md',
  'guides/localization.md',
  'guides/eloquent-security.md',
  'guides/three-stack-playground.md',
  'guides/plugins.md',
  'project/status.md',
  'project/contributing.md',
  'project/roadmap.md',
];
for (const name of required) {
  const full = new URL(name, root);
  if (!fs.existsSync(full)) throw new Error('Missing documentation page: ' + name);
  const content = fs.readFileSync(full, 'utf8');
  if (!/^---\s*\n[\s\S]+?\n---/.test(content)) throw new Error('Missing frontmatter: ' + name);
}
const registry = JSON.parse(fs.readFileSync(new URL('../src/data/plugins.json', import.meta.url),'utf8'));
const slugs = new Set();
for (const plugin of registry) {
  if (!/^[a-z0-9-]+$/.test(plugin.slug) || slugs.has(plugin.slug)) throw new Error('Invalid or duplicate plugin slug');
  if (!/^https:\/\//.test(plugin.repository)) throw new Error('Plugin repository must use HTTPS');
  if (!Array.isArray(plugin.frameworks) || !plugin.frameworks.every(s => ['react','vue','svelte'].includes(s))) throw new Error('Invalid framework compatibility');
  slugs.add(plugin.slug);
}
console.log('Content structure valid (' + required.length + ' documentation pages; ' + registry.length + ' plugins).');
