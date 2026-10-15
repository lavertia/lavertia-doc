import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.SITE_URL ?? 'https://lavertia.github.io';
const base = process.env.SITE_BASE ?? '/lavertia-doc';
const prefix = base === '/' ? '/' : base.replace(/\/$/, '') + '/';

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'Lavertia',
      description: 'PHP-first composable interfaces for Laravel and Inertia.js.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/lavertia' },
      ],
      customCss: ['./src/styles/site.css'],
      editLink: { baseUrl: 'https://github.com/lavertia/lavertia-doc/edit/main/' },
      sidebar: [
        { label: 'Introduction', items: [
          { slug: 'index' },
          { slug: 'start/overview' },
          { slug: 'start/installation' },
          { slug: 'start/first-page' },
        ] },
        { label: 'Fundamentals', items: [
          { slug: 'concepts/architecture' },
          { slug: 'concepts/components' },
          { slug: 'concepts/component-protocol-v1' },
          { slug: 'concepts/frontend-adapters' },
          { slug: 'concepts/panels-and-auth' },
        ] },
        { label: 'Packages', items: [
          { slug: 'packages/support' },
          { slug: 'packages/panels' },
          { slug: 'packages/tables' },
          { slug: 'packages/forms' },
          { slug: 'packages/actions-infolists' },
        ] },
        { label: 'Guides', items: [
          { slug: 'guides/localization' },
          { slug: 'guides/eloquent-security' },
          { slug: 'guides/three-stack-playground' },
          { slug: 'guides/plugins' },
        ] },
        { label: 'Project', items: [
          { slug: 'project/status' },
          { slug: 'project/contributing' },
          { slug: 'project/roadmap' },
          { label: 'Plugin directory', link: prefix + 'plugins/' },
          { label: 'Blog & updates', link: prefix + 'blog/' },
        ] },
      ],
    }),
  ],
});
