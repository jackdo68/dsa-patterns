---
title: "String Reversal - Reverse String in place"
topic: "string, two pointer"
difficulty: "Easy"
frequency: "Low"
---
### Question

[LeetCode 344 - Reverse String](https://leetcode.com/problems/reverse-string/)

*Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) with `O(1)` extra memory.*

### Solution

```csharp
public void ReverseString(char[] s) {
    int i = 0;
    int j = s.Length - 1;
    while (i < j) {
        (s[i], s[j]) = (s[j], s[i]);
        i++;
        j--;
    }
}
```