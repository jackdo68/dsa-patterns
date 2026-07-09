---
title: "Variable Size - Longest Substring Without Repeating Characters"
topic: "sliding window, string"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 3 - Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

*Given a string `s`, find the length of the **longest** **substring** without duplicate characters.*

### Ideas

**Instinct: "longest/shortest subarray/substring" → sliding window.** The question asks for the longest *contiguous* sequence satisfying a condition. Contiguous + optimize length is the classic signal for sliding window — you're not picking elements freely, you're expanding and contracting a range.

**Instinct: variable window when the valid size isn't known upfront.** Unlike fixed-size problems where you know the window length, here the valid length depends on the content. So the window grows by default (expand `r`) and only shrinks when it becomes invalid (a duplicate appears).

**Instinct: need O(1) duplicate detection → set.** You need to know instantly whether the incoming character already exists in the window. A set gives you that. When a duplicate is found, shrink from the left until the window is valid again — then continue expanding.

Track `max` after each valid expansion.

### Solution

```csharp
public int LengthOfLongestSubstring(string s) {
    var set = new HashSet<char>();
    int l = 0;
    int r = 0;
    int max = 0;
    while (r < s.Length) {
        while (set.Contains(s[r])) {
            set.Remove(s[l]);
            l++;
        }
        set.Add(s[r]);
        r++;
        max = Math.Max(max, set.Count);
    }
    return max;
}
```