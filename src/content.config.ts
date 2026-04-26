import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Carlos Lorenzo-Zúñiga Marí'),
    githubRepo: z.string().url().optional(),
    canonicalURL: z.string().url().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
