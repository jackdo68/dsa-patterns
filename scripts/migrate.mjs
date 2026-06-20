// One-shot migration: notes/*.md + guides/*.md  ->  src/content/docs/*.md
//  - lifts the H1 into `title`
//  - lifts Topic / Difficulty / Interview Frequency / Tags into frontmatter
//  - rewrites internal .md links to Starlight routes (/dsa-patterns/<slug>/)
// Also generates src/sidebar.js from _sidebar.md so ordering stays faithful.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename } from 'node:path';

const BASE = '/dsa-patterns';
const DIFFS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

// Rewrite a single link target to a Starlight route (or leave external/anchor links).
function rewriteTarget(t) {
	if (/^(https?:|mailto:|#)/.test(t)) return t; // external / in-page anchor
	if (t === '/' || t === '') return `${BASE}/`; // home
	// split off any #anchor
	const [path, anchor] = t.split('#');
	const m = path.match(/([a-z0-9._-]+)\.md$/i);
	if (!m) return t; // not a markdown link — leave as-is
	const slug = m[1];
	return `${BASE}/${slug}/${anchor ? '#' + anchor : ''}`;
}

function rewriteLinks(body) {
	return body.replace(/\]\(([^)]+)\)/g, (full, target) => `](${rewriteTarget(target)})`);
}

function convert(file) {
	const raw = readFileSync(file, 'utf8');
	const lines = raw.split('\n');
	const slug = basename(file, '.md');
	let title, topic, difficulty, frequency;
	const body = [];

	for (const line of lines) {
		let m;
		if (!title && (m = line.match(/^#\s+(.+)/))) { title = m[1].trim(); continue; }
		if ((m = line.match(/^Topic:\s*(.+)/i))) { topic = m[1].trim(); continue; }
		if ((m = line.match(/^Difficulty:\s*(.+)/i))) {
			const d = DIFFS[m[1].trim().toLowerCase()];
			if (d) difficulty = d; // only accept Easy/Medium/Hard (schema enum)
			continue;
		}
		if ((m = line.match(/^Interview Frequency:\s*(.+)/i))) { frequency = m[1].trim(); continue; }
		if ((m = line.match(/^Tags:\s*(.+)/i))) { topic = topic ?? m[1].trim(); continue; }
		body.push(line);
	}
	while (body.length && body[0].trim() === '') body.shift();

	const fm = ['---', `title: ${JSON.stringify(title ?? slug)}`];
	if (topic) fm.push(`topic: ${JSON.stringify(topic)}`);
	if (difficulty) fm.push(`difficulty: ${JSON.stringify(difficulty)}`);
	if (frequency) fm.push(`frequency: ${JSON.stringify(frequency)}`);
	fm.push('---', '');

	writeFileSync(`src/content/docs/${slug}.md`, fm.join('\n') + rewriteLinks(body.join('\n')));
	return slug;
}

// ---- convert all notes + guides ----
const files = [
	...readdirSync('notes').filter((f) => f.endsWith('.md')).map((f) => `notes/${f}`),
	...readdirSync('guides').filter((f) => f.endsWith('.md')).map((f) => `guides/${f}`),
];
const done = new Set();
for (const f of files) done.add(convert(f));
console.log(`Converted ${done.size} files into src/content/docs/`);

// ---- generate sidebar from _sidebar.md ----
const sb = readFileSync('_sidebar.md', 'utf8').split('\n');
const groups = [];
let cur = null;
for (const line of sb) {
	const top = line.match(/^\* (.+)/); // category or top-level link
	const item = line.match(/^\s+\* \[([^\]]+)\]\(([^)]+)\)/); // nested item
	if (item) {
		const label = item[1];
		const slugMatch = item[2].match(/([a-z0-9._-]+)\.md$/i);
		if (cur && slugMatch) cur.items.push({ label, slug: slugMatch[1] });
	} else if (top) {
		const text = top[1];
		if (text.startsWith('[')) continue; // standalone link like [Home](/)
		cur = { label: text, items: [] };
		groups.push(cur);
	}
}
const sidebar = groups.filter((g) => g.items.length);
writeFileSync(
	'src/sidebar.js',
	'// AUTO-GENERATED from _sidebar.md by scripts/migrate.mjs — do not edit by hand.\n' +
		'export const sidebar = ' + JSON.stringify(sidebar, null, '\t') + ';\n'
);
console.log(`Generated sidebar with ${sidebar.length} categories, ${sidebar.reduce((n, g) => n + g.items.length, 0)} items`);
