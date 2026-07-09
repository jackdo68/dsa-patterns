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

```csharp
public bool CanJump(int[] nums) {
    int lastGoodPosition = nums.Length - 1;
    for (int i = nums.Length - 2; i >= 0; i--) {
        if (i + nums[i] >= lastGoodPosition) {
            lastGoodPosition = i;
        }
    }
    return lastGoodPosition == 0;
}
```

Dynamic programming with memoization approach

```csharp
public bool CanJump(int[] nums) {
    int last = nums.Length - 1;
    bool?[] memo = new bool?[nums.Length]; // null = not computed yet

    bool Jump(int index) {
        // reach the last pos
        if (index == last) return true;
        if (memo[index] is bool cached) return cached; // return cached result
        if (nums[index] == 0) return (memo[index] = false).Value;
        // jump based on the value
        int steps = nums[index];
        for (int i = 1; i <= steps; i++) {
            if (Jump(index + i)) {
                return (memo[index] = true).Value;
            }
        }
        return (memo[index] = false).Value;
    }

    return Jump(0);
}
```