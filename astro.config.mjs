// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { sidebar } from './src/sidebar.js';

// https://astro.build/config
export default defineConfig({
	site: 'https://jackdo68.github.io',
	base: '/dsa-patterns',
	integrations: [
		// astro-mermaid must come before starlight
		mermaid({
			theme: 'default',
			autoTheme: true,
			mermaidConfig: {
				flowchart: { useMaxWidth: true, htmlLabels: true, padding: 12 },
				themeVariables: { fontSize: '15px' },
			},
		}),
		starlight({
			title: 'DSA Patterns',
			description:
				'A pattern-based approach to mastering Data Structures & Algorithms for technical interviews.',
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			components: {
				// Mermaid click-to-zoom lightbox (copied from system-design-patterns)
				Head: './src/components/Head.astro',
				// Renders Topic / Difficulty / Interview-Frequency badges under the title
				PageTitle: './src/components/PageTitle.astro',
			},
			lastUpdated: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			// Full sidebar, auto-generated from _sidebar.md (see scripts/migrate.mjs)
			sidebar,
		}),
	],
});
