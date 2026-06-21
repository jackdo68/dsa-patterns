# DSA Patterns Codebase

A pattern-based Data Structures & Algorithms study system for technical interviews. Over 100 pattern and concept notes across 15 categories, all implemented in **TypeScript**. The site is built with **Astro + Starlight** and deployed to GitHub Pages.

## Structure

```
/
├── astro.config.mjs              # Astro/Starlight config (title, base, mermaid, sidebar)
├── src/
│   ├── content/docs/             # ALL site content (.md/.mdx) — main content lives here
│   │   └── index.mdx                 # Splash homepage
│   ├── content.config.ts         # Starlight schema, extended with topic/difficulty/frequency
│   ├── sidebar.js                # Sidebar nav hierarchy (imported by astro.config.mjs)
│   ├── components/
│   │   ├── Badges.astro              # Renders Topic/Difficulty/Frequency pills
│   │   ├── PageTitle.astro           # Override: title + badges under it
│   │   └── Head.astro                # Mermaid click-to-zoom lightbox
│   └── styles/theme.css          # Theme (fonts, colors, home-cards)
├── public/favicon.svg            # Binary-tree site favicon
├── .github/workflows/deploy.yml  # GitHub Pages deploy (Astro build via withastro/action)
└── playground/                   # Scratchpad for working solutions (not part of the site)
```

Base path is `/dsa-patterns` (served at `https://jackdo68.github.io/dsa-patterns`).

## Pattern Categories

1. Arrays & Strings (two sum, two pointer, sliding window, prefix sum, Kadane's)
2. Hash Maps (group anagrams, top k frequent, longest consecutive)
3. Arrays Advanced (matrix operations, cyclic sort)
4. Linked Lists (fast/slow, reversal, merge)
5. Stacks & Queues (min stack, monotonic stack/queue, expression evaluation)
6. Binary Search (rotated array, k closest)
7. Trees - DFS (preorder, inorder, postorder, path sum, diameter, LCA, serialize)
8. Trees & Graphs - BFS (level order, right side view, islands, cycle detection)
9. Graph Algorithms (clone graph, word ladder, topological sort, union find, Dijkstra, Bellman-Ford, Floyd-Warshall, MST)
10. Heaps (merge k lists, median stream, scheduling)
11. Backtracking (subsets, permutations, combinations)
12. Greedy (intervals, stock problems)
13. Dynamic Programming (knapsack variants, LCS, LIS, grid DP, interval DP)
14. Sorting (merge sort, sort list, quick sort)
15. Advanced Data Structures (Trie, LRU Cache, Fenwick Tree)

## File Conventions

**Pattern files** in `src/content/docs/`:
- Naming: `technique-name-problem.md` (e.g., `dfs-number-of-islands.md`, `0-1-knapsack-target-sum.md`)
- All lowercase with hyphens. The filename is the page slug (e.g. `/dsa-patterns/dfs-number-of-islands/`).

**Markdown structure** — metadata lives in YAML frontmatter (rendered as colored badges under the title by `PageTitle.astro`):
````markdown
---
title: "Pattern Title"
topic: "array, hash map"
difficulty: "Easy"      # Easy | Medium | Hard
frequency: "High"
---

### Question
[Problem statement]

### Ideas
[Approach explanation]

### Implementation
```typescript
// TypeScript solution
```
````

**Internal links** use site routes, not file paths: `[Two Sum](/dsa-patterns/two-sum/)`.

## Running Locally

```bash
npm install
npm run dev      # Dev server on http://localhost:4321/dsa-patterns
npm run build    # Static build into dist/
npm run preview  # Preview the production build
```

Starlight provides search (Pagefind), code highlighting (Expressive Code), and prev/next pagination out of the box. Mermaid diagrams are supported (`astro-mermaid`) with a click-to-zoom lightbox.

## Key Files for Quick Reference

- `src/content/docs/quick-reference.md` - All patterns with time/space complexity, triggers, templates
- `src/content/docs/pattern-guide.md` - Pattern families, combinations, when NOT to use
- `src/sidebar.js` - Full navigation structure (edit to reorder/rename nav)
- `src/components/Badges.astro` - Topic/difficulty/frequency color definitions

## When Adding New Patterns

1. Create a markdown file in `src/content/docs/` following the naming convention
2. Add frontmatter (`title`, and optionally `topic` / `difficulty` / `frequency`)
3. Use the standard template (Question → Ideas → Implementation)
4. Add an entry to the appropriate category in `src/sidebar.js` (`{ label, slug }`)
5. Add time/space complexity in the solution

## Ideas Section Writing Convention

The `Ideas` section must explain **thought process and instincts**, not just the solution steps. The goal is that a reader facing a similar unseen problem can reason their way to a solution — not just recognize this one.

**Structure each Idea around:**
- **What signals in the problem trigger this approach?** (e.g., "sorted array + two unknowns → two pointers")
- **Why does this technique fit?** The underlying reasoning, not just "use X"
- **What general instinct does this build?** State it as a reusable rule

**Avoid:** listing steps without explaining why each step was chosen.
**Aim for:** a reader who finishes the section could derive the implementation themselves.
