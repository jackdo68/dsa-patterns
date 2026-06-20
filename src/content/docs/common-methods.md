---
title: "Common Methods"
topic: "fundamentals"
---
### charCodeAt

Returns the Unicode code point of the character at a given index.

```typescript
string.charCodeAt(index)
```

**Examples:**
```typescript
'A'.charCodeAt(0)   // 65
'Z'.charCodeAt(0)   // 90
'a'.charCodeAt(0)   // 97
'z'.charCodeAt(0)   // 122
'0'.charCodeAt(0)   // 48
'9'.charCodeAt(0)   // 57
```

**Common use case - convert char digit to number:**
```typescript
const digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);
// '5'.charCodeAt(0) - '0'.charCodeAt(0) = 53 - 48 = 5
```

### String.fromCharCode

Converts a Unicode code point back to a character. The inverse of `charCodeAt`.

```typescript
String.fromCharCode(code)
```

**Examples:**
```typescript
String.fromCharCode(65)   // 'A'
String.fromCharCode(97)   // 'a'
String.fromCharCode(48)   // '0'
```

**Common use case - iterate through a-z:**
```typescript
for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
  const char = String.fromCharCode(c);
  // do something with char
}
```

### substring

Extracts a portion of a string between two indices.

```typescript
string.substring(startIndex, endIndex)
```

- `startIndex` - inclusive (included in result)
- `endIndex` - exclusive (not included in result)

**Examples:**
```typescript
"hello".substring(0, 2)   // "he"
"hello".substring(1, 4)   // "ell"
"hello".substring(2)      // "llo" (to end if no second arg)
```

**Common use case - extract after expanding pointers:**
```typescript
// After while loop overshoots by one on each side
return s.substring(left + 1, right);
```

### splice

Modifies an array in place — can remove, replace, or insert elements. Returns the removed elements.

```typescript
array.splice(startIndex, deleteCount, ...itemsToInsert)
```

- `startIndex` - index to start modifying
- `deleteCount` - number of elements to remove (0 to remove nothing)
- `itemsToInsert` - optional elements to add at that position

**Examples:**
```typescript
const arr = [1, 2, 3, 4, 5];

// Remove 2 elements starting at index 1
arr.splice(1, 2);           // returns [2, 3], arr = [1, 4, 5]

// Insert without removing (deleteCount = 0)
arr.splice(1, 0, 10, 20);   // returns [], arr = [1, 10, 20, 4, 5]

// Replace 1 element at index 2
arr.splice(2, 1, 99);       // returns [20], arr = [1, 10, 99, 4, 5]

// Remove from the end (negative index)
arr.splice(-2, 2);          // returns [4, 5], arr = [1, 10, 99]
```

**Common use case - remove remaining k elements from end:**
```typescript
// In remove-k-digits, if k > 0 after scanning
stack.splice(stack.length - k, k);
```
