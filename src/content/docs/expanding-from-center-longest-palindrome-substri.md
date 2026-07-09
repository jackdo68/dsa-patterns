---
title: "Expanding from Center - Longest Palindrome Substring"
topic: "string, two pointer"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 5 - Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

*Given a string `s`, return the longest palindromic substring in `s`.*

### Ideas

A palindrome mirrors around its center. Instead of checking all substrings (O(n³)), we can expand outward from each possible center (O(n²)).

Key insight: there are `2n - 1` centers (not `n`):
- `n` single-character centers for odd-length palindromes: `"aba"` centers on `b`
- `n - 1` between-character centers for even-length palindromes: `"abba"` centers between `bb`

For each center, expand outward while characters match. Track the longest palindrome found.

**Time Complexity:** O(n²) - each expansion can take O(n)
**Space Complexity:** O(1) - only storing pointers

### Solution

```csharp
public string LongestPalindrome(string s) {
    int n = s.Length;

    string Expand(int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            l--;
            r++;
        }
        // characters from l+1 up to r-1 form the palindrome
        return s.Substring(l + 1, r - l - 1);
    }

    string result = s.Substring(0, 1); // first char
    string temp;
    for (int i = 0; i < n; i++) {
        temp = Expand(i, i);
        if (temp.Length > result.Length) result = temp;
        temp = Expand(i, i + 1);
        if (temp.Length > result.Length) result = temp;
    }
    return result;
}
```