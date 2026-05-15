# Construct Binary Tree from Preorder and Inorder Traversal

Topic: tree, recursion, divide and conquer

Difficulty: Medium

Interview Frequency: Medium

Tags: tree, recursion, hash-map, divide-conquer, medium

### Question

[LeetCode 105 - Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

        3
       / \
      9  20
        /  \
       15   7
```

**Example 2:**
```
Input: preorder = [1], inorder = [1]
Output: [1]
```

### Ideas

**Key insights:**
1. **Preorder** first element is always the **root**
2. **Inorder** elements left of root are **left subtree**, right are **right subtree**

**Algorithm:**
1. Take first element from preorder as root
2. Find root's position in inorder
3. Everything before that position → left subtree
4. Everything after that position → right subtree
5. Recursively build left and right subtrees

**Optimization:** Use a hash map to find root's position in O(1) instead of O(n).

### Implementation

**Approach 1: With HashMap (Optimal)**

```tsx
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    // Map value to index in inorder for O(1) lookup
    const inorderMap = new Map<number, number>();
    inorder.forEach((val, idx) => inorderMap.set(val, idx));

    let preorderIndex = 0;

    function build(inLeft: number, inRight: number): TreeNode | null {
        if (inLeft > inRight) return null;

        // Root is current preorder element
        const rootVal = preorder[preorderIndex++];
        const root = new TreeNode(rootVal);

        // Find root position in inorder
        const inorderIndex = inorderMap.get(rootVal)!;

        // Build left subtree first (preorder: root -> left -> right)
        root.left = build(inLeft, inorderIndex - 1);
        root.right = build(inorderIndex + 1, inRight);

        return root;
    }

    return build(0, inorder.length - 1);
}
```

**Approach 2: Without HashMap (Clearer logic)**

```tsx
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    function build(
        preStart: number, preEnd: number,
        inStart: number, inEnd: number
    ): TreeNode | null {
        if (preStart > preEnd) return null;

        const rootVal = preorder[preStart];
        const root = new TreeNode(rootVal);

        // Find root in inorder
        let rootIndex = inStart;
        while (inorder[rootIndex] !== rootVal) rootIndex++;

        const leftSize = rootIndex - inStart;

        // Preorder: [root, ...left..., ...right...]
        // Inorder:  [...left..., root, ...right...]
        root.left = build(
            preStart + 1, preStart + leftSize,
            inStart, rootIndex - 1
        );
        root.right = build(
            preStart + leftSize + 1, preEnd,
            rootIndex + 1, inEnd
        );

        return root;
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1);
}
```

**Time Complexity:** O(n)

**Space Complexity:** O(n) for hash map + O(h) for recursion stack

### Visualization

```
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]

Step 1: root = 3 (first of preorder)
        Find 3 in inorder: index 1
        Left subtree: inorder[0:0] = [9]
        Right subtree: inorder[2:4] = [15, 20, 7]

Step 2: Build left with preorder[1:1], inorder[0:0]
        root = 9, no children

Step 3: Build right with preorder[2:4], inorder[2:4]
        root = 20
        Find 20 in inorder: index 3
        Left: [15], Right: [7]

Result:
        3
       / \
      9  20
        /  \
       15   7
```

### Variant: Construct from Inorder and Postorder

**Key difference:** Postorder's **last** element is root, and we build **right subtree first**.

```tsx
function buildTreeFromPostorder(inorder: number[], postorder: number[]): TreeNode | null {
    const inorderMap = new Map<number, number>();
    inorder.forEach((val, idx) => inorderMap.set(val, idx));

    let postorderIndex = postorder.length - 1;

    function build(inLeft: number, inRight: number): TreeNode | null {
        if (inLeft > inRight) return null;

        const rootVal = postorder[postorderIndex--];
        const root = new TreeNode(rootVal);

        const inorderIndex = inorderMap.get(rootVal)!;

        // Build RIGHT subtree first (postorder: left -> right -> root)
        root.right = build(inorderIndex + 1, inRight);
        root.left = build(inLeft, inorderIndex - 1);

        return root;
    }

    return build(0, inorder.length - 1);
}
```

### Traversal Order Summary

| Traversal | Order | First Element | Last Element |
|-----------|-------|---------------|--------------|
| Preorder | Root → Left → Right | Root | Rightmost leaf |
| Inorder | Left → Root → Right | Leftmost | Rightmost |
| Postorder | Left → Right → Root | Leftmost leaf | Root |

### Related Problems

- **Construct from Preorder & Inorder (105)** - This problem
- **Construct from Inorder & Postorder (106)** - Build right first
- **Construct BST from Preorder (1008)** - Use bounds, no inorder needed
- **Serialize/Deserialize Tree (297)** - Level order or preorder with nulls
