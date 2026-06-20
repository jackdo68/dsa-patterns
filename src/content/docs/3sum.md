---
title: "3Sum"
topic: "array, two-pointer, sorting"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 15 - 3Sum](https://leetcode.com/problems/3sum/)

*Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.*

*Notice that the solution set must not contain duplicate triplets.*
### Ideas

**Instinct: reduce unknowns.** Three unknowns is hard to search efficiently. Fix one (`nums[i]`), and the problem collapses to "find two numbers that sum to `-nums[i]`" — a problem you already know how to solve in O(n).

**Instinct: sort when you need direction.** Two pointers work by moving toward the answer: sum too big → shrink right, sum too small → grow left. That only works if the array has order. Sorting is the move whenever you want to use a value's magnitude to guide a search.

**Instinct: sort to kill duplicates cheaply.** The result must have no duplicate triplets, but the input can have repeats. Without sorting you'd need a hash set. After sorting, duplicates are adjacent — skip them with a single neighbor check.

For each `nums[i]`, run two pointers on the rest to find pairs summing to `-nums[i]`. Skip `nums[i]` if it repeats the previous. Once `nums[i] > 0`, break — no triplet can sum to 0 from here. After a valid triplet, skip duplicate `left` and `right` values before continuing.

### Solution

```typescript
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const result: number[][] = [];

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;
    const target = 0 - nums[i];
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      if (nums[left] + nums[right] === target) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        right--;
        left++;
      } else {
        nums[left] + nums[right] > target ? right-- : left++;
      }
    }
  }

  return result;
}
```
