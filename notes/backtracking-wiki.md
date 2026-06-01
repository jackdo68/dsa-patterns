# Backtracking Wiki

Topic: backtracking, dfs

Difficulty: Medium

Interview Frequency: High

### When to Reach for Backtracking

Backtracking is the right tool whenever you need to **enumerate or explore all possible configurations** built up by a sequence of choices.

**Signals:**
- *"Find all subsets / permutations / combinations / partitions..."*
- *"Find any/all paths satisfying a condition"*
- *"Count the number of ways to..."*
- *"Place N items such that..."* (N-Queens, Sudoku, scheduling)

**The instinct:** at each step you face a *decision* (pick this / skip / try each option), and the answer depends on a *complete sequence* of those decisions. If brute force enumeration would work but you want to prune dead ends, that's backtracking.

---

### The Universal Template

```typescript
function backtrack(state: State): void {
  if (isComplete(state)) {
    record(state);            // save a copy — state will be mutated next
    return;
  }
  for (const choice of choices(state)) {
    if (!isValid(choice, state)) continue;   // pruning (optional)
    apply(choice, state);     // make
    backtrack(state);         // recurse
    undo(choice, state);      // undo
  }
}
```

Three things every backtracking function does:
1. **Check if done** — record a copy of the current state, then return
2. **For each choice, apply → recurse → undo** — the "make/undo" pair sandwiches the recursive call
3. **(Optional) Prune** — skip invalid or already-tried choices

---

### Why `apply` and `undo` Go Inside the For-Loop

**The core rule:** every recursive call must correspond to exactly one choice — applied before recursing, undone before returning. The `apply` and `undo` must wrap the recursive call **inside** the loop:

```typescript
function dfs(state) {
  if (isComplete(state)) { record(state); return; }
  for (const c of choices) {
    if (!isValid(c, state)) continue;
    apply(c, state);
    dfs(state);
    undo(c, state);
  }
}
```

Each iteration: apply one choice → recurse → undo. The `undo` after the recursion restores the state, so the next iteration starts from the same point and tries a different choice. **That's how the branching happens.**

---

**The wrong version — choice not tied to a branch:**

```typescript
function dfs(state) {
  if (isComplete(state)) { record(state); return; }
  apply(someFixedChoice, state);      // ❌ one choice for ALL branches
  for (const c of choices) {
    if (!used(c)) dfs(state);          // every branch sees the same state
  }
  undo(someFixedChoice, state);
}
```

This commits to a single choice **before** branching, so every recursive call sees the same mutated state. The branches don't actually diverge — they all explore the same path.

**Mental rule:** the apply must happen *as many times as the for-loop iterates*. If your apply runs once per function call but multiple recursive calls happen inside, the branches aren't branching.

```
At state S, the choices are A, B, C.
We want three independent recursive subtrees:
  - dfs explores S + A
  - dfs explores S + B
  - dfs explores S + C

Inside the loop:
  apply A → state = S+A → recurse → undo A → state = S
  apply B → state = S+B → recurse → undo B → state = S
  apply C → state = S+C → recurse → undo C → state = S

Each iteration starts from the same S, applies one choice, recurses, then restores.
```

---

### Always Copy When Recording

```typescript
if (isComplete(state)) {
  res.push([...path]);   // ✓ copy
  return;
}
```

The `path` array gets mutated by subsequent backtracking steps. If you push the reference directly (`res.push(path)`), every entry in `res` ends up pointing to the same array — which gets popped down to empty by the end. Always **spread or slice** to take a snapshot.

---

### Problem Family Map

Different backtracking problems share the template but vary in **what counts as a choice** and **how the state grows**.

| Problem | Type | Choice at each step | Key mechanic | Note |
|---------|------|---------------------|--------------|------|
| [Subsets](subset.md) | Power set | Include or exclude current element | Binary decision tree of depth n | Order doesn't matter; every state is a valid result |
| [Permutations](permutations-unique.md) | Ordering | Pick any unused element next | `used[]` boolean array to mark in-progress picks | Order matters; only complete-length states are results |
| [Combination Sum](pruning-combination-sum.md) | Combinations with reuse | Pick any candidate `>= start` index | Pass `start` to prevent reordering; reuse same index | Unbounded — same number can repeat |
| [Generate Parentheses](generate-parentheses-backtracking.md) | Constrained sequence | Append `(` or `)` | Track open/close counts; constraint prunes branches early | Pruning is the whole game |
| [Word Search](word-search-grid-backtracking.md) | Grid path | Move to one of 4 neighbors | Mark cells visited during recursion, unmark on undo | Grid is the state — mutate the grid itself |
| [Palindrome Partitioning](palindrome-partitioning.md) | String split | Cut after any position forming a palindrome prefix | Try every possible split point from current position | Combines string slicing with backtracking |
| [Path Sum II](path-sum-ii.md) | Tree paths | Move to left or right child | Tree DFS with path tracking | Tree structure dictates choices |
| [Max Compatibility Score Sum](backtracking-maximum-compatibility-score-sum.md) | Assignment / matching | Pick any unused mentor for current student | Two sequences: one sequential (depth), one searched (`used[]`); accumulate score | Output is a scalar (max), not a collection |

---

### Picking the Right Variant

**"Do I include this element or not?"** → **Subsets pattern (binary choice)**

```typescript
// At each index, two choices: include or skip
function dfs(i: number, path: number[]) {
  if (i === nums.length) { res.push([...path]); return; }
  // Skip
  dfs(i + 1, path);
  // Include
  path.push(nums[i]);
  dfs(i + 1, path);
  path.pop();
}
```

Use when: every state is potentially valid (subsets, target sum count, etc.).

---

**"In what order can I arrange these?"** → **Permutations pattern (used-array)**

```typescript
function dfs(path: number[]) {
  if (path.length === n) { res.push([...path]); return; }
  for (let i = 0; i < n; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push(nums[i]);
    dfs(path);
    path.pop();
    used[i] = false;
  }
}
```

Use when: order matters, and you can't pick the same element twice.

---

**"Which subset sums to / matches a target?"** → **Combinations pattern (start index)**

```typescript
function dfs(start: number, path: number[], remaining: number) {
  if (remaining === 0) { res.push([...path]); return; }
  if (remaining < 0) return;       // prune
  for (let i = start; i < candidates.length; i++) {
    path.push(candidates[i]);
    dfs(i, path, remaining - candidates[i]);   // i (not i+1) for unbounded
    path.pop();
  }
}
```

Use when: order doesn't matter, want to enumerate combinations. Pass `start` to prevent duplicate orderings like `[2,3]` vs `[3,2]`. Use `i` to allow reuse, `i + 1` for distinct picks.

---

**"Build a sequence under a constraint"** → **Constraint-driven pattern (early pruning)**

```typescript
function dfs(state: State) {
  if (isComplete(state)) { res.push(format(state)); return; }
  for (const choice of validChoices(state)) {   // prune at the source
    apply(choice, state);
    dfs(state);
    undo(choice, state);
  }
}
```

Use when: the structure of valid solutions can be enforced incrementally (Generate Parentheses, N-Queens, Sudoku). Pruning is critical here — the whole point is that you stop exploring as soon as a partial state can't lead to a valid solution.

---

**"Explore connected positions in a grid/tree"** → **Spatial pattern (mark/unmark visited)**

```typescript
function dfs(r: number, c: number, ...): boolean {
  if (outOfBounds || visited || invalid) return false;
  if (goalReached) return true;

  mark(r, c);
  const found = dfs(r+1, c, ...) || dfs(r-1, c, ...) || ...;
  unmark(r, c);
  return found;
}
```

Use when: the state IS the grid/tree, and you explore by movement. Mark visited during recursion to avoid revisiting, unmark when backtracking out (otherwise the same cell can't be reused in a *different* path).

---

**"Match X to Y one-to-one, maximize/minimize a sum"** → **Assignment pattern (two sequences + running accumulator)**

```typescript
function dfs(i: number, currentScore: number) {
  if (i === m) { best = Math.max(best, currentScore); return; }
  for (let j = 0; j < m; j++) {
    if (used[j]) continue;
    used[j] = true;
    dfs(i + 1, currentScore + score[i][j]);
    used[j] = false;
  }
}
```

Use when: two parallel inputs need to be paired one-to-one, and the goal is a single optimum rather than a list of pairings. Key features that distinguish this from regular Permutations:
- **Two inputs** instead of one — one side iterates by recursion depth (no state), the other is searched (`used[]`).
- **Scalar output** (max/min) instead of a collection — leaf updates `best` instead of pushing a path.
- **Score accumulates** along the path via a parameter — the path itself isn't the answer.

Three-question diagnostic: *one input or two? enumerate or optimize? per-step score contribution?* "Two / optimize / yes" is the fingerprint of an assignment problem. Brute backtracking works for small `m` (~≤ 10); larger `m` needs bitmask DP on the set of used items.

---

### Common Pitfalls

1. **Forgetting to copy on record** — `res.push(path)` instead of `res.push([...path])` → all results end up pointing to the same (mutated, eventually empty) array.

2. **Make/undo outside the for-loop** — every sibling branch sees the same applied state, so branches don't actually diverge.

3. **Forgetting to undo** — state leaks into the next sibling iteration; results get polluted with stale choices.

4. **No pruning when it's the whole point** — for constraint problems (Generate Parentheses, N-Queens), forgetting to skip clearly-invalid branches makes brute force timeout.

5. **Wrong duplicate handling** — for "unique permutations" or "unique combinations" with input duplicates, you need to sort the input first AND skip duplicates at the choice level (`if (i > start && nums[i] === nums[i-1]) continue;`).

---

### See Also

- [Subset](subset.md) — power set, include/exclude binary tree
- [Permutations Unique](permutations-unique.md) — used-array with duplicate skipping
- [Pruning - Combination Sum](pruning-combination-sum.md) — start-index pattern, unbounded
- [Generate Parentheses](generate-parentheses-backtracking.md) — constraint-driven pruning
- [Word Search](word-search-grid-backtracking.md) — grid backtracking
- [Palindrome Partitioning](palindrome-partitioning.md) — string-cut backtracking
- [Path Sum II](path-sum-ii.md) — tree-path backtracking
- [Max Compatibility Score Sum](backtracking-maximum-compatibility-score-sum.md) — assignment-style backtracking (two sequences, optimize a scalar)
