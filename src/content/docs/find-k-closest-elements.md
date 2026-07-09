---
title: "Find k closest elements"
topic: "binary search, sliding window"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 658 - Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)

*Given a **sorted** integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.*

*An integer `a` is closer to `x` than an integer `b` if:*

- *`|a - x| < |b - x|`, or*
- *`|a - x| == |b - x|` and `a < b`*

### Ideas

**Instinct 1: "k closest in a sorted array → contiguous window."** Since the array is sorted, the k closest elements to `x` must be adjacent. You don't pick k separate elements — you pick a *window* of size k. So the problem collapses to: **"where does the best window start?"**

**Instinct 2: "find an optimal position with monotonic preference → binary search."** Valid starting positions are `0` to `n - k`. As you slide the window right, at some point you stop improving and start getting worse. That's a monotonic boundary, which means binary search.

**Instinct 3: "decide direction by comparing boundary tradeoffs."** At any starting position `i`, the window covers `arr[i..i+k-1]`. To check if sliding right is better, compare:
- **What you lose:** `arr[i]` (drops off the left)
- **What you gain:** `arr[i + k]` (joins on the right)

If the lost element is farther from `x` → sliding right helps (the gained one is closer). If the gained element is farther (or tied with the loss) → don't slide; the current position is at least as good.

**The predicate:** *"sliding right would NOT improve things"* = `arr[mid + k] - x >= x - arr[mid]`. When true, `mid` is a candidate starting position — record it and search left for an earlier one.

**Note on the signed comparison.** We write `x - arr[mid]` and `arr[mid + k] - x` (not `Math.abs`). This works because the array is sorted: if `x` is to the right of the window, both expressions naturally reflect that, and the predicate still picks the right direction.

**Walkthrough** with `arr = [1, 2, 3, 4, 5]`, `k = 3`, `x = 3`:

```
left=0, right=2, result=2

mid=1: lose arr[1]=2 (dist 1), gain arr[4]=5 (dist 2)
       5-3 >= 3-2? 2 >= 1? Yes → record. result=1, right=0
mid=0: lose arr[0]=1 (dist 2), gain arr[3]=4 (dist 1)
       4-3 >= 3-1? 1 >= 2? No → skip. left=1

left=1 > right=0 → stop. result=1
Window: arr[1..3] = [2, 3, 4] ✓
```

### Solution

```csharp
public IList<int> FindClosestElements(int[] arr, int k, int x) {
    if (arr.Length == k) return arr.ToList();

    int left = 0;
    int right = arr.Length - k - 1;   // last position where arr[mid + k] is in bounds
    int result = arr.Length - k;       // default: slide all the way right

    while (left <= right) {
        int mid = (left + right) / 2;
        // predicate: sliding right would NOT improve — mid is a candidate
        if (arr[mid + k] - x >= x - arr[mid]) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return arr.Skip(result).Take(k).ToList();
}
```