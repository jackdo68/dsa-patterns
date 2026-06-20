---
title: "Edit Distance"
topic: "dynamic-programming, dual-sequence, string, medium"
---
### Question

[LeetCode 72 - Edit Distance](https://leetcode.com/problems/edit-distance/)

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

**Example 1:**
```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

**Example 2:**
```
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

### Ideas

This is a classic **dual-sequence DP** problem.

**State:** `dp[i][j]` = minimum operations to convert `word1[0..i-1]` to `word2[0..j-1]`

**Transitions:** For each position, either characters match or we need an operation:

1. If `word1[i-1] === word2[j-1]`: Characters match, no operation needed
   - `dp[i][j] = dp[i-1][j-1]`

2. If characters don't match, take minimum of three operations:
   - **Replace:** `dp[i-1][j-1] + 1`
   - **Delete:** `dp[i-1][j] + 1` (delete from word1)
   - **Insert:** `dp[i][j-1] + 1` (insert into word1)

**Base cases:**
- `dp[i][0] = i` (delete all characters from word1)
- `dp[0][j] = j` (insert all characters of word2)

### Implementation

**Approach 1: 2D DP**

```tsx
function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    const dp: number[][] = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;  // Delete all
    for (let j = 0; j <= n; j++) dp[0][j] = j;  // Insert all

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j - 1],  // Replace
                    dp[i - 1][j],      // Delete
                    dp[i][j - 1]       // Insert
                );
            }
        }
    }

    return dp[m][n];
}
```

**Approach 2: Space-optimized O(n)**

```tsx
function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    let prev: number[] = Array.from({ length: n + 1 }, (_, j) => j);
    let curr: number[] = new Array(n + 1);

    for (let i = 1; i <= m; i++) {
        curr[0] = i;  // Base case: delete all

        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(
                    prev[j - 1],  // Replace
                    prev[j],      // Delete
                    curr[j - 1]   // Insert
                );
            }
        }

        [prev, curr] = [curr, prev];
    }

    return prev[n];
}
```

**Time Complexity:** O(m * n)

**Space Complexity:** O(n) for optimized version

### Visualization

For `word1 = "horse"`, `word2 = "ros"`:

```
    ""  r  o  s
""   0  1  2  3
h    1  1  2  3
o    2  2  1  2
r    3  2  2  2
s    4  3  3  2
e    5  4  4  3
```

Answer: `dp[5][3] = 3`

### Related Dual-Sequence DP Problems

| Problem | Transition | When chars match |
|---------|------------|------------------|
| Edit Distance | min(replace, delete, insert) + 1 | `dp[i-1][j-1]` |
| LCS | max(skip either) | `dp[i-1][j-1] + 1` |
| Longest Common Substring | 0 if no match | `dp[i-1][j-1] + 1` |
| Distinct Subsequences | `dp[i-1][j]` | `dp[i-1][j-1] + dp[i-1][j]` |

### Variant: Only Insert and Delete (No Replace)

If replace is not allowed, edit distance equals:
`m + n - 2 * LCS(word1, word2)`

```tsx
function minDistanceNoReplace(word1: string, word2: string): number {
    const lcs = longestCommonSubsequence(word1, word2);
    return word1.length + word2.length - 2 * lcs;
}
```
