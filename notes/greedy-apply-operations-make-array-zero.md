# Greedy - Apply Operations to Make All Elements Zero

Topic: greedy, sliding window, array

Difficulty: Medium

Interview Frequency: Medium

### Question

[LeetCode 2772 - Apply Operations to Make All Array Elements Equal to Zero](https://leetcode.com/problems/apply-operations-to-make-all-array-elements-equal-to-zero/)

*You are given a 0-indexed integer array `nums` and a positive integer `k`. You can apply the following operation on the array any number of times: choose any subarray of size `k` and decrease all its elements by 1. Return `true` if you can make all array elements equal to 0, otherwise return `false`.*

```typescript
Input: nums = [2,2,3,1,1,0], k = 3
Output: true
// Apply window [2,2,3] twice → [0,0,1,1,1,0]
// Apply window [1,1,1] once  → [0,0,0,0,0,0]
```

```typescript
Input: nums = [1,3,1,1], k = 2
Output: false
```

### Ideas

**Reframe: count operations starting at each position.** Instead of asking "which subarrays should I pick?", ask "how many operations have a window **starting** at index `i`?" Call that `ops[i]`. Then the value at any position `i` equals the sum of `ops[j]` for every `j` where the window starting at `j` covers `i` — i.e., the sum of `ops[i-k+1] + ... + ops[i]`.

**The leftmost position has only one window that touches it.** Look at position 0. The window starting at 0 covers `[0, 1, ..., k-1]`. The window starting at 1 covers `[1, 2, ..., k]` — it does **not** touch position 0. So only **one** window can ever decrement position 0. That window must run exactly `nums[0]` times. No choice.

```
nums = [2, 2, 3, 1, 1, 0], k = 3
        ↑
        position 0 — only the window starting at 0 reaches it
        → ops[0] = 2  (forced)
```

**The cascade: every position adds exactly one new degree of freedom.** Once `ops[0]` is locked, look at position 1. Two windows touch it: the one at 0 (decided) and the one at 1 (free). So `ops[1] = nums[1] - ops[0]`. Forced. Once `ops[1]` is locked, position 2's only free knob is `ops[2]`. Forced. And so on — at every step left-to-right, exactly one window is undecided, and it's pinned by the current position's value.

**Why "left to right" specifically.** The leftmost position has the fewest options (just one window). That's where the chain of forced moves has to start. By symmetry, you could also walk right-to-left — the rightmost position is also only touched by one window. Either direction works because the **boundary** is where forced moves originate. Anywhere in the middle has multiple undecided windows touching it at once.

**Why this is greedy.** At every step you make the locally-unique decision (the only value that brings position `i` to zero given what's already committed). There's no backtracking, no choice to weigh — the algorithm is "compute the forced value, commit, advance." That's the cleanest possible greedy: local correctness directly implies global correctness because every decision was the only legal one.

**Two failure modes.**

1. **Negative needed:** if `nums[i] - (active decrements so far) < 0`, the operations already committed overshot — they decremented position `i` past zero, which isn't allowed. Return `false`.
2. **Window can't fit:** for positions in the last `k - 1` indices, no new window can start (it would extend past the end of the array). So if any of those positions still needs more decrement, you're stuck. Return `false`.

**The sliding window optimization.** The naive implementation (this note's solution) bulk-updates `ops[i..i+k-1]` per iteration — that's O(n × k). For large inputs this TLEs.

The optimization: instead of updating `k` slots in `ops`, track a **single running counter** `active` representing the sum of operations still affecting the current position. Each iteration:

- Add the op you just committed to `active`.
- Subtract the op from `k` positions ago (its window has expired).

That's O(1) per iteration → O(n) total. Same forced-greedy logic, faster bookkeeping.

```typescript
// O(n) sliding window version
function checkArray(nums: number[], k: number): boolean {
  const n = nums.length;
  const ops = new Array(n).fill(0);
  let active = 0;
  for (let i = 0; i < n; i++) {
    if (i >= k) active -= ops[i - k];          // expire old op
    const needed = nums[i] - active;
    if (needed < 0) return false;
    if (needed > 0 && i + k > n) return false;
    ops[i] = needed;
    active += needed;                           // current op enters window
  }
  return true;
}
```

**The general pattern.** When a problem says *"you can apply operation X any number of times — can you reach state Y?"* and operation X has a **fixed-size window shape**, the move is: reframe as "how many ops start at each position?", greedy left-to-right (the boundary pins down the first window, which pins down the next, etc.), and track effects with a sliding sum. Same template solves [LC 995 - Minimum Number of K Consecutive Bit Flips](https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/) (binary version of this exact problem).

**Time (naive):** O(n × k) — outer loop scans `n`, inner loop updates `k` slots.

**Time (optimized):** O(n) — single pass, O(1) per position with a running counter.

**Space:** O(n) for the `ops` array (can be O(1) extra by overwriting `nums` in place).

### Solution

```typescript
function checkArray(nums: number[], k: number): boolean {
  const n = nums.length;
  const ops = Array.from({ length: n }, () => 0);
  for (let i = 0; i < n; i++) {
    const val = nums[i] - ops[i];
    if (val > 0 && i + k > n) return false;
    if (val < 0) return false;
    for (let j = i; j < i + k && j < n; j++) {
      ops[j] = ops[j] + val;
    }
  }

  return true;
}
```
