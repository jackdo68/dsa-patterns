// Shared LeetCode-style data structures + helpers for the playground.
// These mirror the definitions LeetCode gives you, so solutions you write
// here paste straight into the site / LeetCode with no changes.

/// <summary>LeetCode binary tree node.</summary>
public class TreeNode
{
    public int val;
    public TreeNode? left;
    public TreeNode? right;
    public TreeNode(int val = 0, TreeNode? left = null, TreeNode? right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/// <summary>LeetCode singly-linked list node.</summary>
public class ListNode
{
    public int val;
    public ListNode? next;
    public ListNode(int val = 0, ListNode? next = null)
    {
        this.val = val;
        this.next = next;
    }
}

/// <summary>LeetCode graph node (clone-graph style).</summary>
public class Node
{
    public int val;
    public IList<Node?> neighbors;
    public Node(int val = 0, IList<Node?>? neighbors = null)
    {
        this.val = val;
        this.neighbors = neighbors ?? new List<Node?>();
    }
}

/// <summary>Test helpers: build/print trees and lists from arrays.</summary>
public static class Dsa
{
    /// <summary>Build a tree from a level-order array (null = missing child).</summary>
    public static TreeNode? BuildTree(int?[] values)
    {
        if (values.Length == 0 || values[0] is null) return null;

        var root = new TreeNode(values[0]!.Value);
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int i = 1;

        while (queue.Count > 0 && i < values.Length)
        {
            var node = queue.Dequeue();

            if (i < values.Length && values[i] is int lv)
            {
                node.left = new TreeNode(lv);
                queue.Enqueue(node.left);
            }
            i++;

            if (i < values.Length && values[i] is int rv)
            {
                node.right = new TreeNode(rv);
                queue.Enqueue(node.right);
            }
            i++;
        }

        return root;
    }

    /// <summary>Print a tree level-by-level (BFS), one line per level.</summary>
    public static void PrintTree(TreeNode? root)
    {
        if (root is null) { Console.WriteLine("Empty tree"); return; }

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            var line = new List<string>();
            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                line.Add(node.val.ToString());
                if (node.left is not null) queue.Enqueue(node.left);
                if (node.right is not null) queue.Enqueue(node.right);
            }
            Console.WriteLine(string.Join("  ", line));
        }
    }

    /// <summary>Build a linked list from values, return the head.</summary>
    public static ListNode? BuildList(params int[] values)
    {
        ListNode dummy = new();
        var tail = dummy;
        foreach (var v in values)
        {
            tail.next = new ListNode(v);
            tail = tail.next;
        }
        return dummy.next;
    }

    /// <summary>Print a linked list as "1 -> 2 -> 3".</summary>
    public static void PrintList(ListNode? head)
    {
        var parts = new List<string>();
        for (var cur = head; cur is not null; cur = cur.next) parts.Add(cur.val.ToString());
        Console.WriteLine(parts.Count == 0 ? "(empty)" : string.Join(" -> ", parts));
    }
}
