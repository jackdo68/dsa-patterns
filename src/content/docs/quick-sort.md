---
title: "Quick Sort"
topic: "sorting, divide and conquer"
difficulty: "Medium"
frequency: "Medium"
---
### Ideas

**Instinct: "sort by repeatedly splitting" → divide and conquer.** Pick one element (the **pivot**), put every element smaller than it on the left and every element larger on the right. Now the pivot is in its final sorted position, and we recursively sort the two sides.

After the partition step:
```
[smaller than pivot] [pivot] [larger than pivot]
                       ^
                     locked in its correct final position
```

Then sort `left` and `right` independently — they don't need to know about each other or the pivot. That's the divide and conquer split.

**Why it terminates correctly:**
- Base case: arrays of length 0 or 1 are already sorted.
- Each recursion shrinks the problem (the pivot is removed from both sub-problems).
- The pivot lands at its correct final index; everything left of it is smaller, everything right is larger.

### Walkthrough

`arr = [10, 5, 2, 3, 99, 23]`, pivot = `23` (last element)

```
Partition: [10, 5, 2, 3, 99] vs 23
  smaller: [10, 5, 2, 3]
  larger:  [99]

Result so far: [...sort([10,5,2,3]), 23, ...sort([99])]

Sort [10, 5, 2, 3], pivot = 3:
  smaller: [2]
  larger:  [10, 5]
  → [...sort([2]), 3, ...sort([10,5])]

Sort [10, 5], pivot = 5:
  smaller: []
  larger:  [10]
  → [5, 10]

Final: [2, 3, 5, 10, 23, 99]
```

### Solution (Out-of-place — easier to read)

```typescript
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

**Time:** O(n log n) average, O(n²) worst case (sorted or reverse-sorted input).
**Space:** O(n) for the auxiliary arrays + O(log n) recursion stack.

### Why Pick the Last Element as the Pivot?

It's mostly **convention** for this out-of-place version — first, last, or middle all work the same. We pick last for two reasons:

1. **It's the easiest to "skip" in the partition loop.** `for (let i = 0; i < arr.length - 1; i++)` naturally stops before the pivot.
2. **It matches the canonical in-place partition (Lomuto scheme),** where last-as-pivot lets you swap the pivot into its final spot with a single swap at the end. Keeping the same convention across versions reduces mental overhead.

**But last is also the *worst* choice for performance** on already-sorted or reverse-sorted inputs. With sorted input `[1, 2, 3, 4, 5]`, the pivot is always the max, the `right` array is always empty, and the `left` array shrinks by 1 each time → O(n²).

**Better pivot strategies in practice:**

| Strategy | Pros | Cons |
|----------|------|------|
| **Last (or first)** | Simple | O(n²) on sorted/reverse-sorted input |
| **Middle** | O(n log n) on already-sorted input | Still bad on adversarial input |
| **Random** | O(n log n) expected, hard to construct adversarial input | Slightly slower constant factor (random call per step) |
| **Median of three** (first, middle, last) | Robust against most input patterns | More code |

For interviews, picking the last element is fine — it shows you understand the algorithm. Mention that you'd use random or median-of-three in production to guard against the O(n²) worst case.

### In-place Variant (Lomuto Partition)

The classic in-place version uses two pointers to partition without creating new arrays — better memory (O(log n) total instead of O(n)).

```typescript
function quickSortInPlace(arr: number[], lo = 0, hi = arr.length - 1): void {
  if (lo >= hi) return;

  const pivot = arr[hi];        // last element as pivot
  let partition = lo;            // boundary: arr[lo..partition-1] are < pivot

  for (let i = lo; i < hi; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[partition]] = [arr[partition], arr[i]];
      partition++;
    }
  }

  // Swap pivot into its final position
  [arr[partition], arr[hi]] = [arr[hi], arr[partition]];

  quickSortInPlace(arr, lo, partition - 1);
  quickSortInPlace(arr, partition + 1, hi);
}
```

**The two pointers:**
- `i` — scans every element from `lo` to `hi - 1`
- `partition` — the boundary index; everything to its left is `< pivot`

Whenever `arr[i] < pivot`, swap it to the boundary and grow the boundary. At the end, swap the pivot itself into the boundary position — that's its final spot.

The "last as pivot" choice makes the final swap clean: pivot starts at `hi`, ends up at `partition`. If we'd chosen the first element, we'd need a different boundary scheme.
