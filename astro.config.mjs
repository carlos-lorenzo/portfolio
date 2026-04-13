import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://carloslorenzo.dev', // Ensure this points to your actual domain
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  integrations: [
    react({
      // Provide options for React if necessary
    }),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],
});
