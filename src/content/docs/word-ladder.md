---
title: "Word Ladder"
topic: "graph, bfs, string"
difficulty: "Hard"
frequency: "Medium"
---
### Question

[LeetCode 127 - Word Ladder](https://leetcode.com/problems/word-ladder/)

Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the **shortest transformation sequence** from `beginWord` to `endWord`, such that:
- Only one letter can be changed at a time.
- Each transformed word must exist in the word list.

Return 0 if no such sequence exists.
### Ideas

Think of words as nodes in a graph. Two words are connected if they differ by exactly one letter. We need the shortest path from `beginWord` to `endWord` → use BFS.

**Finding neighbors:** For each position in the current word, try replacing it with every letter a-z. If the new word exists in the word list, it's a valid neighbor.

**Why BFS?** BFS explores level by level, so the first time we reach `endWord`, we've found the shortest path.

**Time: O(N × L²)** where N = number of words, L = word length
- Visit at most N words
- For each word: L positions × 26 letters × O(L) to create new string and hash lookup
- 26 is constant → O(N × L × L) = O(N × L²)

**Space: O(N × L)** for the wordSet and visited set storing words

### Solution

```typescript
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  let chars = "";
  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    chars += String.fromCharCode(i); // "abcd...."
  }
  const n = beginWord.length;
  const visited = new Set<string>([beginWord]);
  const stack: [string, number][] = [[beginWord, 1]];
  const set = new Set<string>(wordList);
  while (stack.length) {
    const [word, level] = stack.shift()!;
    for (let i = 0; i < n; i++) {
      for (const c of chars) {
        if (c === word[i]) continue;
        const augmentedWord = word.slice(0, i) + c + word.slice(i + 1);
        if (set.has(augmentedWord) && augmentedWord === endWord) return level + 1;
        if (!visited.has(augmentedWord) && set.has(augmentedWord)) {
          visited.add(augmentedWord);
          stack.push([augmentedWord, level + 1]);
        }
      }
    }
  }
  return 0;
}
```
