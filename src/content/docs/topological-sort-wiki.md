---
title: "Topological Sort"
topic: "graph"
difficulty: "Medium"
frequency: "High"
---
### What is Topological Sort?

An ordering of nodes in a **directed graph** where for every edge `A → B`, node `A` comes before node `B` in the ordering.

```
   A → B → D
   ↓       ↑
   C ──────┘

Valid orderings: [A, B, C, D] or [A, C, B, D]
Invalid: [B, A, ...] because A must come before B
```

### Key Points

- Only works on **DAG** (Directed Acyclic Graph) — if there's a cycle, no valid ordering exists
- Multiple valid orderings can exist
- Think of it as "what order to do tasks when some depend on others"

### Real-World Examples

- **Course prerequisites** — take Math 101 before Math 201
- **Build systems** — compile dependencies before the main file
- **Task scheduling** — finish task A before starting task B
- **Package managers** — install dependencies before the package

### Two Approaches

| | BFS (Kahn's) | DFS |
|---|---|---|
| **Adjacency list** | `prereq → [courses it unlocks]` | `course → [its prerequisites]` |
| **Start from** | Nodes with no dependencies (in-degree = 0) | Any node, recurse into dependencies |
| **Process** | Layer by layer, remove edges as you go | Post-order: add after all dependencies done |
| **Cycle detection** | If not all nodes processed → cycle | If node in "currently visiting" set → cycle |
| **Result order** | Natural order (first to last) | Reversed (or build from end) |

**Why opposite adjacency lists?**
- **DFS** asks: "What do I need first?" → looks backwards to prerequisites
- **Kahn's** asks: "Who can I unlock now?" → looks forwards to dependents

```
Same edge [1, 0] (take 0 before 1):
  DFS:    1 → [0]   "course 1 needs 0"
  Kahn's: 0 → [1]   "course 0 unlocks 1"
```

### When to Use Which?

- **Kahn's (BFS)**: When you need to process in "waves" or levels, or when in-degree info is useful
- **DFS**: When you're already doing graph traversal, or when detecting cycles is primary goal

### Implementations

- [Kahn's Algorithm (BFS)](/dsa-patterns/topological-sort-kahn-algorithm-course-schedul/) — returns `true/false` if courses can be finished
- [DFS Cycle Detection](/dsa-patterns/dfs-cycle-detection-course-schedule-ii/) — returns the actual ordering
