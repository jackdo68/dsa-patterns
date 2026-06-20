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

```tsx
function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    function backtrack(current: string, open: number, close: number): void {
        // Base case: used all parentheses
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // Can add open paren if we haven't used all n
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }

        // Can add close paren if we have more opens than closes
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}
```

**Approach 2: Using array for efficiency**

```tsx
function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    const path: string[] = [];

    function backtrack(open: number, close: number): void {
        if (path.length === 2 * n) {
            result.push(path.join(''));
            return;
        }

        if (open < n) {
            path.push('(');
            backtrack(open + 1, close);
            path.pop();
        }

        if (close < open) {
            path.push(')');
            backtrack(open, close + 1);
            path.pop();
        }
    }

    backtrack(0, 0);
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

```tsx
function constrainedBacktrack(choices, constraints, path, result) {
    if (isComplete(path)) {
        result.push(path.copy());
        return;
    }

    for (choice of choices) {
        if (isValid(choice, constraints)) {
            path.add(choice);
            updateConstraints(constraints);
            constrainedBacktrack(choices, constraints, path, result);
            path.remove();
            revertConstraints(constraints);
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

```tsx
function generateBrackets(n: number): string[] {
    const result: string[] = [];
    const brackets = ['()', '[]', '{}'];
    const stack: string[] = [];

    function backtrack(path: string): void {
        if (path.length === 2 * n) {
            if (stack.length === 0) result.push(path);
            return;
        }

        // Try opening any bracket
        for (const [open, close] of brackets.map(b => [b[0], b[1]])) {
            stack.push(close);
            backtrack(path + open);
            stack.pop();
        }

        // Try closing if stack has matching bracket
        if (stack.length > 0) {
            const close = stack.pop()!;
            backtrack(path + close);
            stack.push(close);
        }
    }

    backtrack('');
    return result;
}
```
