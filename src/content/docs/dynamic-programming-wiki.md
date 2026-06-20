---
title: "Dynamic Programming Wiki"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "High"
---
### Recursion vs Bottom-up

Both approaches compute the same thing using the same recurrence — they just traverse the dependency graph differently.

**Brute force DFS → Top-down (memo) → Bottom-up (tabulation)**

| | Direction | How it works |
|---|---|---|
| **Brute force** | Start → Base case | Recursively explores all paths, recomputes overlapping subproblems. O(2^n) |
| **Top-down** | Start → Base case | Same recursion, but caches results in a map. Discovers what it needs lazily |
| **Bottom-up** | Base case → Start | Fills a table iteratively. Pre-computes everything in the right order |

**Key insight:** Recursion starts from the "question" and works toward the base case. Bottom-up starts from the base case and builds up to the answer. The recurrence is identical — just the traversal direction differs.

Example with LCS of `"ace"` and `"abce"`:
- **Recursive:** starts at `(0, 0)`, asks "what's the LCS?", recurses deeper, computes answer on the way back as recursion unwinds
- **Bottom-up:** starts at the end of both strings (base case = 0), fills the grid backward, so `dp[0][0]` is computed last with all dependencies ready

### How to Identify the DP Family

```
Is it DP?
├── Overlapping subproblems + optimal substructure → Yes
│
What type?
├── Include/exclude items with a capacity → Knapsack
│   ├── Each item once → 0/1 Knapsack (backward iteration)
│   └── Unlimited items → Unbounded Knapsack (forward iteration)
├── Two sequences, comparing elements → Dual Sequence (LCS)
├── Single sequence, looking for subsequence → LIS
├── Grid traversal, counting paths → Grid DP
└── Subarray/substring range [i, j] → Interval DP
```

### 0/1 Knapsack

**When:** Each item is either included or excluded. "Can we make sum X?", "Count ways to reach target."

**Thinking process:**
1. Reduce the problem to a subset sum question
2. `dp[i]` = whether sum `i` is achievable (or count of ways to reach sum `i`)
3. For each item, ask: "can I make sum `i` without this item, or by adding it to `i - num`?"
4. Recurrence: `dp[i] = dp[i] || dp[i - num]`
5. Iterate **backward** — prevents using the same item twice

**Why backward?** Forward iteration updates `dp[j]`, then that value gets read again at `dp[j + num]`, effectively reusing the same item. Backward ensures `dp[i - num]` reflects the state before the current item.

**Problems:** [Target Sum](/dsa-patterns/0-1-knapsack-target-sum-top-down-approach/) | [Partition Equal Subset Sum](/dsa-patterns/0-1-knapsack-partition-equal-subset-sum-bottom/)

### Unbounded Knapsack

**When:** Unlimited supply of each item. "Fewest coins to make amount", "Number of combinations."

**Thinking process:**
1. `dp[i]` = optimal answer for amount `i`
2. For each amount, try every item: `dp[i] = min(dp[i], dp[i - item] + 1)`
3. Iterate **forward** — reusing items is exactly what we want

**The only difference from 0/1 is the iteration direction.** Forward = unlimited reuse, backward = use at most once.

**Problems:** [Coin Change](/dsa-patterns/unbounded-knapsack-coin-change/) | [Word Break](/dsa-patterns/word-break/)

### Dual Sequence (LCS)

**When:** Two sequences, comparing elements. "Longest common subsequence", "Edit distance."

**Thinking process:**
1. 2D table where `dp[i][j]` = answer for `text1[i:]` and `text2[j:]`
2. At each `(i, j)`, compare characters:
   - **Match:** take it → `dp[i][j] = 1 + dp[i+1][j+1]`
   - **No match:** skip one → `dp[i][j] = max(dp[i+1][j], dp[i][j+1])`
3. Fill direction depends on dependencies — suffix approach fills bottom-right to top-left
4. Extra row/column (size `n+1` x `m+1`) provides the base case: empty string = 0

**Problems:** [Longest Common Subsequence](/dsa-patterns/dual-sequence-longest-common-subsequence-lcs/)

### Single Sequence (LIS)

**When:** Single sequence, looking for longest subsequence with a property.

**Thinking process:**
1. `dp[i]` = length of the longest increasing subsequence ending at index `i`
2. Base case: every element alone = subsequence of length 1
3. For each `i`, look back at all `j < i`: if `nums[i] > nums[j]` → `dp[i] = max(dp[i], dp[j] + 1)`
4. Answer is `max(dp)` — the LIS can end at any position
5. "Dynamic number of subproblems" — each state depends on a variable number of prior states

**O(n log n) optimization:** Maintain a `tails` array where `tails[i]` = smallest tail of increasing subsequence of length `i+1`. Use binary search to find insertion point.

**Problems:** [Longest Increasing Subsequence](/dsa-patterns/dynamic-number-of-subproblems-longest-increasing/)

### Grid DP

**When:** 2D grid, counting paths or finding min/max cost.

**Thinking process:**
1. `dp[i][j]` = answer for reaching cell `(i, j)`
2. Each cell depends on cells above and to the left: `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`
3. Fill top-left to bottom-right (dependencies are above and left, already computed)
4. First row and first column are base cases (only one direction to arrive from)

**Problems:** [Unique Paths](/dsa-patterns/grid-unique-paths/)

### Interval DP

**When:** Problem on a subarray or substring range `[i, j]`. "Burst balloons", "Matrix chain multiplication."

**Thinking process:**
1. `dp[i][j]` = optimal answer for the range `[i, j]`
2. Try every possible split point `k` in the range: `dp[i][j] = min/max over k of (dp[i][k] + dp[k+1][j] + cost)`
3. Iterate by **subproblem length** — solve small ranges first, build up to the full range
4. Three nested loops: length → start index → split point

**Problems:** [Burst Balloons](/dsa-patterns/interval-dp-busting-balloons/)

### Quick Reference

| Family | State | Recurrence | Direction | Time |
|---|---|---|---|---|
| 0/1 Knapsack | `dp[sum]` | `dp[i] \|\| dp[i - num]` | Backward | O(n * sum) |
| Unbounded Knapsack | `dp[amount]` | `dp[i] = min(dp[i], dp[i-c]+1)` | Forward | O(n * amount) |
| LCS | `dp[i][j]` | Match: `1 + dp[i+1][j+1]`, else: `max(right, below)` | Bottom-right → Top-left | O(m * n) |
| LIS | `dp[i]` | `max(dp[j]+1)` for valid `j < i` | Left → Right | O(n^2) or O(n log n) |
| Grid | `dp[i][j]` | `grid[i][j] + min(above, left)` | Top-left → Bottom-right | O(m * n) |
| Interval | `dp[i][j]` | `min over k: dp[i][k] + dp[k+1][j] + cost` | By length | O(n^3) |

See [Quick Reference](/dsa-patterns/quick-reference/) for code templates of each family.
