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

```typescript
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // move right
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    // move down
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    // move left
    // after increment top, we need to check again if we're still inbound
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }

    // move up
    // after decrement right, check if we still inbound
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }
  return result;
}
```