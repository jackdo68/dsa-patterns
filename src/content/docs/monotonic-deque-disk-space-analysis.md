---
title: "Monotonic Deque - Disk Space Analysis"
topic: "monotonic, queue, sliding window"
difficulty: "Medium"
frequency: "Low"
---
### Question

*Given `n` hard drives and a contiguous segment size `k`, find the maximum of the minimum free space across all contiguous segments of size `k`.*

*In other words, for every window of size `k`, find the minimum value. Then return the maximum among all those minimums.*

### Ideas

**Why this problem requires sliding window minimum:**
- We want to place `k` consecutive servers on `k` consecutive hard drives
- The bottleneck of any segment is its **minimum** free space (the weakest drive limits the segment)
- We want to find the segment where this bottleneck is **maximized** (best worst-case)
- So: find the **max of mins** across all windows of size `k`

**Why monotonic deque works:**
- Brute force: for each window, scan all `k` elements to find min → O(n·k)
- Monotonic deque: maintain an **increasing queue** so the front is always the current window's minimum → O(n)
- **Key insight:** when a smaller element enters, any larger elements in the queue can **never be the minimum** while that smaller element exists — they will leave the window before or at the same time, so discard them
- Each element enters and exits the deque at most once → O(n) total

**Example:** `space = [5, 3, 7, 2, 8, 6]`, `k = 3`

| i | value | Action | Deque (indices) | Deque (values) | Window | Min | Result |
|---|-------|--------|-----------------|----------------|--------|-----|--------|
| 0 | 5 | push 0 | [0] | [5] | - | - | - |
| 1 | 3 | 3 < 5, pop 0, push 1 | [1] | [3] | - | - | - |
| 2 | 7 | 7 > 3, push 2 | [1, 2] | [3, 7] | [5,3,7] | 3 | 3 |
| 3 | 2 | 2 < 7, pop 2; 2 < 3, pop 1; push 3 | [3] | [2] | [3,7,2] | 2 | 3 |
| 4 | 8 | 8 > 2, push 4 | [3, 4] | [2, 8] | [7,2,8] | 2 | 3 |
| 5 | 6 | 6 < 8, pop 4; 6 > 2, push 5; front (3) outside window, shift | [5] | [6] | [2,8,6] | 6 | 6 |

Answer: **6**

**Cases covered:**
1. **i=1:** New element smaller → pop larger elements from back
2. **i=2:** New element larger → just push (maintains increasing order)
3. **i=3:** New element smallest → pop multiple elements
4. **i=5:** Front element outside window → shift it out

Time: O(n), Space: O(k)

### Solution

```csharp
public int DiskSpaceAnalysis(int n, int k, int[] space) {
    var deque = new LinkedList<int>(); // stores indices, values increasing front→back
    int result = int.MinValue;

    for (int i = 0; i < n; i++) {
        // remove elements outside the window
        if (deque.Count > 0 && deque.First!.Value <= i - k) deque.RemoveFirst();

        // maintain increasing order (min deque)
        while (deque.Count > 0 && space[deque.Last!.Value] >= space[i]) {
            deque.RemoveLast();
        }

        deque.AddLast(i);

        // window is fully formed
        if (i >= k - 1) {
            result = Math.Max(result, space[deque.First!.Value]);
        }
    }

    return result;
}
```
