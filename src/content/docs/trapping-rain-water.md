---
title: "Trapping Rain Water"
topic: "array, two-pointer"
difficulty: "Hard"
frequency: "High"
---
### Question

[LeetCode 42 - Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

*Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.*
### Ideas

Water at any position is determined by `min(maxLeft, maxRight) - height[i]`. The key insight is that you don't need to know both maximums to compute water at a position — you only need to know which side is the bottleneck.

Use two pointers from both ends, tracking `leftMax` and `rightMax`:
- If `leftMax < rightMax`, the left side is the bottleneck. Water at `left` is `leftMax - height[left]` regardless of what's further right (since `rightMax` is already higher).
- If `rightMax <= leftMax`, the right side is the bottleneck. Same logic applies.

This works because we process the side with the smaller max first — guaranteeing the other side has at least that height somewhere.

### Solution

```typescript
function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;
}
```
