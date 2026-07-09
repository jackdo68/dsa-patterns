---
title: "Generate Parentheses"
topic: "backtracking, string, recursion"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 22 - Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**
```
Input: n = 1
Output: ["()"]
```

### Ideas

Use **backtracking** with constraints:
1. We can add `(` if we haven't used all `n` open parentheses
2. We can add `)` only if `close < open` (more opens than closes so far)

This ensures we only generate **valid** combinations, not all 2^(2n) possibilities.

**Key insight:** At any point in a valid sequence, the number of `(` must be >= number of `)`.

### Implementation

**Approach 1: Backtracking (Clean)**

```csharp
public IList<string> GenerateParenthesis(int n) {
    var result = new List<string>();

    void Backtrack(string current, int open, int close) {
        // Base case: used all parentheses
        if (current.Length == 2 * n) {
            result.Add(current);
            return;
        }

        // Can add open paren if we haven't used all n
        if (open < n) {
            Backtrack(current + '(', open + 1, close);
        }

        // Can add close paren if we have more opens than closes
        if (close < open) {
            Backtrack(current + ')', open, close + 1);
        }
    }

    Backtrack("", 0, 0);
    return result;
}
```

**Approach 2: Using array for efficiency**

```csharp
public IList<string> GenerateParenthesis(int n) {
    var result = new List<string>();
    var path = new List<char>();

    void Backtrack(int open, int close) {
        if (path.Count == 2 * n) {
            result.Add(new string(path.ToArray()));
            return;
        }

        if (open < n) {
            path.Add('(');
            Backtrack(open + 1, close);
            path.RemoveAt(path.Count - 1);
        }

        if (close < open) {
            path.Add(')');
            Backtrack(open, close + 1);
            path.RemoveAt(path.Count - 1);
        }
    }

    Backtrack(0, 0);
    return result;
}
```

**Time Complexity:** O(4^n / sqrt(n)) - the nth Catalan number

**Space Complexity:** O(n) - recursion depth

### Visualization

For `n = 2`:

```
                    ""
                    |
                   "("
                 /     \
              "(("      "()"
              /           \
           "(()"         "()(""
            |              |
          "(())"        "()()"
```

### Pattern: Constrained Generation

This pattern applies to problems where you generate sequences with validity constraints:

```csharp
void ConstrainedBacktrack(choices, constraints, path, result) {
    if (IsComplete(path)) {
        result.Add(path.Copy());
        return;
    }

    foreach (var choice in choices) {
        if (IsValid(choice, constraints)) {
            path.Add(choice);
            UpdateConstraints(constraints);
            ConstrainedBacktrack(choices, constraints, path, result);
            path.Remove();
            RevertConstraints(constraints);
        }
    }
}
```

### Related Problems

| Problem | Constraint |
|---------|------------|
| Generate Parentheses | `close <= open <= n` |
| Letter Combinations | Valid phone mapping |
| Valid Sudoku | Row, col, box constraints |
| N-Queens | No queens attack |

### Variant: Different Bracket Types

Generate valid combinations with `()`, `[]`, `{}`:

```csharp
public IList<string> GenerateBrackets(int n) {
    var result = new List<string>();
    string[] brackets = { "()", "[]", "{}" };
    var stack = new Stack<char>();

    void Backtrack(string path) {
        if (path.Length == 2 * n) {
            if (stack.Count == 0) result.Add(path);
            return;
        }

        // Try opening any bracket
        foreach (string b in brackets) {
            char open = b[0], close = b[1];
            stack.Push(close);
            Backtrack(path + open);
            stack.Pop();
        }

        // Try closing if the stack has a matching bracket
        if (stack.Count > 0) {
            char close = stack.Pop();
            Backtrack(path + close);
            stack.Push(close);
        }
    }

    Backtrack("");
    return result;
}
```
