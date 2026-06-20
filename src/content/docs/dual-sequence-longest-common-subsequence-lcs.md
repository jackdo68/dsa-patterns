---
title: "Dual Sequence - Longest Common Subsequence (LCS)"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "Medium"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 1143 - Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

*Given two strings `text1` and `text2`, return the length of their longest **common subsequence**. If there is no **common subsequence**, return `0`. A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. For example, `"ace"` is a subsequence of `"abcde"`.  A **common subsequence** of two strings is a subsequence that is common to both strings.*

### Ideas

**1. Recognize the pattern:**
- Two sequences, looking for longest common subsequence — this is dual-sequence DP
- We need a 2D table where `dp[i][j]` = LCS length from `text1[i:]` and `text2[j:]`

**2. Derive the recurrence:**
- At each position `(i, j)`, compare `text1[i]` and `text2[j]`:
  - **Match:** this character is part of the LCS → `dp[i][j] = 1 + dp[i+1][j+1]` (take it and advance both)
  - **No match:** we have two choices — skip `text1[i]` or skip `text2[j]` → `dp[i][j] = max(dp[i][j+1], dp[i+1][j])`

**3. Why bottom-right to top-left?**
- Each cell depends on cells to its right (`j+1`) and below (`i+1`)
- So we fill from bottom-right to top-left, and the answer is at `dp[0][0]`
- The extra row/column (size `n+1` x `m+1`) provides the base case: empty string has LCS of 0

**Walkthrough: `text1 = "ace"`, `text2 = "abce"`**

Start with a grid of zeros (extra row/column = base case):

```
        a   b   c   e   ""
  a  [  .   .   .   .   0 ]
  c  [  .   .   .   .   0 ]
  e  [  .   .   .   .   0 ]
  "" [  0   0   0   0   0 ]
```

Fill bottom-right to top-left:

```
i=2, j=3: text1[2]='e' === text2[3]='e' → match! dp[2][3] = 1 + dp[3][4] = 1
i=2, j=2: 'e' vs 'c' → no match → max(dp[2][3], dp[3][2]) = max(1, 0) = 1
i=2, j=1: 'e' vs 'b' → no match → max(dp[2][2], dp[3][1]) = max(1, 0) = 1
i=2, j=0: 'e' vs 'a' → no match → max(dp[2][1], dp[3][0]) = max(1, 0) = 1

        a   b   c   e   ""
  a  [  .   .   .   .   0 ]
  c  [  .   .   .   .   0 ]
  e  [  1   1   1   1   0 ]
  "" [  0   0   0   0   0 ]

i=1, j=3: 'c' vs 'e' → no match → max(dp[1][4], dp[2][3]) = max(0, 1) = 1
i=1, j=2: 'c' === 'c' → match! dp[1][2] = 1 + dp[2][3] = 2
i=1, j=1: 'c' vs 'b' → no match → max(dp[1][2], dp[2][1]) = max(2, 1) = 2
i=1, j=0: 'c' vs 'a' → no match → max(dp[1][1], dp[2][0]) = max(2, 1) = 2

        a   b   c   e   ""
  a  [  .   .   .   .   0 ]
  c  [  2   2   2   1   0 ]
  e  [  1   1   1   1   0 ]
  "" [  0   0   0   0   0 ]

i=0, j=3: 'a' vs 'e' → no match → max(dp[0][4], dp[1][3]) = max(0, 1) = 1
i=0, j=2: 'a' vs 'c' → no match → max(dp[0][3], dp[1][2]) = max(1, 2) = 2
i=0, j=1: 'a' vs 'b' → no match → max(dp[0][2], dp[1][1]) = max(2, 2) = 2
i=0, j=0: 'a' === 'a' → match! dp[0][0] = 1 + dp[1][1] = 3

        a   b   c   e   ""
  a  [  3   2   2   1   0 ]
  c  [  2   2   2   1   0 ]
  e  [  1   1   1   1   0 ]
  "" [  0   0   0   0   0 ]

dp[0][0] = 3 → LCS is "ace"
```

Notice how matches create a diagonal step (`dp[i+1][j+1]`), while non-matches take the best from right or below

**Time: O(m * n), Space: O(m * n)**

### Solution

```typescript
  function longestCommonSubsequence(text1: string, text2: string): number {
    // We need a 2-d grid to solve this problem using DP
    const n = text1.length;
    const m = text2.length;
    // we go out of bound by 1 because we need to get the value of the next grid
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        if (text1[i] === text2[j]) {
          // if 2 characters matched, the value of the grid equas the value longest common subsequence of postfix plus 1
          dp[i][j] = 1 + dp[i + 1][j + 1]; // out of bound value is required here
        } else {
          // No matched, we have 2 options, get the max value of both
          dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
      }
    }
    return dp[0][0];
  }
```