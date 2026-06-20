---
title: "Design - Exam Room"
topic: "design, greedy, interval, heap"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 855 - Exam Room](https://leetcode.com/problems/exam-room/)

*There is an exam room with `n` seats in a single row labeled from `0` to `n - 1`. When a student enters the room, they must sit in the seat that **maximizes the distance to the closest person**. If there are multiple such seats, they sit in the seat with the **lowest number**. If no one is in the room, the student sits at seat `0`.*

*Design the `ExamRoom` class:*

- *`ExamRoom(int n)` — initializes the room with `n` seats.*
- *`int seat()` — returns the label of the seat the next student will sit in.*
- *`void leave(int p)` — the student sitting at seat `p` leaves.*

```typescript
Input: ["ExamRoom","seat","seat","seat","seat","leave","seat"]
       [[10],[],[],[],[],[4],[]]
Output: [null, 0, 9, 4, 2, null, 5]
```

### Ideas

**Recognize the shape: design + best-pick + arbitrary deletion.** The class has a stateful operation that always asks "what's the best current option?" (`seat()`) and another that can mutate that state at any position (`leave()`). This shape — *best-of with arbitrary deletes* — is a signal for **priority structure + direct-access bookkeeping**. The same shape shows up in [Find Median from Data Stream](/dsa-patterns/find-median-from-data-stream/) and [Task Scheduling](/dsa-patterns/task-scheduling/).

**Model the room as gaps, not seats.** The naive instinct is to scan the full row of seats every time. But the only positions that matter are the unoccupied **regions** between occupants. Represent each region as a gap `[start, end]` where both endpoints are occupied seats (or virtual walls). Then `seat()` becomes "pick the best gap, split it"; `leave()` becomes "merge two adjacent gaps."

**Sentinels eliminate the boundary edge cases.** Without sentinels, you have three special cases on every operation: empty room, single occupant, and "next student goes to seat 0 or seat n-1." With virtual walls at positions `-1` and `n`, every gap has the same shape `[start, end]` — and `seat()` / `leave()` have **one code path**. The three branches now live only in two tiny helpers (`getDis` for the gap's score, `getPos` for its best seat).

**Distinguish "gap length" from "achievable distance."** This is the subtle trap. The gap length `end - start` is a real quantity, but it's *not* what the spec maximizes. The spec maximizes the new student's distance to the nearest occupant. For an interior gap, that's `⌊(end - start) / 2⌋` (the midpoint distance) — half of the length. For a wall gap, the wall isn't an occupant, so the student parks at the edge and gets the full distance to the only real neighbor (no halving). All three gap types must compute and store the **same metric** (achievable distance), otherwise the heap/sort mixes apples and oranges.

```
Interior gap [a, b]:    achievable = ⌊(b - a) / 2⌋     (midpoint)
Left wall [-1, b]:      achievable = b                 (sit at 0)
Right wall [a, n]:      achievable = n - 1 - a         (sit at n-1)
```

**Tiebreak with start DESC after distance ASC.** The spec says "lowest seat number wins ties." When multiple gaps share the highest achievable distance, the one with the *lowest start* (hence lowest computed seat) should be popped. Sort by distance ASC for `pop()` to give the max, then by start DESC for ties so the lowest-start gap is at the end of the array.

**`leave(p)` = find both adjacent gaps + merge.** Every occupied seat is the endpoint of exactly two gaps: one ending at `p` (the left neighbor's gap) and one starting at `p` (the right neighbor's gap). Removing `p` merges them into a single gap with the new endpoints.

**The journey of bugs worth remembering (a checklist for next time):**

1. **`mid` formula** — easy to write `Math.floor((end - start) / 2)` (the offset from `start`) and return that as the seat number. The seat is `start + ⌊(end - start) / 2⌋`.
2. **Distance per sub-gap** — after splitting, each sub-gap has its *own* achievable distance. Compute `getDis` separately for each, not once from the parent.
3. **Distance for interior** — must be `⌊length / 2⌋`, not the full `length`. The wall formulas already capture different semantics, so all three branches must use *comparable* quantities.
4. **Sort tiebreak direction** — start ASC means `pop()` returns the *highest* start; you want the *lowest*. Flip to DESC (`b[1] - a[1]`).

**Optimization path (mentioned in the code).** The submitted solution uses `sort()` per `seat()` (O(k log k)) and a linear scan per `leave()` (O(k)). For LC 855's typical constraints this passes comfortably. The canonical O(log k) solution swaps the sort for a **max-heap** and adds **two hash maps** (`start → gap`, `end → gap`) plus **lazy deletion** in the heap to handle merged-gap invalidation. See the comments in the solution for where each swap goes.

**Time (sorted-array version):** `seat()` is O(k log k), `leave()` is O(k), where k = number of gaps. **Optimized (heap + maps):** both become O(log k) amortized.

**Space:** O(k) for the gaps array (and O(k) extra for the maps in the optimized version).

### Solution

```typescript
type Gap = [number, number, number]; // [achievableDistance, start, end]

class ExamRoom {
  private gaps: Gap[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    // Virtual walls at -1 and n. Initially one big gap covering the room.
    this.gaps = [[this.getDis(-1, n), -1, n]];
    // OPTIMIZATION: also initialize a max-heap with this single gap,
    // plus two Map<number, Gap> for O(1) lookup in leave().
  }

  /** Achievable distance for sitting in this gap. */
  private getDis(a: number, b: number): number {
    if (a === -1) return b;                   // left wall: sit at 0
    if (b === this.n) return this.n - 1 - a;  // right wall: sit at n-1
    return Math.floor((b - a) / 2);           // interior: midpoint
  }

  /** Best seat number for this gap. */
  private getPos(a: number, b: number): number {
    if (a === -1) return 0;
    if (b === this.n) return this.n - 1;
    return a + Math.floor((b - a) / 2);
  }

  seat(): number {
    // OPTIMIZATION: replace sort() with a max-heap pop().
    // With lazy deletion: pop until the top is not marked stale.
    this.gaps.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));
    const [, start, end] = this.gaps.pop()!;
    const pos = this.getPos(start, end);
    // Each sub-gap has its OWN achievable distance — compute separately.
    this.gaps.push([this.getDis(start, pos), start, pos]);
    this.gaps.push([this.getDis(pos, end), pos, end]);
    return pos;
  }

  leave(p: number): void {
    // OPTIMIZATION: replace this scan with two Map<number, Gap> lookups:
    //   const leftGap  = this.gapEndingAt.get(p)!;   // O(1)
    //   const rightGap = this.gapStartingAt.get(p)!; // O(1)
    // Then mark both gaps stale in the heap (lazy deletion).
    let low = -1;
    let high = -1;
    for (let i = 0; i < this.gaps.length; i++) {
      if (this.gaps[i][1] === p) high = i;
      if (this.gaps[i][2] === p) low = i;
    }
    const start = this.gaps[low][1];
    const end = this.gaps[high][2];
    // Splice the higher index first so the lower one doesn't shift.
    const L = low < high ? low : high;
    const R = low < high ? high : low;
    this.gaps.splice(R, 1);
    this.gaps.splice(L, 1);
    this.gaps.push([this.getDis(start, end), start, end]);
  }
}
```
