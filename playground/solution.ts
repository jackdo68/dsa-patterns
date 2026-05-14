function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const prefix = Array.from({ length: n }, () => 1);
  const postfix = Array.from({ length: n }, () => 1);
  let curr = 1;
  for (let i = 0; i < n; i++) {
    curr = curr * nums[i];
    prefix[i] = curr;
  }
  curr = 1;
  for (let i = n - 1; i >= 0; i--) {
    curr = curr * nums[i];
    postfix[i] = curr;
  }
  const result = Array.from({ length: n }, () => 1);
  for (let i = 0; i < n; i++) {
    const left = i > 0 ? prefix[i - 1] : 1;
    const right = i < n - 1 ? postfix[i + 1] : 1;
    result[i] = left * right;
  }
  return result;
}

const nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums));
