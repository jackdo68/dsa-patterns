---
title: "Valid Parentheses"
topic: "string"
difficulty: "Easy"
frequency: "High"
---
### Question

[LeetCode 20 - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

*Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.*

*An input string is valid if:*

1. *Open brackets must be closed by the same type of brackets.*
2. *Open brackets must be closed in the correct order.*
3. *Every close bracket has a corresponding open bracket of the same type.*

### Solution

```csharp
public bool IsValid(string s) {
    if (s.Length == 1) return false;
    var map = new Dictionary<char, char> {
        [')'] = '(',
        [']'] = '[',
        ['}'] = '{'
    };
    var stack = new Stack<char>();
    foreach (char c in s) {
        // It's a closing bracket
        if (map.ContainsKey(c)) {
            if (stack.Count == 0 || stack.Peek() != map[c]) {
                return false;
            }
            stack.Pop();
        } else {
            // It's an opening bracket
            stack.Push(c);
        }
    }

    return stack.Count == 0;
}
```