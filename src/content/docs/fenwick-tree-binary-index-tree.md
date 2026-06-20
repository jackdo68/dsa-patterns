---
title: "Fenwick tree - Binary Index Tree"
topic: "advanced data structure, tree"
difficulty: "Hard"
frequency: "Very Low"
---
### Ideas

- It’s an data structure that specialised in calculating the prefix sum with `O(logn)` time complexity, but it comes with the trade off that when updating an element, it also takes `O(logn)` time complexity. Even it’s called a “tree”, it actually uses an array to represents the value of all the nodes. An Binary Index Tree (BIT) which represents an array of length `n` will have `n` nodes and `logn` height

### Solution

```typescript
class BinaryIndexTree {
    private tree: number[];
    private size: number;
    constructor(size: number) {
      this.tree = Array.from({ length: size + 1 }, () => 0); // the array is 1-indexed
      this.size = size;
    }

    public update(index: number, value: number): void {
      for (let i = index + 1; i <= this.size; i += i & -i) {
        this.tree[i] += value;
      }
    }

    public prefixSum(index: number): number {
      let sum = 0;

      for (let i = index + 1; i > 0; i -= i & -i) {
        sum += this.tree[i];
      }

      return sum;
    }
  }
```