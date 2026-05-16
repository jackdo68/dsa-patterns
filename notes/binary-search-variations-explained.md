# Binary Search Variations Explained

Topic: binary search

Difficulty: Medium

Interview Frequency: Medium

### Ideas

## Choosing the Form: `while (left <= right)` vs `while (left < right)`

The two forms answer different questions, so the bounds and exit conditions are designed differently.

| | `<=` form | `<` form |
|---|---|---|
| **What pointers represent** | Valid candidates being checked | Boundary of "still unknown" region |
| **Initial right** | `nums.length - 1` (inclusive) | `nums.length` (exclusive) |
| **How loop ends** | `left > right` — they crossed past each other (no more candidates) | `left === right` — they meet at the answer (boundary collapses) |
| **Pointer movement** | `left = mid + 1`, `right = mid - 1` (skip mid we just checked) | `left = mid + 1`, `right = mid` (don't skip — mid might be the answer) |
| **What you return** | The index where you found the match (or `-1`) | `left` (= `right` after convergence) |
| **Question it answers** | "Is X in the array?" | "Where should X go / first index where condition holds?" |

### The Mental Shift

- **`<=` form:** you're *eliminating* candidates one by one. Both pointers point at valid candidates. Loop ends when they cross because no candidates remain.
- **`<` form:** you're *narrowing toward* the answer. `left` and `right` squeeze the answer from both sides; where they meet IS the answer. That's why we never use `mid - 1` on the answer side — moving past `mid` would skip the very position the pointers are converging to.

### "Right is Exclusive" — what that actually means

- **Initially** `right = nums.length` is genuinely out of bounds — it represents "answer might not exist; insertion goes at the end."
- **During the loop**, when we do `right = mid`, the index `mid` *was* a valid candidate (we just confirmed it satisfies the condition). We move right to mid because we want to keep narrowing — but `mid` is still recorded as a candidate by virtue of where `right` now sits.

### Common Traps

- `right = mid - 1` with `<` form → skips the answer.
- `right = mid` with `<=` form → infinite loop (when `left === right === mid`, `right = mid` doesn't shrink anything).

The two forms are internally consistent systems — pick one and stick with all its parts.

---

## Lower Bound vs Upper Bound (Both use the `<` form)

Both use the same template — only the **condition** changes:

```
left = 0, right = length
while (left < right):
    if condition(mid): right = mid
    else: left = mid + 1
return left
```

- **Lower bound**: find the first index where `arr[mid] >= target`
- **Upper bound**: find the first index where `arr[mid] > target`

**Example: `arr = [1, 3, 3, 3, 5, 7]`, target = 3**

Lower bound → index 1 (first element >= 3)
Upper bound → index 4 (first element > 3)

```
arr:    [1,  3,  3,  3,  5,  7]
index:   0   1   2   3   4   5
              ^           ^
         lowerBound=1   upperBound=4
```

This means: all 3s are in range `[1, 4)` → 3 elements (`upperBound - lowerBound = 3`).

---

### Lower Bound Walkthrough

**"Find the first position where `arr[mid] >= target`"**

Condition: `arr[mid] >= target` → `right = mid` (might be the answer)

```typescript
arr = [1, 3, 3, 3, 5, 7], target = 3

left=0, right=6
  mid=3: arr[3]=3, 3 >= 3? Yes → right=3       [search left half]
left=0, right=3
  mid=1: arr[1]=3, 3 >= 3? Yes → right=1       [search left half]
left=0, right=1
  mid=0: arr[0]=1, 1 >= 3? No  → left=1        [skip, not the answer]
left=1, right=1 → stop. Answer = 1
```

### Upper Bound Walkthrough

**"Find the first position where `arr[mid] > target`"**

Condition: `arr[mid] > target` → `right = mid` (might be the answer)

```typescript
arr = [1, 3, 3, 3, 5, 7], target = 3

left=0, right=6
  mid=3: arr[3]=3, 3 > 3? No  → left=4        [skip, not the answer]
left=4, right=6
  mid=5: arr[5]=7, 7 > 3? Yes → right=5       [search left half]
left=4, right=5
  mid=4: arr[4]=5, 5 > 3? Yes → right=4       [search left half]
left=4, right=4 → stop. Answer = 4
```

---

### The Only Difference

| | Lower Bound | Upper Bound |
|---|---|---|
| Condition | `arr[mid] >= target` | `arr[mid] > target` |
| Finds | First element **>=** target | First element **>** target |
| On duplicates | Lands on the **first** copy | Lands **after** the last copy |

The `=` sign in the condition is the only difference. It decides whether equal values are "the answer" (go left to find earlier ones) or "not the answer yet" (go right to skip past them).

---

### Same Question, Both Approaches

**Question: "Find the range [first, last] of target 3 in a sorted array"**

```typescript
function searchRange(arr: number[], target: number): [number, number] {
  const first = lowerBound(arr, target);    // first index >= target
  const last = upperBound(arr, target) - 1; // first index > target, minus 1

  // Check if target actually exists
  if (first >= arr.length || arr[first] !== target) return [-1, -1];
  return [first, last];
}
```

```typescript
// arr = [1, 3, 3, 3, 5, 7], target = 3
// lowerBound → 1 (first 3)
// upperBound → 4 (first element after all 3s)
// range = [1, 4-1] = [1, 3] ✓
```

### Solution

```typescript
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

function upperBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
```
