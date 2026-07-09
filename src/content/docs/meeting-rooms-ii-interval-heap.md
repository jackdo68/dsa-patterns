---
title: "Meeting Rooms II"
topic: "interval, heap, greedy, sorting"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 253 - Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Explanation: Meeting 1: [0,30] needs room 1
             Meeting 2: [5,10] needs room 2 (overlaps with meeting 1)
             Meeting 3: [15,20] can use room 2 (after meeting 2 ends)
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: 1
```

### Ideas

**Approach 1: Min Heap**
- Sort meetings by start time
- Use a min heap to track end times of ongoing meetings
- For each meeting, if it starts after the earliest ending meeting, reuse that room
- Otherwise, need a new room

**Approach 2: Chronological Ordering**
- Separate start and end times
- Process events in chronological order
- Start = +1 room, End = -1 room
- Track maximum concurrent rooms

### Implementation

**Approach 1: Min Heap (Intuitive)**

```csharp
public int MinMeetingRooms(int[][] intervals) {
    if (intervals.Length == 0) return 0;

    // Sort by start time
    Array.Sort(intervals, (a, b) => a[0] - b[0]);

    // Min heap of end times (smallest end time first)
    var minHeap = new PriorityQueue<int, int>();

    // Add first meeting's end time
    minHeap.Enqueue(intervals[0][1], intervals[0][1]);

    for (int i = 1; i < intervals.Length; i++) {
        int start = intervals[i][0], end = intervals[i][1];

        // If current meeting starts after the earliest ending meeting, reuse that room
        if (start >= minHeap.Peek()) {
            minHeap.Dequeue();
        }

        // Add current meeting's end time
        minHeap.Enqueue(end, end);
    }

    // Heap size = number of rooms needed
    return minHeap.Count;
}
```

**Approach 2: Two Pointers (Optimal)**

```csharp
public int MinMeetingRooms(int[][] intervals) {
    int[] starts = intervals.Select(i => i[0]).OrderBy(x => x).ToArray();
    int[] ends = intervals.Select(i => i[1]).OrderBy(x => x).ToArray();

    int rooms = 0;
    int maxRooms = 0;
    int startPtr = 0;
    int endPtr = 0;

    while (startPtr < intervals.Length) {
        if (starts[startPtr] < ends[endPtr]) {
            // A meeting starts before another ends
            rooms++;
            startPtr++;
        } else {
            // A meeting ends
            rooms--;
            endPtr++;
        }
        maxRooms = Math.Max(maxRooms, rooms);
    }

    return maxRooms;
}
```

**Approach 3: Event-based (Clearest)**

```csharp
public int MinMeetingRooms(int[][] intervals) {
    var events = new List<(int time, int type)>();

    // Create events: (time, type) where type: 1=start, -1=end
    foreach (var interval in intervals) {
        events.Add((interval[0], 1));   // Meeting starts
        events.Add((interval[1], -1));  // Meeting ends
    }

    // Sort by time; if same time, process ends before starts
    events.Sort((a, b) => a.time != b.time ? a.time - b.time : a.type - b.type);

    int currentRooms = 0;
    int maxRooms = 0;

    foreach (var (time, type) in events) {
        currentRooms += type;
        maxRooms = Math.Max(maxRooms, currentRooms);
    }

    return maxRooms;
}
```

**Time Complexity:** O(n log n) for sorting

**Space Complexity:** O(n)

### Visualization

```
Intervals: [[0,30], [5,10], [15,20]]

Timeline:
0----5----10----15----20----30
|=========================>     Room 1: [0,30]
     |====>                     Room 2: [5,10]
               |=====>          Room 2: [15,20] (reused)

Events: (0,+1), (5,+1), (10,-1), (15,+1), (20,-1), (30,-1)
Rooms:    1      2       1        2        1        0

Max rooms = 2
```

### Pattern: Interval + Heap

This pattern combines sorting intervals with a heap for tracking state:

```csharp
public int IntervalHeapPattern(int[][] intervals) {
    // 1. Sort by start time
    Array.Sort(intervals, (a, b) => a[0] - b[0]);

    // 2. Process with a min heap tracking end times
    var minHeap = new PriorityQueue<int, int>();

    foreach (var interval in intervals) {
        int start = interval[0], end = interval[1];
        // Check if we can reuse a slot (start >= earliest end)
        if (minHeap.Count > 0 && start >= minHeap.Peek()) {
            minHeap.Dequeue();  // Reuse this slot
        }
        minHeap.Enqueue(end, end);  // Add current end time
    }

    return minHeap.Count;  // Active slots needed
}
```

### Related Problems

| Problem | Variation |
|---------|-----------|
| Meeting Rooms I (252) | Check if any overlap (just sort) |
| Meeting Rooms II (253) | Min rooms (heap or events) |
| Merge Intervals (56) | Combine overlapping |
| Insert Interval (57) | Insert and merge |
| Non-overlapping Intervals (435) | Min removals |
| Employee Free Time (759) | Find gaps across schedules |

### Meeting Rooms I (Simpler version)

Can a person attend all meetings? (No overlaps)

```csharp
public bool CanAttendMeetings(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[0] - b[0]);

    for (int i = 1; i < intervals.Length; i++) {
        // If current starts before previous ends, overlap!
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}
```
