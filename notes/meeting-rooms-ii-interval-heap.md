# Meeting Rooms II

Topic: interval, heap, greedy, sorting

Difficulty: Medium

Interview Frequency: High

Tags: interval, heap, greedy, sorting, medium

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

```tsx
function minMeetingRooms(intervals: number[][]): number {
    if (intervals.length === 0) return 0;

    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Min heap of end times (using array, smallest end time first)
    const minHeap = new MinPriorityQueue();

    // Add first meeting's end time
    minHeap.enqueue(intervals[0][1]);

    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];

        // If current meeting starts after earliest ending meeting
        // We can reuse that room
        if (start >= minHeap.front().element) {
            minHeap.dequeue();
        }

        // Add current meeting's end time
        minHeap.enqueue(end);
    }

    // Heap size = number of rooms needed
    return minHeap.size();
}
```

**Approach 2: Two Pointers (Optimal)**

```tsx
function minMeetingRooms(intervals: number[][]): number {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0;
    let maxRooms = 0;
    let startPtr = 0;
    let endPtr = 0;

    while (startPtr < intervals.length) {
        if (starts[startPtr] < ends[endPtr]) {
            // A meeting starts before another ends
            rooms++;
            startPtr++;
        } else {
            // A meeting ends
            rooms--;
            endPtr++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }

    return maxRooms;
}
```

**Approach 3: Event-based (Clearest)**

```tsx
function minMeetingRooms(intervals: number[][]): number {
    const events: [number, number][] = [];

    // Create events: (time, type) where type: 1=start, -1=end
    for (const [start, end] of intervals) {
        events.push([start, 1]);   // Meeting starts
        events.push([end, -1]);    // Meeting ends
    }

    // Sort by time, if same time, process ends before starts
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let currentRooms = 0;
    let maxRooms = 0;

    for (const [time, type] of events) {
        currentRooms += type;
        maxRooms = Math.max(maxRooms, currentRooms);
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

```tsx
function intervalHeapPattern(intervals) {
    // 1. Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // 2. Process with min heap tracking end times
    const minHeap = new MinHeap();

    for (const [start, end] of intervals) {
        // Check if can reuse (start >= earliest end)
        if (minHeap.size > 0 && start >= minHeap.peek()) {
            minHeap.pop();  // Reuse this slot
        }
        minHeap.push(end);  // Add current end time
    }

    return minHeap.size;  // Active slots needed
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

```tsx
function canAttendMeetings(intervals: number[][]): boolean {
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        // If current starts before previous ends, overlap!
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}
```
