---
title: "Topological Sort - Kahn algorithm - Course Schedule"
topic: "bfs, graph"
difficulty: "Medium"
frequency: "High"
---
### **Question**

[LeetCode 207 - Course Schedule](https://leetcode.com/problems/course-schedule/)

*There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.*

- *For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.*

*Return `true` if you can finish all courses. Otherwise, return `false`.*

### Ideas

**What is Topological Sort?**
A linear ordering of vertices in a directed acyclic graph (DAG) where for every edge `u → v`, vertex `u` comes before `v`. Think of it as a valid sequence to complete tasks with dependencies.

**Kahn's Algorithm Intuition**
- A node with **in-degree 0** has no dependencies — it can be processed immediately
- After processing a node, its dependents lose one dependency (in-degree decreases by 1)
- When a dependent's in-degree reaches 0, it's ready to process
- If we process all nodes, no cycle exists. If some remain, there's a cycle (they're stuck waiting on each other)

**Steps:**
1. Build an adjacency list and count in-degrees for all nodes
2. Add all nodes with in-degree 0 to a queue (these have no prerequisites)
3. While queue is not empty:
   - Pop a node and mark it as processed
   - For each neighbor, decrement its in-degree
   - If neighbor's in-degree becomes 0, add it to the queue
4. If processed count equals total nodes → no cycle (return true)
   Otherwise → cycle exists (return false)

### Solution

```csharp
public bool CanFinish(int numCourses, int[][] prerequisites) {
    var preReqMap = new Dictionary<int, List<int>>();
    int[] inDegree = new int[numCourses];

    foreach (var edge in prerequisites) {
        int main = edge[0], pre = edge[1];
        inDegree[main]++;
        if (!preReqMap.ContainsKey(pre)) preReqMap[pre] = new List<int>();
        preReqMap[pre].Add(main);
    }

    var queue = new Queue<int>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.Enqueue(i);
    }

    int completed = 0;
    while (queue.Count > 0) {
        int course = queue.Dequeue();
        completed++;
        if (completed == numCourses) return true;
        if (preReqMap.TryGetValue(course, out var children)) {
            foreach (int child in children) {
                inDegree[child]--;
                if (inDegree[child] == 0) queue.Enqueue(child);
            }
        }
    }
    return completed == numCourses;
}
```

### See Also

- [Topological Sort (concept)](/dsa-patterns/topological-sort-wiki/) — what it is and when to use it
- [DFS Approach](/dsa-patterns/dfs-cycle-detection-course-schedule-ii/) — alternative using DFS + cycle detection