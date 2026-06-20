---
title: "Min Stack"
topic: "stack, design"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 155 - Min Stack](https://leetcode.com/problems/min-stack/)

*Design a stack that supports push, pop, top, and retrieving the minimum element in **constant time**.*

Implement the `MinStack` class:
- `push(val)` pushes the element val onto the stack.
- `pop()` removes the element on the top of the stack.
- `top()` gets the top element of the stack.
- `getMin()` retrieves the minimum element in the stack.

### Ideas

**The problem with a single `min` variable:**

If you just track `min = 1`, what happens when you pop `1`? You'd need to know the previous minimum — but a regular stack doesn't remember history.

**The solution: a second stack that records "what was the minimum at this point in time"**

Every time you push a value, you also push the current minimum onto a parallel `minStack`. When you pop, you pop from both. The top of `minStack` always tells you the minimum of the current stack state.

Step by step:

```
push(5):  stack = [5]       minStack = [5]       ← min is 5
push(3):  stack = [5,3]     minStack = [5,3]     ← min is 3
push(7):  stack = [5,3,7]   minStack = [5,3,3]   ← min is still 3
push(1):  stack = [5,3,7,1] minStack = [5,3,3,1] ← min is 1
pop():    stack = [5,3,7]   minStack = [5,3,3]   ← min goes back to 3
pop():    stack = [5,3]     minStack = [5,3]     ← min is still 3
pop():    stack = [5]       minStack = [5]       ← min goes back to 5
```

The `minStack` is like a snapshot history — each entry says "given everything below me in the stack, what's the smallest value?" When you pop, you discard the current snapshot, and the previous one is automatically correct because it was computed before the popped element existed.

### Solution

```typescript
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
```
