---
title: "Spiral Traversal"
topic: "array, matrix"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 54 - Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

*Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.*
### Solution

```csharp
public IList<int> SpiralOrder(int[][] matrix) {
    var result = new List<int>();
    int top = 0;
    int bottom = matrix.Length - 1;
    int left = 0;
    int right = matrix[0].Length - 1;

    while (top <= bottom && left <= right) {
        // move right
        for (int i = left; i <= right; i++) result.Add(matrix[top][i]);
        top++;
        // move down
        for (int i = top; i <= bottom; i++) result.Add(matrix[i][right]);
        right--;
        // move left (after incrementing top, re-check we're still in bounds)
        if (top <= bottom) {
            for (int i = right; i >= left; i--) result.Add(matrix[bottom][i]);
            bottom--;
        }
        // move up (after decrementing right, re-check we're still in bounds)
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.Add(matrix[i][left]);
            left++;
        }
    }
    return result;
}
```