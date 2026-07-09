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

```csharp
// Note: .NET already ships PriorityQueue<TElement, TPriority> (a min-heap).
// This hand-rolled version shows the mechanics.
public class MinHeap {
    private readonly List<int> heap = new();

    public void Push(int value) {
        heap.Add(value);
        int index = heap.Count - 1;
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap[parent] <= heap[index]) break;
            (heap[parent], heap[index]) = (heap[index], heap[parent]);
            index = parent;
        }
    }

    public int? Pop() {
        if (heap.Count == 0) return null;
        (heap[0], heap[^1]) = (heap[^1], heap[0]);
        int min = heap[^1];
        heap.RemoveAt(heap.Count - 1);
        int index = 0;
        while (index < heap.Count) {
            int smallest = index;
            int left = 2 * index + 1;
            int right = 2 * index + 2;
            if (left < heap.Count && heap[left] < heap[smallest]) smallest = left;
            if (right < heap.Count && heap[right] < heap[smallest]) smallest = right;
            if (smallest == index) break;
            (heap[index], heap[smallest]) = (heap[smallest], heap[index]);
            index = smallest;
        }
        return min;
    }

    public int Size() => heap.Count;
}
```