import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
const corrections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/corrections' }),
  schema: z.object({
    title: z.string().min(1), anchor: z.string().regex(/^[a-z0-9-]+$/),
    incorrect: z.array(z.string().min(1)).min(1), reasons: z.array(z.string().min(1)),
    notes: z.array(z.string().min(1)),
    sources: z.array(z.object({ label: z.string().min(1), url: z.url() }))
  })
});
export const collections = { corrections };
