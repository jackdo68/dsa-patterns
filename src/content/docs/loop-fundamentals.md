---
title: "Loop Fundamentals - While vs For"
topic: "fundamentals"
---
### When to Use For Loop

Use `for` when:
- You know the number of iterations upfront
- You're iterating through an entire array/string sequentially
- Index moves predictably (usually `i++`)

```csharp
// Iterating entire array
for (int i = 0; i < arr.Length; i++) { ... }

// Using foreach
foreach (var item in arr) { ... }
```

### When to Use While Loop

Use `while` when:
- You don't know when to stop (condition-based termination)
- Index moves unpredictably (might skip, might stay)
- Multiple pointers moving at different rates

```csharp
// Skipping whitespace - don't know how many
while (i < n && s[i] == ' ') i++;

// Two pointers moving differently
while (left < right) { ... }

// Reading until condition fails
while (i < n && s[i] >= '0' && s[i] <= '9') { ... }
```

### Quick Rule

- **For**: "Do this N times" or "Go through everything"
- **While**: "Keep going until X happens"
