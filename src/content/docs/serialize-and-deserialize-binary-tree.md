---
title: "Serialize and Deserialize Binary Tree"
topic: "dfs, tree"
difficulty: "Hard"
frequency: "Medium"
---
### Question

[LeetCode 297 - Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

*Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.*

### Solution

```csharp
// Encodes a tree to a single string.
public string Serialize(TreeNode? root) {
    if (root is null) return "x";
    return $"{root.val} {Serialize(root.left)} {Serialize(root.right)}";
}

// Decodes your encoded data to tree.
public TreeNode? Deserialize(string data) {
    string[] tokens = data.Split(' ');
    int index = 0;

    // consume tokens in preorder
    TreeNode? Helper() {
        if (index >= tokens.Length || tokens[index] == "x") {
            index++;
            return null;
        }
        int val = int.Parse(tokens[index]);
        index++;
        var node = new TreeNode(val);
        node.left = Helper();
        node.right = Helper();
        return node;
    }
    return Helper();
}
```