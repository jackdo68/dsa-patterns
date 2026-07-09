---
title: "Expression Evaluation - Basic Calculator"
topic: "stack"
difficulty: "Hard"
frequency: "Low"
---
### Question

[LeetCode 224 - Basic Calculator](https://leetcode.com/problems/basic-calculator/)

*Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.*

***Note:** You are **not** allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.*

*Example:*

```
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23

```

*Constraints:*

- *`1 <= s.length <= 3 * 105`*
- *`s` consists of digits, `'+'`, `'-'`, `'('`, `')'`, and `' '`.*
- *`s` represents a valid expression.*
- *`'+'` is **not** used as a unary operation (i.e., `"+1"` and `"+(2 + 3)"` is invalid).*
- *`'-'` could be used as a unary operation (i.e., `"-1"` and `"-(2 + 3)"` is valid).*
- *There will be no two consecutive operators in the input.*
- *Every number and running calculation will fit in a signed 32-bit integer.*

### Solution

```csharp
public int Calculate(string s) {
    var stack = new Stack<int>();

    int res = 0;
    int sign = 1;
    int num = 0;

    foreach (char c in s) {
        if (char.IsDigit(c)) {
            num = num * 10 + (c - '0'); // build up the number
        } else if (c == '+' || c == '-') {
            res += sign * num; // calculate the result up to this number
            num = 0; // reset
            sign = c == '+' ? 1 : -1;
        } else if (c == '(') {
            stack.Push(res);
            stack.Push(sign);
            res = 0;
            sign = 1;
        } else if (c == ')') {
            res += sign * num; // complete the expression with current number
            num = res; // the expression inside the bracket becomes a number
            sign = stack.Pop(); // restore previous sign
            res = stack.Pop(); // restore previous result
        } else {
            // space
            continue;
        }
    }
    res += sign * num; // last number
    return res;
}
```