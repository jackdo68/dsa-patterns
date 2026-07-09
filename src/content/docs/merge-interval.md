---
title: "Merge Interval"
topic: "interval"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 56 - Merge Intervals](https://leetcode.com/problems/merge-intervals/)

_Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input._

_Example 1:_

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

### Ideas

**Interval overlap:** Two intervals overlap when the current start is less than or equal to the previous end: `curr[0] <= prev[1]`

```
Overlapping:        Non-overlapping:
prev: [1----3]      prev: [1--3]
curr:    [2----6]   curr:        [8--10]
         ↑                       ↑
     curr[0] <= prev[1]      curr[0] > prev[1]
```

**Approach:**

1. **Sort by start time** — ensures we process intervals in order
2. **Iterate and merge** — compare each interval with the previous one
3. **Overlap** → extend prev's end to `max(prev[1], curr[1])`
4. **No overlap** → add curr to result, update prev

```
intervals = [[1,3], [2,6], [8,10], [15,18]]

prev = [1,3]
[2,6]: 2 <= 3 → overlap, extend to [1,6]
[8,10]: 8 > 6 → no overlap, add [8,10], prev = [8,10]
[15,18]: 15 > 10 → no overlap, add [15,18]

result = [[1,6], [8,10], [15,18]]
```

**Time: O(n log n)** — dominated by sorting

**Space: O(n)** — result array (O(1) if modifying in place)

### Solution

```csharp
public int[][] Merge(int[][] intervals) {
    var res = new List<int[]>();
    Array.Sort(intervals, (a, b) => a[0] - b[0]);
    int[] temp = intervals[0];
    foreach (var curr in intervals) {
        if (curr[0] <= temp[1]) {
            temp[1] = Math.Max(temp[1], curr[1]);
        } else {
            res.Add(temp);
            temp = curr;
        }
    }
    res.Add(temp);
    return res.ToArray();
}
```
