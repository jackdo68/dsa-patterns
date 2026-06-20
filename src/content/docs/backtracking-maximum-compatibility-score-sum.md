---
title: "Backtracking - Maximum Compatibility Score Sum"
topic: "backtracking, assignment problem"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 1947 - Maximum Compatibility Score Sum](https://leetcode.com/problems/maximum-compatibility-score-sum/)

*There is a survey of `n` questions where each answer is either `0` or `1`. The survey was given to `m` students and `m` mentors. Each student is assigned to **one** mentor, and each mentor gets **one** student. The compatibility score of a student-mentor pair is the number of matching answers. Return the maximum total compatibility score across all pairings.*

```typescript
Input: students = [[1,1,0],[1,0,1],[0,0,1]], mentors = [[1,0,0],[0,0,1],[1,1,0]]
Output: 8
// student 0 → mentor 2 (score 3)
// student 1 → mentor 0 (score 2)
// student 2 → mentor 1 (score 3)
```

### Ideas

**Recognize the problem type.** Strip away the survey framing: "match `m` students to `m` mentors one-to-one to maximize total score" is the **Assignment Problem**. Whenever you see *"pair X to Y, one-to-one, maximize/minimize the sum,"* think assignment. The general rule: small `m` (typically `m ≤ 8`) means brute force backtracking is expected — Hungarian algorithm is overkill.

**Decouple score computation from matching.** Precompute an `m × m` score matrix once, where `score[i][j]` = compatibility between student `i` and mentor `j`. Then the backtracking only deals with the matrix — no survey logic mixed in. This separation makes the search code clean and avoids recomputing the same score across different permutations.

**The sequential-vs-searched asymmetry.** The DFS handles each side of the matching differently:

| Side | How it's traversed | State needed |
| :--- | :--- | :--- |
| Students | Sequentially by recursion depth (always +1) | None — implicit |
| Mentors | Searched at each level (try every unused one) | `used[]` boolean array |

Students don't need a `used` array because each recursion level handles exactly one student in order: depth 0 → student 0, depth 1 → student 1, etc. The mentors require explicit tracking because the *choice* is what's being searched. This asymmetry is the design key for all backtracking problems — ask: *"what advances at each level (sequential, no state) vs. what gets chosen from a pool (searched, needs state)?"*

**Why we're not "missing" mentor choices for later students.** A common worry: student 0 sees `m` mentors, but student 1 only sees `m - 1` in any given branch — aren't we losing options? No. The constraint says each mentor is assigned exactly once, so within a branch the pool legitimately shrinks. Across **all** top-level branches, every mentor still appears for student 1 — just paired with a different student-0 choice. Total paths = `m × (m-1) × ... × 1 = m!`, the exact count of valid permutations.

**The reusable backtracking template.** *Choose → Explore → Un-choose:*

```
function dfs(state):
  if base case: record answer; return
  for each choice:
    if invalid: continue
    apply(choice)
    dfs(next state)
    undo(choice)
```

This same shape solves Permutations, N-Queens, Sudoku, Combination Sum. Memorize the skeleton; swap out the "is choice valid" check and the "record answer" step.

**Diagram of the search tree for m = 3:**

```
                       dfs(0)              ← 3 choices for student 0
                  /       |       \
              j=0       j=1       j=2
                |         |         |
              dfs(1)    dfs(1)    dfs(1)   ← 2 choices each for student 1
              /  \       /  \       /  \
            j=1  j=2   j=0  j=2   j=0  j=1
              |    |     |    |     |    |
            dfs(2)dfs(2)dfs(2)dfs(2)dfs(2)dfs(2) ← 1 choice for student 2
              |    |     |    |     |    |
           leaf  leaf  leaf  leaf  leaf  leaf    ← 6 = 3! permutations
```

Each leaf is one complete assignment. The branching factor shrinks (`3 × 2 × 1`) because each ancestor consumes one mentor from the pool. This shape directly gives the complexity.

**Time: O(m! × m)** — `m!` permutations, O(m) work per leaf (sum + max). For `m = 8`, that's ~322K ops, trivially fast.

**Space: O(m² + m)** — score matrix + `used` array + recursion depth.

### How This Differs from Other Permutation Problems

The mechanics look identical to [Permutations Unique](/dsa-patterns/permutations-unique/) — same `used[]` array, same Choose/Explore/Un-choose loop — but three things are genuinely different. Spotting them is the trick to recognizing the assignment-problem family.

**1. Two parallel inputs instead of one.**

Most backtracking problems in this wiki operate on a single input set: [Subset](/dsa-patterns/subset/), [Permutations Unique](/dsa-patterns/permutations-unique/), [Combination Sum](/dsa-patterns/pruning-combination-sum/), [Generate Parentheses](/dsa-patterns/generate-parentheses-backtracking/), [Word Search](/dsa-patterns/word-search-grid-backtracking/), [Palindrome Partitioning](/dsa-patterns/palindrome-partitioning/). Each builds an answer from one source.

This problem has **two**: `students` and `mentors` that must be paired. That forces the **sequential-vs-searched asymmetry** described above — one side advances by recursion depth, the other is searched via `used[]`. This asymmetry doesn't exist in single-sequence permutations because there's only one side to walk.

**2. The output is a scalar, not a collection.**

| Problem | Return value |
| :--- | :--- |
| Subset | `number[][]` (all subsets) |
| Permutations Unique | `number[][]` (all permutations) |
| Combination Sum | `number[][]` (all combinations) |
| Generate Parentheses | `string[]` (all strings) |
| **Max Compatibility** | **`number` (single max score)** |

Other problems **enumerate** valid configurations and collect them. This one **optimizes** — every leaf gets scored, and only the best is kept. The DFS isn't producing the answer, it's *evaluating candidates*.

**3. Score accumulates along the path.**

In Permutations Unique, each step adds an element to `path`. The path *is* the answer. In Max Compatibility, each step adds a per-pair score from the precomputed matrix to a running total. The path is only the *vehicle* for computing a score that's then compared against `maxScore`:

```
leaf_score = score[0][π(0)] + score[1][π(1)] + ... + score[m-1][π(m-1)]
```

That's why the signature is `dfs(studentIdx, currentScore)` instead of `dfs(path)`. The running accumulator replaces the path as the load-bearing parameter.

**Side-by-side with Permutations Unique:**

| Aspect | Permutations Unique | Max Compatibility |
| :--- | :--- | :--- |
| Input | One array `nums` | Two arrays `students`, `mentors` |
| What we enumerate | All distinct orderings of `nums` | All bijections from students to mentors |
| Bookkeeping | freq map (count of each number left) | `used[]` (which mentors taken) |
| At leaf | `res.push([...path])` | `maxScore = max(maxScore, currentScore)` |
| Return | `number[][]` (all permutations) | `number` (single best score) |

The shape is identical — what changes is **why** you reach the leaf and **what** you do when you get there.

**The diagnostic for recognizing this family.** Whenever you see a backtracking-looking problem, ask:

1. **One input or two?** → Two means matching/assignment angle.
2. **Enumerate or optimize?** → Optimize means running accumulator + single scalar answer.
3. **Per-step contribution?** → If each step adds to a score, carry it through the recursion.

For Max Compatibility: **two, optimize, yes**. That triple is the fingerprint of "assignment-style backtracking" and distinguishes it from every other backtracking problem in this wiki.

**Where this problem sits in the bigger picture.** Max Compatibility is a **permutation problem scored to become an optimization problem**. The DFS enumerates configurations like permutations, but the goal is a single number like DP. For larger `m` (say, `m > 12`), brute backtracking blows up and the canonical solution is **bitmask DP** — same problem, memoized on the set of used mentors. So this problem is the small-`m` bridge between the [Backtracking Wiki](/dsa-patterns/backtracking-wiki/) and the [Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/).

### Solution

```typescript
function maxCompatibilitySum(students: number[][], mentors: number[][]): number {
  const m = students.length;
  const n = students[0].length;

  // 1. Precompute the m × m score matrix
  const score: number[][] = Array.from({ length: m }, () => new Array(m).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      let count = 0;
      for (let k = 0; k < n; k++) {
        if (students[i][k] === mentors[j][k]) count++;
      }
      score[i][j] = count;
    }
  }

  // 2. Backtracking over mentor assignments
  let maxScore = 0;
  const used = new Array(m).fill(false);

  function dfs(studentIdx: number, currentScore: number): void {
    if (studentIdx === m) {
      maxScore = Math.max(maxScore, currentScore);
      return;
    }
    for (let j = 0; j < m; j++) {
      if (used[j]) continue;
      used[j] = true;
      dfs(studentIdx + 1, currentScore + score[studentIdx][j]);
      used[j] = false;
    }
  }

  dfs(0, 0);
  return maxScore;
}
```
