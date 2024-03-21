// https://leetcode.com/problems/binary-subarrays-with-sum/

function numSubarraysWithSum(nums: number[], goal: number): number {
  let left = 0;
  let right = 1;

  let curr = nums[left];
  let total_subarrays = 0;

  function analyzeSubarray() {
    if (curr === goal) {
      total_subarrays += 1;
    }
  }

  function traverseRight() {
    while (curr <= goal && right < nums.length) {
      curr += nums[right];
      right += 1;
      analyzeSubarray();
    }
  }

  function shiftLeft() {
    left += 1;
    right = left + 1;
    curr = nums[left];
  }

  while (right < nums.length) {
    traverseRight()
    shiftLeft();
  }

  return total_subarrays;
}