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

```typescript
function partition(s: string): string[][] {
  function isPalindrome(str: string): boolean {
    let i = 0;
    let j = str.length - 1;
    while (i < j) {
      if (str[i] !== str[j]) return false;
      i++;
      j--;
    }
    return true;
  }
  const part: string[] = [];
  const result: string[][] = [];
  function dfs(index: number) {
    if (index === s.length) result.push([...part]);
    for (let i = index + 1; i <= s.length; i++) {
      const str = s.slice(index, i);
      if (isPalindrome(str)) {
        part.push(str);
        dfs(i);
        part.pop();
      }
    }
  }
  dfs(0);

  return result;
}

```