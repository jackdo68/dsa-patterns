---
title: "0/1 Knapsack - Partition Equal Subset Sum - Bottom up approach"
topic: "dynamic programming, knapsack"
difficulty: "Medium"
frequency: "Medium"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 416 - Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

*Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise. e.g* 

```
Input: nums = [1,5,11,5]
Output: true
```

### Ideas

**1. Reduce the problem:**
- If two subsets have equal sum, each must sum to `total / 2`
- So the real question becomes: "can we find a subset that sums to `total / 2`?"
- If `total` is odd, return false immediately

**2. Recognize the pattern:**
- Each number is either included or excluded — this is 0/1 knapsack
- We need to track which sums are achievable as we process numbers one by one
- A DP array (or map) serves as a lookup: `dp[i]` = "can we make sum `i` from the numbers seen so far?"
- This is the memoization step — instead of recomputing subset sums from scratch, we build up achievable sums incrementally

**3. Derive the recurrence:**
- For each new number, ask: "can I make sum `i`?"
- Only two possibilities: we could already make `i` without this number (`dp[i]`), or we could make `i - num` and add this number to reach `i` (`dp[i - num]`)
- So: `dp[i] = dp[i] || dp[i - num]`

**4. Iteration direction matters:**
- Iterate sums **backward** (from `target` down to `num`) to ensure each number is used at most once
- Forward iteration would let a number update `dp[j]`, then that updated value gets read again at `dp[j + num]`, effectively using the same number twice

**Walkthrough with `nums = [1, 5, 11, 5]`, target = 11:**

```
Start:     dp = [T, F, F, F, F, F, F, F, F, F, F, F]
                 0  1  2  3  4  5  6  7  8  9  10 11

num = 1:   i=11: dp[11] = dp[11] || dp[10] = F
           i=10: dp[10] = dp[10] || dp[9]  = F
           ...
           i=1:  dp[1]  = dp[1]  || dp[0]  = T  ✓
           dp = [T, T, F, F, F, F, F, F, F, F, F, F]

num = 5:   i=11: dp[11] = dp[11] || dp[6]  = F
           i=6:  dp[6]  = dp[6]  || dp[1]  = T  ✓
           i=5:  dp[5]  = dp[5]  || dp[0]  = T  ✓
           dp = [T, T, F, F, F, T, T, F, F, F, F, F]

num = 11:  i=11: dp[11] = dp[11] || dp[0]  = T  ✓
           dp = [T, T, F, F, F, T, T, F, F, F, F, T]

dp[11] = true → we can partition!
```

**Why backward? Forward iteration bug:**

Say `nums = [2, 3]`, target = 4. Possible subset sums are: 0, 2, 3, 5. So `dp[4]` should be false — there's no subset that sums to 4.

```
Forward (WRONG):
Start: dp = [T, F, F, F, F]
             0  1  2  3  4

num = 2:  i=2: dp[2] = dp[2] || dp[0] = T  ✓
          i=3: dp[3] = dp[3] || dp[1] = F
          i=4: dp[4] = dp[4] || dp[2] = T  ✗ BUG!
```

At `i=4`, we check `dp[2]` — but `dp[2]` was just set to true earlier in this same loop. So it thinks "I can make 2, then add another 2 to get 4." But we only have one 2! Forward iteration used it twice.

```
Backward (CORRECT):
num = 2:  i=4: dp[4] = dp[4] || dp[2] = F  ✓  (dp[2] still false — untouched)
          i=3: dp[3] = dp[3] || dp[1] = F
          i=2: dp[2] = dp[2] || dp[0] = T  ✓

num = 3:  i=4: dp[4] = dp[4] || dp[1] = F  ✓
          i=3: dp[3] = dp[3] || dp[0] = T  ✓
          dp = [T, F, T, T, F]

dp[4] = false → correct, no subset sums to 4
```

By going backward, when we check `dp[i - num]` it still reflects the state *before* the current number was included — so each number can only be used once

### Solution

```typescript
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);

  // If sum is odd, we can't partition equally
  if (sum % 2 !== 0) return false;

  const target = sum / 2;

  // dp[i] represents if we can get sum i from the array
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // Empty subset sums to 0

  for (const num of nums) {
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[target];
}
```

### Solution (Top-down)

```typescript
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const memo = new Map<string, boolean>();

  function dfs(i: number, remaining: number): boolean {
    if (remaining === 0) return true;
    if (i === nums.length || remaining < 0) return false;

    const key = `${i},${remaining}`;
    if (memo.has(key)) return memo.get(key)!;

    const result = dfs(i + 1, remaining - nums[i]) || dfs(i + 1, remaining);
    memo.set(key, result);
    return result;
  }

  return dfs(0, target);
}
```