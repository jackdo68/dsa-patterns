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

```csharp
public IList<int> RightSideView(TreeNode? root) {
    if (root is null) return new List<int>();

    var result = new List<int>();
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        int levelSize = queue.Count;

        for (int i = 0; i < levelSize; i++) {
            var node = queue.Dequeue();

            // Last node in current level
            if (i == levelSize - 1) {
                result.Add(node.val);
            }

            if (node.left is not null) queue.Enqueue(node.left);
            if (node.right is not null) queue.Enqueue(node.right);
        }
    }

    return result;
}
```
