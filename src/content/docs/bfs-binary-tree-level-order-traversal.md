---
title: "BFS - Binary Tree Level Order Traversal"
topic: "bfs, tree"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 102 - Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

_Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level)._

### Solution

```typescript
function levelOrder(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  if (root === null) return res;
  let processingQueue: TreeNode[] = [root];
  let levelQueue = [];
  while (processingQueue.length) {
    const vals: number[] = [];
    for (const node of processingQueue) {
      vals.push(node.val);
      if (node.left) levelQueue.push(node.left);
      if (node.right) levelQueue.push(node.right);
    }
    res.push(vals);
    processingQueue = levelQueue;
    levelQueue = [];
  }
  return res;
}
```
