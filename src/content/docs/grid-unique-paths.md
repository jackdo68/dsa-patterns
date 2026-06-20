---
title: "Grid - Unique Paths"
topic: "dynamic programming, grid"
difficulty: "Medium"
frequency: "Medium"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 62 - Unique Paths](https://leetcode.com/problems/unique-paths/)

*There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.*

### Ideas

- The key is that the robot can move to the right or down only. This translates to "the robot could only reach a cell from the top or left". Hence, the number of paths to reach a cell = number of paths to reach the cell to the left + number of paths to reach the cell at the top.
- Let `dp[r][c]` represent the number of unique paths to reach cell `(r, c)`. (r stands for row, and c stands for column. I found it more intuitive than i, j)
- Time Complexity: `O(n*m)`

### Solution

```typescript
function uniquePaths(m: number, n: number): number {
  const dp: number[][] = Array.from({ length: m }, () => Array.from({ length: n }, () => 1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}
```