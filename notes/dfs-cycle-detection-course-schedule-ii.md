# DFS Cycle Detection - Course Schedule II

Topic: dfs, graph

Difficulty: Medium

Interview Frequency: High

### Question

[LeetCode 210 - Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

*There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.*

- *For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.*

*Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.*

### Ideas

**Instinct 1: "ordering with dependencies" → topological sort.** Whenever a problem says *"do X before Y"* across many items, you're looking at a directed graph of dependencies. The valid ordering is a topological sort. If a cycle exists, no valid ordering is possible.

**Instinct 2: "do prerequisites first" → post-order DFS.** To list a course, all its prerequisites must appear before it. Post-order DFS naturally guarantees this: we only add a node to the result **after** recursing into (and finishing) every node it depends on.

**Instinct 3: "cycle detection during DFS" → track the current path, not just visited.** A standard `visited` set isn't enough — it can't tell *"already finished"* apart from *"currently being explored."* We need two states:

- `visited` — *"fully processed; safe to reuse"* (already added to result)
- `cycle` — *"currently on the active DFS path from this root"*

If DFS reaches a node already in `cycle`, we've looped back onto our own path → back-edge → cycle. If we reach a node in `visited`, it's already done; skip it (no cycle, no rework).

The key move: **add to `cycle` when entering, remove from `cycle` when leaving** — `cycle` only contains nodes on the active recursion stack.

**Cycle example:**

```
A → B → C → A

Enter A: cycle = {A}
  Enter B: cycle = {A, B}
    Enter C: cycle = {A, B, C}
      Try A: A ∈ cycle → CYCLE DETECTED
```

**Topological order example:**

```
Prerequisites: 0 → 1 → 2  (take 0 before 1, 1 before 2)

DFS from 2: needs 1 → needs 0
  0 has no prereqs → finish 0, add to result
  1's prereqs done  → finish 1, add to result
  2's prereqs done  → finish 2, add to result

Result: [0, 1, 2] ✓
```

**Why we iterate all courses at the end:** the graph may have multiple disconnected components or unreachable nodes. Starting DFS from every course ensures we process all of them, while `visited` prevents redoing work.

### How the Solution Implements This

**Step 1: Build a `prereqList` map.** For each course, store the list of courses it directly depends on. This lets us look up "what does course A need?" in O(1).

```
prerequisites = [[1, 0], [2, 1]]
prereqList: { 1 → [0], 2 → [1] }
```

**Step 2: For each course, DFS into its prerequisites.** To finish course A, we recurse into every prerequisite of A first. Each recursion does the same: finish its prereqs before itself. Eventually, we hit a course with no prerequisites — that's the base of the chain, safe to add to the result first.

```
Want to take A:
  → recurse into A's prereqs
    → recurse into each prereq's prereqs
      → ... until a course with no prereqs is reached
      → add that course to result
    → all of A's prereqs are done → add A to result
```

**Step 3: Mark and unmark on the active path.** When DFS *enters* a course, add it to `cycle`. When DFS *finishes* the course (all its prereqs done), remove it from `cycle` and add it to `visited`. If at any point we try to recurse into a course already in `cycle`, we've found a back-edge → impossible.

**Step 4: Loop over all courses.** Not every course is reachable from every other — some may be isolated. Driving DFS from each course (skipping `visited` ones) ensures we cover the whole graph.

The result is built bottom-up: deepest prerequisites first, then everything that depends on them, in dependency-respecting order.

### Solution

```typescript
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const result: number[] = [];
  const prereqList = new Map<number, number[]>();

  for (const [main, pre] of prerequisites) {
    prereqList.set(main, [...(prereqList.get(main) || []), pre]);
  }
  const visited = new Set<number>();
  // detect cycle
  const cycle = new Set<number>();

  /**
   * loop through any prerequisite if existed
   * return true if there is cycle
   * add to visited and the course to result if no cycle detected
   */
  function hasCycle(course: number): boolean {
    if (cycle.has(course)) return true;
    if (visited.has(course)) return false;

    cycle.add(course);
    for (const pre of prereqList.get(course) || []) {
      if (hasCycle(pre)) return true;
    }

    cycle.delete(course);
    visited.add(course);
    result.push(course);
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return [];
  }
  return result;
}
```

### See Also

- [Topological Sort (concept)](notes/topological-sort-wiki.md) — what it is and when to use it
- [Kahn's Algorithm (BFS)](notes/topological-sort-kahn-algorithm-course-schedul.md) — alternative using BFS + in-degree
