---
title: "Binary Search Variations Explained"
topic: "binary search"
difficulty: "Medium"
frequency: "Medium"
---
### Ideas

## The One Form You Need to Memorize

Every binary search problem reduces to: **"find the first index where some predicate is true."** This single template handles every case.

```csharp
public int BinarySearch(int[] nums, Func<int, bool> predicate) {
    int left = 0;
    int right = nums.Length - 1;
    int result = nums.Length;          // default: predicate never true
    while (left <= right) {
        int mid = (left + right) / 2;
        if (predicate(mid)) {
            result = mid;              // record this candidate
            right = mid - 1;           // keep searching left for an earlier match
        } else {
            left = mid + 1;            // mid is not the answer — exclude it
        }
    }
    return result;                     // first index where predicate is true (or n if none)
}
```

**Why it works:** every binary search problem has an underlying *monotonic* property — there's a boundary where things flip from "no" to "yes." This template finds that boundary. Whatever the problem asks, you reframe it as "where does the boundary sit?" and post-process if needed.

---

## How the Form Works (Mental Model)

- **Search space:** `[left, right]` — both endpoints are inclusive, valid candidates.
- **Initial state:** `right = nums.length - 1` — the last valid index.
- **Loop ends** when `left > right` — the pointers crossed past each other; no candidates remain.
- **`result = mid; right = mid - 1`:** `mid` was a valid candidate (predicate true). Record it, then look further left for an even earlier match.
- **`left = mid + 1`:** `mid` was NOT a valid candidate, so skip it.

**Why the extra `result` variable?** Both pointers always point at unchecked candidates that get skipped (`right = mid - 1`, `left = mid + 1`). The pointers don't converge ON the answer — they cross past it. So you have to record the best candidate as you go, otherwise it's lost.

**Default `result = nums.length`:** if the predicate is never true, the answer is "out of range" — the same value the `<` form would naturally return.

---

## Applying It to Every Scenario

### 1. Exact Match — "Is X in the array?"

Reframe as: "Find the first index where `nums[i] >= X`. Then check if it equals X."

```csharp
public int Search(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;
    int result = nums.Length;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] >= target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (result == nums.Length || nums[result] != target) return -1;
    return result;
}
```

### 2. First Occurrence — "First index where `nums[i] === X`"

Same as exact match — `lowerBound` naturally lands on the first copy.

```csharp
// predicate: nums[i] >= target
// returns: first index where nums[i] == target, or -1
```

### 3. Last Occurrence — "Last index where `nums[i] === X`"

Reframe as: "Find first index where `nums[i] > X`, then subtract 1."

```csharp
public int FindLast(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;
    int result = nums.Length;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] > target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    // result is now the first index > target
    if (result == 0 || nums[result - 1] != target) return -1;
    return result - 1;
}
```

### 4. Insertion Position — "Where should X go to keep array sorted?"

Direct lowerBound — no post-processing needed.

```csharp
// predicate: nums[i] >= target
// returns: index where target should be inserted (could be nums.Length)
```

### 5. Range of Target — "Find [first, last] indices of X"

Combine lowerBound and upperBound.

```csharp
public int[] SearchRange(int[] nums, int target) {
    int first = LowerBound(nums, target);    // first index >= target
    int last = UpperBound(nums, target) - 1; // first index > target, minus 1
    if (first >= nums.Length || nums[first] != target) return new[] { -1, -1 };
    return new[] { first, last };
}
```

### 6. Binary Search on Answer — "Smallest valid value"

Used when the answer isn't an array index but a *value* (e.g., minimum capacity, smallest divisor). The predicate becomes a feasibility check.

```csharp
// predicate: isFeasible(value)
// search space: [minPossible, maxPossible]
public int SmallestValid(int lo, int hi, Func<int, bool> isFeasible) {
    int left = lo, right = hi;
    int result = hi + 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (isFeasible(mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}
```

### 7. First True in Monotonic Boolean — "Where does false flip to true?"

The most direct application — predicate is the boolean check itself.

```csharp
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

The `=` sign in the predicate is the only difference. It decides whether equal values are "the answer" (record it, search left) or "not the answer yet" (skip right).

### Walkthrough — Lower Bound

`arr = [1, 3, 3, 3, 5, 7]`, target = 3, predicate: `arr[mid] >= 3`

```
left=0, right=5, result=6
  mid=2: arr[2]=3, 3 >= 3? Yes → result=2, right=1   [record, search left]
left=0, right=1, result=2
  mid=0: arr[0]=1, 1 >= 3? No  → left=1              [skip]
left=1, right=1, result=2
  mid=1: arr[1]=3, 3 >= 3? Yes → result=1, right=0   [record, search left]
left=1, right=0 → stop. Answer = 1 ✓
```

### Walkthrough — Upper Bound

`arr = [1, 3, 3, 3, 5, 7]`, target = 3, predicate: `arr[mid] > 3`

```
left=0, right=5, result=6
  mid=2: arr[2]=3, 3 > 3? No  → left=3               [skip]
left=3, right=5, result=6
  mid=4: arr[4]=5, 5 > 3? Yes → result=4, right=3    [record, search left]
left=3, right=3, result=4
  mid=3: arr[3]=3, 3 > 3? No  → left=4               [skip]
left=4, right=3 → stop. Answer = 4 ✓
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

```csharp
public int LowerBound(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    int result = arr.Length;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] >= target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}

public int UpperBound(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    int result = arr.Length;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] > target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}
```

---

## Note: The `<` Form Exists Too

You may see `while (left < right)` with `right = nums.length` in other resources. It's a valid alternative — instead of tracking `result` separately, the pointers converge ON the answer and you return `left` directly. The trade-off: more concise (no result variable) but the exclusive `right = nums.length` initial bound feels less intuitive. Pick one form and stick with it — the universal `<=` form above handles every case.
