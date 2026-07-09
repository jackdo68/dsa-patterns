---
title: "Group Anagrams"
topic: "array, hash map, string"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 49 - Group Anagrams](https://leetcode.com/problems/group-anagrams/)

*Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.*

*An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.*
### Ideas

Two strings are anagrams if they have the same characters in the same frequency. Use a sorted version of each string as a hash map key — all anagrams will sort to the same string. Group strings by their sorted key.

Alternatively, use a character frequency count as the key (e.g., `"1a2b0c..."`) to avoid the O(k log k) sorting cost per string, achieving O(k) per string where k is the string length.

### Solution

```csharp
public IList<IList<string>> GroupAnagrams(string[] strs) {
    var map = new Dictionary<string, IList<string>>();

    foreach (string str in strs) {
        var chars = str.ToCharArray();
        Array.Sort(chars);
        string key = new string(chars);
        if (!map.ContainsKey(key)) {
            map[key] = new List<string>();
        }
        map[key].Add(str);
    }

    return map.Values.ToList();
}
```
