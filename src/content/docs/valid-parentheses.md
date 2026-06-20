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

```typescript
function isValid(s: string): boolean {
  if (s.length === 1) return false;
  const map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"]
  ]);
  const stack: string[] = [];
  for (const char of s) {
    // It's a closing bracket
    if (map.has(char)) {
      if (stack.length === 0 || stack[stack.length - 1] !== map.get(char)) {
        return false;
      }
      stack.pop();
    } else {
      // It's an opening bracket
      stack.push(char);
    }
  }

  return stack.length === 0;
}
```