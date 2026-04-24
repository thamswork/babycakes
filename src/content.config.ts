import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const weeklyUpdates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/weekly-updates' }),
  schema: z.object({
    name:     z.string(),
    slug:     z.string(),
    date:     z.coerce.date().optional(),
    period:   z.string().optional(),
    tag:      z.string().default('bi-weekly'),
    image:    z.string().optional(),
    bg:       z.string().default('#4C4378'),
    desc:     z.string().optional(),
    price:    z.number().optional(),
    featured: z.boolean().default(false),
    draft:    z.boolean().default(false),
  }),
});

const alwaysAvailable = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/always-available' }),
  schema: z.object({
    name:      z.string(),
    slug:      z.string(),
    category:  z.string(),
    price:     z.string().optional(),
    image:     z.string().optional(),
    bg:        z.string().default('#1e0c06'),
    desc:      z.string().optional(),
    available: z.boolean().default(true),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/locations' }),
  schema: z.object({
    name:    z.string(),
    slug:    z.string(),
    zone:    z.string(),
    addr:    z.string(),
    hours:   z.string(),
    transit: z.string(),
    grab:    z.string().optional(),
    maps:    z.string().optional(),
    image:   z.string().optional(),
    hq:      z.boolean().default(false),
    active:  z.boolean().default(true),
  }),
});

const collabs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/collabs' }),
  schema: z.object({
    name:   z.string(),
    slug:   z.string(),
    type:   z.string(),
    desc:   z.string().optional(),
    logo:   z.string().optional(),
    line:   z.string().optional(),
    url:    z.string().optional(),
    active: z.boolean().default(true),
  }),
});

const careers = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/careers' }),
  schema: z.object({
    title:           z.string(),
    slug:            z.string(),
    dept:            z.string(),
    type:            z.string(),
    loc:             z.string().default('Bangkok, TH'),
    salary_min:      z.number().optional(),
    salary_max:      z.number().optional(),
    salary_note:     z.string().optional(),
    start_date:      z.string().optional(),
    desc:            z.string(),
    responsibilities:z.string().optional(),
    requirements:    z.string().optional(),
    benefits:        z.string().optional(),
    open:            z.boolean().default(true),
  }),
});

export const collections = {
  'weekly-updates':   weeklyUpdates,
  'always-available': alwaysAvailable,
  'locations':        locations,
  'collabs':          collabs,
  'careers':          careers,
};
