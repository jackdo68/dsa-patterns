---
title: "Set Matrix Zeroes"
topic: "matrix"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 73 - Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

*Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.*

*You must do it [in place](https://en.wikipedia.org/wiki/In-place_algorithm).*
### Ideas

The challenge: we can't zero cells immediately because we'd lose track of which zeros were original vs newly created.

**Approach:**
Use two arrays to mark which rows and columns need to be zeroed:
1. First pass: scan matrix, mark `rows[i] = true` and `cols[j] = true` for each zero
2. Second pass: zero any cell where its row or column is marked

**Time Complexity:** O(m × n)
**Space Complexity:** O(m + n)

### Solution

```csharp
public void SetZeroes(int[][] matrix) {
    int m = matrix.Length;
    int n = matrix[0].Length;

    bool[] rows = new bool[m];
    bool[] cols = new bool[n];

    // First pass: mark which rows and columns have zeros
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                rows[i] = true;
                cols[j] = true;
            }
        }
    }

    // Second pass: zero cells based on markers
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (rows[i] || cols[j]) {
                matrix[i][j] = 0;
            }
        }
    }
}
```