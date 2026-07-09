---
title: "Monotonic Queue | Stack - Sliding Window Maximum"
topic: "monotonic, queue, sliding window, stack"
difficulty: "Hard"
frequency: "Low"
---
### Question

[LeetCode 239 - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

*You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.*

*Return the max sliding window.*

### Ideas

- As the window slide, we need to keep track of the largest element in the array, instead of keep track of the whole array, we can do a decreasing array (monotonic queue) so the first element always the largest
- In order to know when that element is outside of the window, we store the index of the element instead of itself
- In order to make the queue decreasing, whenever we push the new item to the queue, we compare that item to the last item of the queue and keep popping

### Solution

```csharp
public int[] MaxSlidingWindow(int[] nums, int k) {
    var queue = new LinkedList<int>(); // stores indices, values decreasing front→back
    var res = new List<int>();

    for (int i = 0; i < nums.Length; i++) {
        // keep the queue in decreasing order
        while (queue.Count > 0 && nums[queue.Last!.Value] < nums[i]) queue.RemoveLast();
        queue.AddLast(i); // push the current index

        if (i == queue.First!.Value + k) queue.RemoveFirst(); // left element out of window
        if (i >= k - 1) res.Add(nums[queue.First!.Value]); // front is always the largest
    }
    return res.ToArray();
}
```