# Tree Traversal Wiki

Topic: tree, dfs

Difficulty: Easy

Interview Frequency: High

### When to Use What?

Ask yourself: **"When do I have enough info to process this node?"**

| | Process when? | Memory trick |
|---|---|---|
| **Pre-order** | Immediately (don't need children's info) | "I'm the **boss**, I go first" |
| **In-order** | After left, before right | Only for **BST** (left < me < right = sorted) |
| **Post-order** | After both children done | "I **depend** on my children's answers" |

### Quick Rule

- Need to **pass info down** (parent → child)? → **Pre-order**
- Need to **collect info up** (children → parent)? → **Post-order**
- Need **sorted order** from BST? → **In-order**

### Examples

| Problem | Traversal | Why |
|---|---|---|
| Copy/clone a tree | Pre-order | Create parent first, then attach children |
| [Serialize a tree](notes/serialize-and-deserialize-binary-tree.md) | Pre-order | Record node before descending |
| [Validate BST](notes/dfs-in-order-traversal-validate-binary-search-tr.md) | Pre-order | Pass down valid range as you descend |
| Kth smallest in BST | In-order | Count nodes in sorted order |
| [Calculate height](notes/dfs-postorder-traversal-max-depth.md) | Post-order | Need children's heights first: `1 + max(left, right)` |
| [Diameter of tree](notes/diameter-of-binary-tree.md) | Post-order | Need depths from both subtrees |
| Delete a tree | Post-order | Delete children before parent |
| Evaluate expression tree | Post-order | Need operands before applying operator |
| [Lowest Common Ancestor](notes/lowest-common-ancestor-lca.md) | Post-order | Need to check both subtrees before deciding if current node is LCA |

### Visual Example

```
       1
      / \
     2   3
    / \
   4   5

Pre-order:  1 → 2 → 4 → 5 → 3  (root first, then left subtree, then right)
In-order:   4 → 2 → 5 → 1 → 3  (left subtree, then root, then right)
Post-order: 4 → 5 → 2 → 3 → 1  (left subtree, then right subtree, then root)
```

---

### Pattern: Post-order DFS with External Accumulator (Tree DP)

A recurring shape in tree problems: the recursion **returns one thing to the parent** (local subtree info), but also **updates an outer variable** to track a global answer.

**Why two channels?** Because the *return value* is what the parent needs to continue building, while the *outer variable* tracks the best answer seen across the whole tree. They're often different things — forcing both into one return value makes the code cryptic.

**The shape:**

```typescript
function solve(root: TreeNode | null): ResultType {
  let answer = initialValue;  // global accumulator (closure variable)

  function dfs(node: TreeNode | null): LocalInfo {
    if (!node) return baseCase;

    const left = dfs(node.left);
    const right = dfs(node.right);

    // Combine children's info with current node
    const localInfo = combine(left, right, node);

    // Update the global answer using whatever spans through this node
    answer = updateAnswer(answer, left, right, node);

    return localInfo;  // what the parent needs
  }

  dfs(root);
  return answer;
}
```

**Classic problems using this pattern:**

| Problem | Returns up | Tracks externally |
|---------|-----------|-------------------|
| [Diameter of Binary Tree](notes/diameter-of-binary-tree.md) | height of subtree | max diameter seen |
| Maximum Path Sum | max gain ending at node (going down only) | max path through any node |
| Longest Univalue Path | length of univalue path ending here | longest univalue path anywhere |
| [Lowest Common Ancestor](notes/lowest-common-ancestor-lca.md) | `{ foundP, foundQ }` | the lowest node where both are true |
| Balanced Binary Tree | height of subtree | whether tree is balanced |

**Instinct to recognize it:** *"At each node, I need something local to compute the answer, but the answer itself spans the whole tree."* When the return value and the answer aren't the same thing, reach for this pattern.

**Mental shortcut:** if you ever find yourself thinking *"I need two things from this recursion,"* either:
- Return a tuple/object containing both, or
- Return one, accumulate the other in an outer variable (often cleaner)
