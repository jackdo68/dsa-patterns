---
title: "Container With Most Water"
topic: "array, two-pointer, greedy"
difficulty: "Medium"
frequency: "High"
---
### Question

[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.

Find two lines that, together with the x-axis, form a container that holds the most water. Return the maximum amount of water the container can store.

**Note:** You may not slant the container.

**Example:**

```
Input:  height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The lines at index 1 (height 8) and index 8 (height 7)
form a container holding min(8,7) * (8 - 1) = 7 * 7 = 49.
```

### Ideas

- Place 2 pointers one at the start and one at the end of the array
- Iteratively shrink the distance between them and keep track of the max area
- Move the pointer with the shorter height, which will increase the chance to get a taller height → increase the area given the width got decreased
- **Time complexity:** O(n)

### Solution

```csharp
public int MaxArea(int[] height) {
    int left = 0;
    int right = height.Length - 1;
    int maxArea = 0;
    while (left < right) {
        int currentArea = Math.Min(height[left], height[right]) * (right - left);
        maxArea = Math.Max(maxArea, currentArea);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}
```