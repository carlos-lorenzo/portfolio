import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        // Appended and absolutely positioned in pages.css, so the anchor never
        // becomes a grid item and breaks the h2/h3 rule layouts.
        [rehypeAutolinkHeadings, { behavior: 'append', properties: { ariaHidden: 'true', tabIndex: -1 } }],
      ],
    }),
    sitemap(),
  ],
});
