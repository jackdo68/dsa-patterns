---
title: "Min Heap"
topic: "heap"
---
### Ideas

A binary tree stored in an array where each parent is smaller than its children. The root (index 0) is always the minimum.

**3 formulas:**
```
parent = (i - 1) / 2
left   = 2i + 1
right  = 2i + 2  (or just left + 1)
```

**Mental model:**
- `push`: add to end, keep swapping with parent while parent is bigger
- `pop`: save root, move last to root, keep swapping with smaller child while child is smaller

**Time:** O(log n) for push/pop — height of tree is log n

### Solution

```typescript
class MinHeap {
  private heap: number[] = [];

  push(value: number) {
    this.heap.push(value);
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  pop(): number | undefined {
    if (!this.heap.length) return undefined;
    [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
    const min = this.heap.pop()!;
    let index = 0;
    while (index < this.heap.length) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
    return min;
  }

  size() { return this.heap.length; }
}
```