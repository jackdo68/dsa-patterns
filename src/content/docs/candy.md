---
title: "Candy"
topic: "greedy"
difficulty: "Hard"
frequency: "Medium"
---
### Question

[LeetCode 135 - Candy](https://leetcode.com/problems/candy/)

*There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.*

*You are giving candies to these children subjected to the following requirements:*

- *Each child must have at least one candy.*
- *Children with a higher rating get more candies than their neighbors.*

*Return the minimum number of candies you need to have to distribute the candies to the children.*

*Example 1:*

```
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```

### Ideas

- We need 2 passes, 1 from left, 1 from right
- if a child has a rating higher than its neighbor, we increment its candy
- the final result is the max of the value from left and from right (since this is the minimum value)
- `travelFromLeft` and `travelFromRight` represents the minimum number of candies required if we only look at the neighbors from `left` and `right` respectively

### Solution

```csharp
public int Candy(int[] ratings) {
    int n = ratings.Length;
    int[] travelFromLeft = new int[n];
    int[] travelFromRight = new int[n];
    Array.Fill(travelFromLeft, 1);  // min 1 candy
    Array.Fill(travelFromRight, 1); // min 1 candy
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) travelFromLeft[i] = travelFromLeft[i - 1] + 1;
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) travelFromRight[i] = travelFromRight[i + 1] + 1;
    }
    int res = 0;
    for (int i = 0; i < n; i++) {
        // need the maximum to satisfy both neighbors
        res += Math.Max(travelFromLeft[i], travelFromRight[i]);
    }
    return res;
}
```