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
      // /pitch is never listed (it lives in public/, so this is a safeguard).
      filter: (page) => !/\/pitch(\.html)?$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
