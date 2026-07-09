// Entry point. Edit the calls below to exercise whatever you're working on in
// Solution.cs, then run:  dotnet run   (from the playground/ folder)

var solution = new Solution();

// --- example: Two Sum ---
int[] result = solution.TwoSum(new[] { 2, 7, 11, 15 }, 9);
Console.WriteLine($"TwoSum -> [{string.Join(", ", result)}]");

// --- example: tree helpers ---
var tree = Dsa.BuildTree(new int?[] { 1, 2, 3, null, 4 });
Console.WriteLine("Tree levels:");
Dsa.PrintTree(tree);

// --- example: linked list helpers ---
Console.Write("List: ");
Dsa.PrintList(Dsa.BuildList(1, 2, 3, 4));
