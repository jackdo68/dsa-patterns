---
title: "Two Sum"
topic: "array, hash map"
difficulty: "Easy"
frequency: "High"
---
### Question

[LeetCode 1 - Two Sum](https://leetcode.com/problems/two-sum/)

*Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.*

*You may assume that each input would have **exactly one solution**, and you may not use the same element twice.*
### Ideas

Use a hash map to store each number's index as you iterate. For each element, check if `target - nums[i]` already exists in the map. If it does, you've found the pair. This gives O(n) time instead of the brute-force O(n²) approach.

The key insight is that for any pair `(a, b)` where `a + b = target`, when you reach `b` in the array, `a` will already be in the map (since you process elements left to right).

### Solution

```typescript
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }

  return [];
}
```
