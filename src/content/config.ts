import { defineCollection, z } from 'astro:content';

const weeklyUpdates = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'data',
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
  type: 'data',
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
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug:  z.string(),
    dept:  z.string(),
    type:  z.string(),
    loc:   z.string().default('Bangkok, TH'),
    desc:  z.string(),
    open:  z.boolean().default(true),
  }),
});

export const collections = {
  'weekly-updates':   weeklyUpdates,
  'always-available': alwaysAvailable,
  'locations':        locations,
  'collabs':          collabs,
  'careers':          careers,
};
