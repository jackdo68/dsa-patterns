---
title: "Diameter of Binary Tree"
topic: "tree, dfs"
difficulty: "Easy"
frequency: "Medium"
---
### Question

[LeetCode 543 - Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

*Given the `root` of a binary tree, return the length of the **diameter** of the tree.*

*The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.*

*The length of a path between two nodes is represented by the number of edges between them.*
### Ideas

The diameter through any node equals `leftHeight + rightHeight`. The answer is the maximum diameter across all nodes.

Use a postorder DFS that returns the height of each subtree. At each node, compute the diameter passing through it (sum of left and right heights) and update a global maximum. Return `1 + max(leftHeight, rightHeight)` as the height for the parent to use.

The key insight is that height computation naturally visits every node, so we piggyback the diameter calculation on top of it — no extra traversal needed.

### Solution

```csharp
public int DiameterOfBinaryTree(TreeNode? root) {
    int maxDiameter = 0;

    int Height(TreeNode? node) {
        if (node is null) return 0;

        int left = Height(node.left);
        int right = Height(node.right);

        // Diameter through this node
        maxDiameter = Math.Max(maxDiameter, left + right);

        return 1 + Math.Max(left, right);
    }

    Height(root);
    return maxDiameter;
}
```
