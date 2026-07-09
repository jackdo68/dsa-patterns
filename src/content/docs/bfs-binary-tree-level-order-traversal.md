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

```csharp
public IList<IList<int>> LevelOrder(TreeNode? root) {
    var res = new List<IList<int>>();
    if (root is null) return res;
    var processingQueue = new List<TreeNode> { root };
    var levelQueue = new List<TreeNode>();
    while (processingQueue.Count > 0) {
        var vals = new List<int>();
        foreach (var node in processingQueue) {
            vals.Add(node.val);
            if (node.left is not null) levelQueue.Add(node.left);
            if (node.right is not null) levelQueue.Add(node.right);
        }
        res.Add(vals);
        processingQueue = levelQueue;
        levelQueue = new List<TreeNode>();
    }
    return res;
}
```
