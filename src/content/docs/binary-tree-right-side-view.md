---
title: "Binary Tree Right Side View"
topic: "tree, bfs"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 199 - Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

*Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.*
### Ideas

Use BFS (level-order traversal). For each level, the last node in the queue is the rightmost node visible from that side. Process each level completely and take the last element.

Alternatively, use DFS with a modified preorder (root → right → left). Track the current depth — if `depth === result.length`, this is the first node seen at this depth from the right, so add it. This uses O(h) space instead of O(w) for BFS.

### Solution

```typescript
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      // Last node in current level
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
```
