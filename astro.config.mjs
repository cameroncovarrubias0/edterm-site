// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://edterm.com',
  trailingSlash: 'never',
  // Emit /reasoning-layer.html (not /reasoning-layer/index.html) so Vercel cleanUrls serves /reasoning-layer.
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /pitch is never listed; /styleguide is an internal review page.
      filter: (page) => !/\/(pitch|styleguide)(\.html)?$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
