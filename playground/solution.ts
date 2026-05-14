function lengthOfLongestSubstring(s: string): number {
  let result = 0;
  if (!s.length) return result;
  const n = s.length;
  let l = 0;
  let r = 0;
  const set = new Set<string>();
  while (l < n && r < n) {
    while (set.has(s[r]) && l < r) {
      set.delete(s[l]);
      l++;
    }
    set.add(s[r]);
    result = Math.max(result, set.size);
    r++;
  }
  return result;
}
