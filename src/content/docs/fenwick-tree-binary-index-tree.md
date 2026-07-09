---
title: "Fenwick tree - Binary Index Tree"
topic: "advanced data structure, tree"
difficulty: "Hard"
frequency: "Very Low"
---
### Ideas

- It’s an data structure that specialised in calculating the prefix sum with `O(logn)` time complexity, but it comes with the trade off that when updating an element, it also takes `O(logn)` time complexity. Even it’s called a “tree”, it actually uses an array to represents the value of all the nodes. An Binary Index Tree (BIT) which represents an array of length `n` will have `n` nodes and `logn` height

### Solution

```csharp
public class BinaryIndexTree {
    private readonly int[] tree;
    private readonly int size;

    public BinaryIndexTree(int size) {
        tree = new int[size + 1]; // the array is 1-indexed
        this.size = size;
    }

    public void Update(int index, int value) {
        for (int i = index + 1; i <= size; i += i & -i) {
            tree[i] += value;
        }
    }

    public int PrefixSum(int index) {
        int sum = 0;

        for (int i = index + 1; i > 0; i -= i & -i) {
            sum += tree[i];
        }

        return sum;
    }
}
```