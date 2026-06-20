---
title: "Container With Most Water"
topic: "array, two-pointer, greedy"
difficulty: "Medium"
frequency: "High"
---
### Ideas

- Place 2 pointers one at the start and one at the end of the array
- Iteratively shrink the distance between them and keep track of the max area
- Move the pointer with the shorter height, which will increase the chance to get a taller height → increase the area given the width got decreased
- **Time complexity:** O(n)

### Solution

```typescript
function containerWithMostWater(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const currentArea = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, currentArea);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}
```