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

```typescript
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const preReqMap = new Map<number, number[]>()
  const inDegree = new Array(numCourses).fill(0)

  for (const [main, pre] of prerequisites) {
    inDegree[main] = inDegree[main] + 1
    preReqMap.set(pre, [...(preReqMap.get(pre) ||[]), main])
  }

  const stack:number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) stack.push(i)
  }

  let completed = 0;
  while (stack.length) {
    const course = stack.shift()!
    completed++
    if (completed === numCourses) return true;
    for (const child of preReqMap.get(course) || []) {
     inDegree[child] = inDegree[child] - 1 
     if (inDegree[child] === 0) stack.push(child)
    }
  }
  return completed === numCourses
}
```

### See Also

- [Topological Sort (concept)](/dsa-patterns/topological-sort-wiki/) — what it is and when to use it
- [DFS Approach](/dsa-patterns/dfs-cycle-detection-course-schedule-ii/) — alternative using DFS + cycle detection