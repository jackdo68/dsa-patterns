---
title: "Common Methods"
topic: "fundamentals"
---
### char → int (code point)

Cast a `char` to `int` to get its Unicode code point (C#'s equivalent of `charCodeAt`).

```csharp
(int)str[index]
```

**Examples:**
```csharp
(int)'A'   // 65
(int)'Z'   // 90
(int)'a'   // 97
(int)'z'   // 122
(int)'0'   // 48
(int)'9'   // 57
```

**Common use case - convert char digit to number:**
```csharp
int digit = s[i] - '0';
// '5' - '0' = 53 - 48 = 5   (char arithmetic promotes to int)
```

### int → char

Cast an `int` code point back to a `char`. The inverse of the above (C#'s `String.fromCharCode`).

```csharp
(char)code
```

**Examples:**
```csharp
(char)65   // 'A'
(char)97   // 'a'
(char)48   // '0'
```

**Common use case - iterate through a-z:**
```csharp
for (char c = 'a'; c <= 'z'; c++) {
    // do something with c   (chars compare and increment directly)
}
```

### Substring

Extracts a portion of a string. **Note:** unlike JS, C#'s second argument is a **length**, not an end index.

```csharp
str.Substring(startIndex, length)
```

- `startIndex` - inclusive (included in result)
- `length` - number of characters to take

**Examples:**
```csharp
"hello".Substring(0, 2)   // "he"
"hello".Substring(1, 3)   // "ell"
"hello".Substring(2)      // "llo" (to end if no length given)
```

**Common use case - extract after expanding pointers:**
```csharp
// After while loop overshoots by one on each side (end index = right)
return s.Substring(left + 1, right - left - 1);
```

### List: RemoveRange / InsertRange

`List<T>` modifies in place — remove, replace, or insert elements (C#'s equivalent of `splice`).

```csharp
list.RemoveRange(startIndex, count);        // remove
list.InsertRange(startIndex, items);        // insert
```

**Examples:**
```csharp
var arr = new List<int> { 1, 2, 3, 4, 5 };

// Remove 2 elements starting at index 1
arr.RemoveRange(1, 2);                 // arr = [1, 4, 5]

// Insert without removing
arr.InsertRange(1, new[] { 10, 20 });  // arr = [1, 10, 20, 4, 5]

// Replace 1 element at index 2 (remove then insert)
arr.RemoveAt(2);
arr.Insert(2, 99);                     // arr = [1, 10, 99, 4, 5]
```

**Common use case - remove remaining k elements from end:**
```csharp
// In remove-k-digits, if k > 0 after scanning
stack.RemoveRange(stack.Count - k, k);
```
