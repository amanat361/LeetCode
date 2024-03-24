// Given an integer array nums and an integer k, return the number of good subarrays of nums.

// A good array is an array where the number of different integers in that array is exactly k.

// For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
// A subarray is a contiguous part of an array.

// Example 1:

// Input: nums = [1,2,1,2,3], k = 2
// Output: 7
// Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
// Example 2:

// Input: nums = [1,2,1,3,4], k = 3
// Output: 3
// Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

function subarraysWithKDistinct(nums: number[], k: number): number {
  const map = new Map<number, number>();
  let left = 0;
  let right = 0;
  let total_subarrays = 0;

  let curr = 0;
  let curr_k = 0;

  function analyzeSubarray() {
    if (curr_k === k) {
      total_subarrays += 1;
    }
  }

  function traverseRight() {
    while (curr_k <= k && right < nums.length) {
      const num = nums[right];
      if (map.get(num) === 0) {
        curr_k += 1;
      }
      map.set(num, (map.get(num) || 0) + 1);
      right += 1;
      analyzeSubarray();
    }
  }

  function shiftLeft() {
    const num = nums[left];
    const count = map.get(num);

    map.set(num, count ? count - 1 : 0);
    if (map.get(num) === 0) {
      curr_k -= 1;
    }
    left += 1;
    right = left;
  }

  while (right < nums.length) {
    traverseRight()
    shiftLeft();
  }

  return total_subarrays;
}