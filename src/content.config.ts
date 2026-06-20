import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		// Extend Starlight's docs schema with the DSA-specific metadata fields
		// that used to be plain text lines styled by the Docsify regex plugin.
		schema: docsSchema({
			extend: z.object({
				topic: z.string().optional(),
				difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
				frequency: z.string().optional(),
			}),
		}),
	}),
};
