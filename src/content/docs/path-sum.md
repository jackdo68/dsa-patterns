---
title: "Path Sum"
topic: "tree, dfs"
difficulty: "Easy"
frequency: "Medium"
---
### Question

[LeetCode 112 - Path Sum](https://leetcode.com/problems/path-sum/)

*Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.*

*A **leaf** is a node with no children.*
### Ideas

Use DFS, subtracting the current node's value from `targetSum` as you go. At each leaf node, check if the remaining sum equals 0. This avoids needing to track the accumulated sum — instead you track what's "left to find."

Base cases:
- Null node → return false
- Leaf node → return `targetSum - node.val === 0`

Recurse on left and right children with the reduced target. Return true if either subtree finds a valid path.

### Solution

```typescript
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  // Leaf node check
  if (!root.left && !root.right) {
    return targetSum - root.val === 0;
  }

  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```
