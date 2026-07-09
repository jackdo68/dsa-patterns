---
title: "Fixed Size - Find all anagrams in a string"
topic: "sliding window, string"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 438 - Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

*Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in **any order**.*

### Ideas

**Instinct: fixed target size → fixed window.** An anagram is just a rearrangement — same characters, same counts. The moment you notice the target has a fixed length, that's the signal: you don't need to search all substrings of every length, only substrings of exactly `p.length`. Fixed size = fixed window.

**Instinct: equality of sets → frequency map comparison.** Two strings are anagrams when their character frequencies match. So instead of sorting every window (O(k log k) each), maintain a running frequency map and compare it against `p`'s map in O(1) — slide in the new character on the right, slide out the old character on the left.

**Instinct: shrink before checking.** Add the right character first, then if the window is too big, evict the leftmost character. Only after the window is exactly `p.length` do you check for a match. This keeps the logic one clean pass with no edge cases.

### Solution

```csharp
public IList<int> FindAnagrams(string s, string p) {
    bool IsAnagram(Dictionary<char, int> m1, Dictionary<char, int> m2) {
        foreach (var k in m1.Keys) {
            if (!m2.TryGetValue(k, out int v) || v != m1[k]) return false;
        }
        return true;
    }
    var res = new List<int>();
    if (s.Length < p.Length) return res;

    var pMap = new Dictionary<char, int>();
    foreach (char c in p) {
        pMap[c] = pMap.GetValueOrDefault(c, 0) + 1;
    }

    var sMap = new Dictionary<char, int>();
    int left = 0;
    int right = 0;
    while (right < s.Length) {
        char c = s[right];
        sMap[c] = sMap.GetValueOrDefault(c, 0) + 1;

        if (right - left + 1 > p.Length) {
            sMap[s[left]]--;
            if (sMap[s[left]] == 0) sMap.Remove(s[left]);
            left++;
        }

        if (right - left + 1 == p.Length && IsAnagram(sMap, pMap)) res.Add(left);

        right++;
    }
    return res;
}
```