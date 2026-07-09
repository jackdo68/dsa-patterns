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

```csharp
public class Node {
    public Dictionary<char, Node> Next = new();
    public bool IsEnd = false;
}

public class Trie {
    private readonly Node root;

    public Trie() {
        root = new Node();
    }

    public void Insert(string word) {
        var curr = root;
        foreach (char c in word) {
            if (!curr.Next.ContainsKey(c)) {
                curr.Next[c] = new Node();
            }
            curr = curr.Next[c]; // Move to the next node
        }
        curr.IsEnd = true; // Mark the end of the word
    }

    public bool Search(string word) {
        var node = Traverse(word);
        return node is not null && node.IsEnd;
    }

    public bool StartsWith(string prefix) {
        return Traverse(prefix) is not null;
    }

    private Node? Traverse(string word) {
        var curr = root;
        foreach (char c in word) {
            if (!curr.Next.TryGetValue(c, out var next)) {
                return null; // Prefix or word does not exist
            }
            curr = next; // Move to the next node
        }
        return curr; // Return the node at the end of the traversal
    }
}
```