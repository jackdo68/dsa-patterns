---
title: "Jump Game"
topic: "greedy"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 55 - Jump Game](https://leetcode.com/problems/jump-game/)

*You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.*

*Return `true` if you can reach the last index, or `false` otherwise.*

*Example 1:*

```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

### Ideas

1. **Key Idea**: Instead of trying all possible jumps (like in the DP solution), we work backwards and keep track of the leftmost position that can reach the end.
2. **Algorithm Steps**:
    - Start from the second-to-last index
    - For each position, check if we can reach the `lastGoodPosition`
    - If we can reach it, mark current position as new `lastGoodPosition`
    - At the end, check if we can reach the start (index 0)

### Solution

Greedy approach

```typescript
function canJump(nums: number[]): boolean {
    let lastGoodPosition = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= lastGoodPosition) {
            lastGoodPosition = i;
        }
    }
    return lastGoodPosition === 0;
}
```

Dynamic programming with memoization approach

```typescript
function canJump(nums: number[]): boolean {
  const last = nums.length - 1;
  const memo: boolean[] = new Array(nums.length).fill(undefined);
  const jump = (index: number): boolean => {
    // reach to the last pos
    if (index === last) return true;
    if (memo[index] !== undefined) return memo[index]; // Return cached result
    if (nums[index] === 0) return (memo[index] = false);
    // jump base on the value
    const steps = nums[index];
    for (let i = 1; i <= steps; i++) {
      if (jump(index + i)) {
        return (memo[index] = true);
      }
    }
    return (memo[index] = false);
  };
  return jump(0);
}
```