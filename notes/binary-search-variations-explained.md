# Binary Search Variations Explained

Topic: binary search

Difficulty: Medium

Interview Frequency: Medium

### Ideas

## The One Form You Need to Memorize

Every binary search problem reduces to: **"find the first index where some predicate is true."** This single template handles every case.

```typescript
function binarySearch(nums: number[], predicate: (i: number) => boolean): number {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (predicate(mid)) {
      right = mid;        // mid might be the answer — keep it in range
    } else {
      left = mid + 1;     // mid is not the answer — exclude it
    }
  }
  return left;            // first index where predicate is true (or n if none)
}
```

**Why it works:** every binary search problem has an underlying *monotonic* property — there's a boundary where things flip from "no" to "yes." This template finds that boundary. Whatever the problem asks, you reframe it as "where does the boundary sit?" and post-process if needed.

---

## How the Form Works (Mental Model)

- **Search space:** `[left, right)` — left inclusive, right exclusive.
- **Initial state:** `right = nums.length` — out of bounds, representing "no valid answer found yet; insertion would go at the end."
- **Loop ends** when `left === right` — the pointers converge ON the answer.
- **`right = mid`:** `mid` was a valid candidate (predicate true), so we keep it in range by moving `right` to it.
- **`left = mid + 1`:** `mid` was NOT a valid candidate, so we exclude it.

**Key trap:** never write `right = mid - 1` in this form — it skips the very position the pointers are converging to.

---

## Applying It to Every Scenario

### 1. Exact Match — "Is X in the array?"

Reframe as: "Find the first index where `nums[i] >= X`. Then check if it equals X."

```typescript
function search(nums: number[], target: number): number {
  let left = 0, right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) right = mid;
    else left = mid + 1;
  }
  if (left === nums.length || nums[left] !== target) return -1;
  return left;
}
```

### 2. First Occurrence — "First index where `nums[i] === X`"

Same as exact match — `lowerBound` naturally lands on the first copy.

```typescript
// predicate: nums[i] >= target
// returns: first index where nums[i] === target, or -1
```

### 3. Last Occurrence — "Last index where `nums[i] === X`"

Reframe as: "Find first index where `nums[i] > X`, then subtract 1."

```typescript
function findLast(nums: number[], target: number): number {
  let left = 0, right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) right = mid;
    else left = mid + 1;
  }
  // left is now the first index > target
  if (left === 0 || nums[left - 1] !== target) return -1;
  return left - 1;
}
```

### 4. Insertion Position — "Where should X go to keep array sorted?"

Direct lowerBound — no post-processing needed.

```typescript
// predicate: nums[i] >= target
// returns: index where target should be inserted (could be nums.length)
```

### 5. Range of Target — "Find [first, last] indices of X"

Combine lowerBound and upperBound.

```typescript
function searchRange(nums: number[], target: number): [number, number] {
  const first = lowerBound(nums, target);    // first index >= target
  const last = upperBound(nums, target) - 1; // first index > target, minus 1
  if (first >= nums.length || nums[first] !== target) return [-1, -1];
  return [first, last];
}
```

### 6. Binary Search on Answer — "Smallest valid value"

Used when the answer isn't an array index but a *value* (e.g., minimum capacity, smallest divisor). The predicate becomes a feasibility check.

```typescript
// predicate: isFeasible(value)
// search space: [minPossible, maxPossible + 1)
function smallestValid(lo: number, hi: number, isFeasible: (v: number) => boolean): number {
  let left = lo, right = hi + 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (isFeasible(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}
```

### 7. First True in Monotonic Boolean — "Where does false flip to true?"

The most direct application — predicate is the boolean check itself.

```typescript
// predicate: isTrue(i)
// returns: first index where predicate is true
```

---

## Lower Bound vs Upper Bound

Both use the universal form — only the **predicate** differs.

| | Lower Bound | Upper Bound |
|---|---|---|
| Predicate | `nums[mid] >= target` | `nums[mid] > target` |
| Finds | First element **>=** target | First element **>** target |
| On duplicates | Lands on the **first** copy | Lands **after** the last copy |

The `=` sign in the predicate is the only difference. It decides whether equal values are "the answer" (go left to find earlier ones) or "not the answer yet" (go right to skip past them).

### Walkthrough — Lower Bound

`arr = [1, 3, 3, 3, 5, 7]`, target = 3

```
left=0, right=6
  mid=3: arr[3]=3, 3 >= 3? Yes → right=3       [search left half]
left=0, right=3
  mid=1: arr[1]=3, 3 >= 3? Yes → right=1       [search left half]
left=0, right=1
  mid=0: arr[0]=1, 1 >= 3? No  → left=1        [skip, not the answer]
left=1, right=1 → stop. Answer = 1 ✓
```

### Walkthrough — Upper Bound

`arr = [1, 3, 3, 3, 5, 7]`, target = 3

```
left=0, right=6
  mid=3: arr[3]=3, 3 > 3? No  → left=4         [skip, not the answer]
left=4, right=6
  mid=5: arr[5]=7, 7 > 3? Yes → right=5        [search left half]
left=4, right=5
  mid=4: arr[4]=5, 5 > 3? Yes → right=4        [search left half]
left=4, right=4 → stop. Answer = 4 ✓
```

Visualization:
```
arr:    [1,  3,  3,  3,  5,  7]
index:   0   1   2   3   4   5
              ^           ^
         lowerBound=1   upperBound=4
```

All 3s are in range `[1, 4)` → 3 elements (`upperBound - lowerBound = 3`).

---

## Reference Implementations

```typescript
function lowerBound(arr: number[], target: number): number {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}

function upperBound(arr: number[], target: number): number {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) right = mid;
    else left = mid + 1;
  }
  return left;
}
```

---

## Note: The `<=` Form Exists Too

You may see `while (left <= right)` with `right = nums.length - 1` in other resources. It's a valid alternative when you only need exact match (it returns immediately on finding the target), but it doesn't generalize to insertion points or "binary search on answer" cleanly. Pick one form and stick with it — the universal `<` form above handles every case.
