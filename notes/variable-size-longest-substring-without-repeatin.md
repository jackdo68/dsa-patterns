# Variable Size - Longest Substring Without Repeating Characters

Topic: sliding window, string

Difficulty: Medium

Interview Frequency: High

### Question

[LeetCode 3 - Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

*Given a string `s`, find the length of the **longest** **substring** without duplicate characters.*

### Ideas

**Instinct: "longest/shortest subarray/substring" → sliding window.** The question asks for the longest *contiguous* sequence satisfying a condition. Contiguous + optimize length is the classic signal for sliding window — you're not picking elements freely, you're expanding and contracting a range.

**Instinct: variable window when the valid size isn't known upfront.** Unlike fixed-size problems where you know the window length, here the valid length depends on the content. So the window grows by default (expand `r`) and only shrinks when it becomes invalid (a duplicate appears).

**Instinct: need O(1) duplicate detection → set.** You need to know instantly whether the incoming character already exists in the window. A set gives you that. When a duplicate is found, shrink from the left until the window is valid again — then continue expanding.

Track `max` after each valid expansion.

### Solution

```typescript
function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let l = 0;
  let r = 0;
  let max = 0;
  while (r < s.length) {
    while (set.has(s[r])) {
      set.delete(s[l]);
      l++;
    }
    set.add(s[r]);
    r++;
    max = Math.max(max, set.size);
  }
  return max;
}
```