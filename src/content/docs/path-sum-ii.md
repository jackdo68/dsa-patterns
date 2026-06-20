---
title: "Path Sum II"
topic: "tree, dfs, backtracking"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 113 - Path Sum II](https://leetcode.com/problems/path-sum-ii/)

*Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf** paths where the sum of the node values in the path equals `targetSum`.*
### Ideas

Extend Path Sum with backtracking to collect all valid paths. Maintain a `currentPath` array as you DFS down the tree. When you reach a leaf with the correct sum, copy the path into the result.

The key is to **backtrack** (pop the last element) after exploring each node, so the path array correctly reflects the current DFS state as you return up the tree.

### Solution

```typescript
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = [];

  function dfs(node: TreeNode | null, remaining: number, path: number[]): void {
    if (!node) return;

    path.push(node.val);

    // Leaf node with correct sum
    if (!node.left && !node.right && remaining === node.val) {
      result.push([...path]);
    } else {
      dfs(node.left, remaining - node.val, path);
      dfs(node.right, remaining - node.val, path);
    }

    path.pop(); // backtrack
  }

  dfs(root, targetSum, []);
  return result;
}
```
