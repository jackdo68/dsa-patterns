# DSA Interview Prep System

A comprehensive, pattern-based approach to mastering Data Structures & Algorithms for technical interviews. Built as an **[Astro](https://astro.build) + [Starlight](https://starlight.astro.build)** documentation site and deployed to GitHub Pages.

🔗 **Live site:** https://jackdo68.github.io/dsa-patterns

## What's Inside

Over **100 algorithm patterns and concept notes** designed to help you:
- **Understand** core DSA concepts and how they relate
- **Recognize** which pattern to apply to new problems
- **Practice** systematically at your own pace
- **Master** technical interviews through pattern-based thinking

## Repository Structure

```
/
├── astro.config.mjs              # Site config (title, base path, mermaid, sidebar)
├── src/
│   ├── content/docs/             # All content (.md/.mdx) — patterns, guides, wikis
│   │   └── index.mdx             # Homepage
│   ├── content.config.ts         # Content schema (topic/difficulty/frequency)
│   ├── sidebar.js                # Navigation hierarchy
│   ├── components/               # Badges, page-title override, mermaid lightbox
│   └── styles/theme.css          # Theme (fonts, colors)
├── public/favicon.svg            # Site favicon
├── .github/workflows/deploy.yml  # GitHub Pages deployment
└── playground/                   # Scratchpad for working solutions
```

## Running Locally

```bash
npm install
npm run dev      # Dev server on http://localhost:4321/dsa-patterns
npm run build    # Static build into dist/
npm run preview  # Preview the production build
```

The site ships with full-text search (Pagefind), syntax-highlighted code (Expressive Code), prev/next pagination, and Mermaid diagrams — all out of the box.

## Quick Start

### 1. Browse All Patterns
Explore the **[Quick Reference](src/content/docs/quick-reference.md)** to see all patterns with triggers, complexity, and code templates.

### 2. Understand Relationships & Combinations
Read the **[Pattern Guide](src/content/docs/pattern-guide.md)** to learn how patterns connect, combine, and when NOT to use them.

### 3. Study Individual Patterns
Dive into `src/content/docs/` for detailed explanations and TypeScript implementations of each problem.

## Study Approach

### 🎯 Recommended Learning Flow
1. Study the pattern from its note
2. Implement it from scratch
3. Solve practice problems
4. Review connections to other patterns

### 📈 Building Mastery
- Focus on understanding patterns deeply rather than memorizing solutions
- Practice pattern recognition on new problems
- Learn how patterns combine in complex problems
- Build speed through repeated practice

## Pattern Categories Covered

### Core Data Structures
Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Tries

### Algorithm Techniques
- **Searching:** Binary Search, DFS, BFS
- **Two Pointers & Sliding Window**
- **Graph Algorithms:** Dijkstra, Bellman Ford, Floyd Warshall, Topological Sort, Union Find, MST
- **Dynamic Programming:** 1D, 2D, Grid, Knapsack, LIS, LCS, Interval DP
- **Backtracking:** Subsets, Permutations, Combinations, Partitioning
- **Greedy:** Intervals, Scheduling, Optimization
- **Advanced:** Monotonic Stack, Prefix Sum, Cyclic Sort, Floyd's Cycle Detection

## Authoring

Each pattern is a markdown file in `src/content/docs/` with frontmatter metadata that renders as colored badges:

```markdown
---
title: "Two Sum"
topic: "array, hash map"
difficulty: "Easy"
frequency: "High"
---

### Question
### Ideas
### Implementation
```

To add a pattern: create the file, add frontmatter, follow the **Question → Ideas → Implementation** template, and register it in `src/sidebar.js`. See [CLAUDE.md](CLAUDE.md) for full conventions.
