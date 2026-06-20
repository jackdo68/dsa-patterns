---
title: "Trie - Prefix Tree"
topic: "string, trie"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 208 - Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

- *A [**trie**](https://en.wikipedia.org/wiki/Trie) (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class:*
- *`*Trie()` Initializes the trie object.**
- *`*void insert(String word)` Inserts the string `word` into the trie.**
- *`*boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.**
- *`*boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.**

### Solution

```typescript
class Node {
  next: Map<string, Node>;
  isEnd: boolean;

  constructor() {
    this.next = new Map();
    this.isEnd = false;
  }
}

class Trie {
  root: Node;

  constructor() {
    this.root = new Node();
  }

  insert(word: string): void {
    let curr = this.root;
    for (const char of word) {
      if (!curr.next.has(char)) {
        curr.next.set(char, new Node());
      }
      curr = curr.next.get(char)!; // Move to the next node
    }
    curr.isEnd = true; // Mark the end of the word
  }

  search(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  private traverse(word: string): Node | null {
    let curr = this.root;
    for (const char of word) {
      if (!curr.next.has(char)) {
        return null; // Prefix or word does not exist
      }
      curr = curr.next.get(char)!; // Move to the next node
    }
    return curr; // Return the node at the end of the traversal
  }
}
```