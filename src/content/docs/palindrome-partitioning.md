---
title: "Palindrome Partitioning"
topic: "backtracking, dfs"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 131 - Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

*Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of `s`.*

*Example 1:*

```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

### Solution

```csharp
public IList<IList<string>> Partition(string s) {
    bool IsPalindrome(string str) {
        int i = 0;
        int j = str.Length - 1;
        while (i < j) {
            if (str[i] != str[j]) return false;
            i++;
            j--;
        }
        return true;
    }
    var part = new List<string>();
    var result = new List<IList<string>>();
    void Dfs(int index) {
        if (index == s.Length) result.Add(new List<string>(part));
        for (int i = index + 1; i <= s.Length; i++) {
            string str = s.Substring(index, i - index);
            if (IsPalindrome(str)) {
                part.Add(str);
                Dfs(i);
                part.RemoveAt(part.Count - 1);
            }
        }
    }
    Dfs(0);

    return result;
}
```