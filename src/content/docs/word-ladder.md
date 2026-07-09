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

```csharp
public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
    int n = beginWord.Length;
    var visited = new HashSet<string> { beginWord };
    var queue = new Queue<(string word, int level)>();
    queue.Enqueue((beginWord, 1));
    var set = new HashSet<string>(wordList);
    while (queue.Count > 0) {
        var (word, level) = queue.Dequeue();
        for (int i = 0; i < n; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == word[i]) continue;
                string augmentedWord = word.Substring(0, i) + c + word.Substring(i + 1);
                if (set.Contains(augmentedWord) && augmentedWord == endWord) return level + 1;
                if (!visited.Contains(augmentedWord) && set.Contains(augmentedWord)) {
                    visited.Add(augmentedWord);
                    queue.Enqueue((augmentedWord, level + 1));
                }
            }
        }
    }
    return 0;
}
```
