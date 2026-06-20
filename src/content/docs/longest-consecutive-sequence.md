---
title: "Longest Consecutive Sequence"
topic: "array, hash map"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 128 - Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

*Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.*

*You must write an algorithm that runs in O(n) time.*
### Ideas

The brute force is: for each number, count how long a consecutive sequence it belongs to. But this is O(n²) because you might count from every element redundantly (e.g. if you have `[1,2,3,4]`, counting from `3` repeats work already done from `1`).

The trick: **only start counting from the beginning of a sequence**. A number is the start of a sequence if `num - 1` does NOT exist in the array. This way, each sequence is counted exactly once.

Step by step with `nums = [100, 4, 200, 1, 3, 2]`:

1. Put all numbers in a Set: `{100, 4, 200, 1, 3, 2}`
2. Iterate through each number:
   - `100`: is `99` in the set? No → this is a sequence start. Count up: `101`? No. Streak = 1.
   - `4`: is `3` in the set? **Yes** → skip (4 is not a start, it's in the middle of a sequence)
   - `200`: is `199` in the set? No → sequence start. Count up: `201`? No. Streak = 1.
   - `1`: is `0` in the set? No → sequence start. Count up: `2`? Yes. `3`? Yes. `4`? Yes. `5`? No. Streak = 4.
   - `3`: is `2` in the set? **Yes** → skip
   - `2`: is `1` in the set? **Yes** → skip
3. Longest streak = 4

**Why this is O(n):** Even though there's a while loop inside the for loop, each number is only counted in the inner while loop once (as part of its sequence). Numbers that aren't sequence starts are skipped immediately. So total work across all iterations is O(n).

### Solution

```typescript
function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      longest = Math.max(longest, currentStreak);
    }
  }

  return longest;
}
```
