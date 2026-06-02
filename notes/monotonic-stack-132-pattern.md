# Monotonic Stack - 132 Pattern

Topic: greedy, monotonic, stack

Difficulty: Medium

Interview Frequency: Medium

### Question

[LeetCode 456 - 132 Pattern](https://leetcode.com/problems/132-pattern/)

*Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of three integers `nums[i]`, `nums[j]`, `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`. Return `true` if there is a 132 pattern in `nums`, otherwise return `false`.*

```typescript
Input: nums = [3, 1, 4, 2]
Output: true
// The 132 pattern is (1, 4, 2) at indices (1, 2, 3).
```

### Ideas

**Clarify the roles before anything else.** The numbers `1`, `3`, `2` describe **value rank**, but the **index order** is different. Confusing these two is the single biggest source of bugs:

| Role | Position (index) | Value rank |
| :--- | :--- | :--- |
| **small** | `i` — leftmost | smallest of the three (the "1") |
| **big** | `j` — middle | largest of the three (the "3") |
| **mid** | `k` — rightmost | middle value of the three (the "2") |

So in array order, reading left-to-right: **small** comes first, then **big**, then **mid**. The largest value sits in the *middle position*, not at the end. The end position holds the *middle value*.

**Why brute force is O(n³).** For each `(i, j, k)` triple with `i < j < k`, check the value relations. Works for small inputs (n ≤ 100 or so), but the constraints typically allow n ≤ 2 × 10⁵, so we need to do better. The two relations involved (`nums[i] < nums[k]` and `nums[k] < nums[j]`) interact in a way that simple two-pointer doesn't handle well — the right approach uses a monotonic stack.

**Why scan right-to-left, not left-to-right.** The natural instinct is to scan left-to-right and try to find the pattern as we go. This struggles because the **mid** lives at the *latest* index — when scanning forward, the mid is always in the future, so we can't commit to it. We'd have to maintain many open `(small, big)` pairs and check each new value against all of them.

Right-to-left flips this: by the time we reach a candidate `small`, the `(big, mid)` half of the pattern is already in the past, fully observed. We can collapse all candidate `(big, mid)` pairs into a single number — the **largest confirmed mid** — and just look for a `small` smaller than that one number.

**The instinct: "stack + one tracked value" beats "min + max separately".** A natural first attempt is to track `min` (smallest "small" so far) and `max` (largest "big" so far) as two separate variables. The problem is they don't carry index information — `min` could be at an index *after* `max`, which would violate the `i < j` requirement. A monotonic stack guarantees the ordering for free: **the popper sits at an earlier array index than the popped**. When `nums[current]` is the popper, it's automatically `big`; when something pops out, it's automatically a confirmed `mid` to its right.

**The algorithm.**

1. Scan **right-to-left**, maintaining a stack of candidate "big" values and a scalar `mid` = largest confirmed mid so far.
2. At each new value `nums[i]`, first check: is `nums[i] < mid`? If yes, you've found the **small** — return `true`. The `mid` you compare against already implies a `big` to its left (that's why it was promoted).
3. Otherwise, pop any stack values smaller than `nums[i]`. Each popped value becomes a confirmed `mid` (with `nums[i]` as its `big`). Update `mid = max(mid, popped)`.
4. Push `nums[i]` onto the stack.

**Why max (not min) for the mid update?** The bigger the `mid`, the easier it is for some future leftward number to slip beneath it as the `small`. A smaller `mid` would be stricter for nothing — anything `< small_mid` is also `< large_mid`, so keeping only the largest is lossless.

**Trace `[3, 1, 4, 2]` right-to-left (2, 4, 1, 3):**

```
visit 2: stack=[], mid=-∞     →  push 2.   stack=[2]
visit 4: pop 2, mid=2         →  push 4.   stack=[4],  mid=2
visit 1: 1 < 2 (mid)?  no     →  push 1.   stack=[4,1]
visit 3: pop 1, mid=max(2,1)=2 → top 4 ≥ 3, stop. push 3. stack=[4,3], mid=2
                                                          ↑ wait, did we return?

Let me redo — the check is BEFORE the pop loop.

visit 2: 2 < -∞? no   → push.  stack=[2]
visit 4: 4 < -∞? no   → pop 2, mid=2. push 4. stack=[4], mid=2
visit 1: 1 < 2? YES   → return true ✓
```

Mapping back: `1` is at index 1 → **small**. `2` is at index 3 → **mid** (it was popped when we visited 4, meaning 4 is its **big** at index 2). Indices `1 < 2 < 3` ✓, values `1 < 2 < 4` ✓.

**Why it's O(n).** Each element is pushed at most once and popped at most once. The `mid` update is O(1) per pop. Total work: O(n).

**The journey that led here (worth remembering):**

- *Left-to-right with `min` (the smallest "small")* — collapses `(small, big)` pairs into a single `min`, but loses the fact that different smalls come with *different* bigs. A smaller small with a smaller big is a worse match for large `nums[k]` than a bigger small with a bigger big. Cannot be cleanly fixed.
- *Right-to-left with `min`* — same `min` semantics in the reverse direction also breaks, because `min` ends up tracking a value at an index *after* the current scan position, violating `i < j` order.
- *Right-to-left with `mid` (the largest "mid")* — works. The variable describes what's already in the past (to the right), not the future, so its index relationship to the current scan position is correct by construction.

The structural lesson: **`min`/`max` over popped values is direction-sensitive**. When scanning right-to-left, the popped value lives at a later index than the current — so the popped represents the `mid` (latest index in the pattern), and you take `max` because a bigger mid is more permissive. The same approach in the other direction needs a different framing entirely.

**Time: O(n)** — each element pushed and popped at most once.

**Space: O(n)** — worst case the stack holds all elements (e.g. strictly decreasing input).

### Solution

```typescript
function find132pattern(nums: number[]): boolean {
  const n = nums.length;
  const stack: number[] = []; // candidates for the "big" (j) of the pattern
  /**
   * Why not use a single (min, max) variable instead?
   * Because the monotonic stack guarantees ordering for free:
   *   when we pop a value, the popper (current) is at an EARLIER
   *   index than the popped (which lives further right in the array).
   *   So popper = big at smaller index, popped = mid at larger index.
   *   That's exactly the (j, k) part of the 132 pattern, with no
   *   bookkeeping needed.
   */
  let mid = -Infinity; // largest mid value confirmed so far
  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] < mid) return true; // current is the "small" (i)
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      const item = stack.pop()!;
      mid = Math.max(mid, item); // promote popped to a confirmed mid
    }
    stack.push(nums[i]);
  }
  return false;
}
```
