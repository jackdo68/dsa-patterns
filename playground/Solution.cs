// Your scratchpad. Write LeetCode-style solutions here: a `Solution` class
// with PascalCase methods. Program.cs calls into this. Run with `dotnet run`.
//
// Tip: .NET ships a min-heap as PriorityQueue<TElement, TPriority> — no need
// to hand-roll a heap like the old TypeScript playground did.

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var seen = new Dictionary<int, int>(); // value -> index
        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];
            if (seen.TryGetValue(complement, out int j))
                return new[] { j, i };
            seen[nums[i]] = i;
        }
        return Array.Empty<int>();
    }
}
