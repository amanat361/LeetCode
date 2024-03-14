// https://leetcode.com/problems/binary-subarrays-with-sum/

//Input: nums = [1,0,1,0,1], goal = 2
// Output: 4
// Explanation: The 4 subarrays are bolded and underlined below:
// [*1,0,1*,0,1]
// [*1,0,1,0*,1]
// [1,*0,1,0,1*]
// [1,0,*1,0,1*]

function numSubarraysWithSum(nums: number[], goal: number): number {
  // initialize left and right pointers
  let left = 0;
  let right = 1;

  // start with first value as current
  let curr = nums[left];
  let total_subarrays = 0;

  function debugOutput() {
    console.log("\n--------------------")
    console.log(nums.slice(left,right))
    console.log(`Left: ${left} ... Right: ${right}`)
    console.log(`Curr: ${curr} ... Total Subarrays: ${total_subarrays}`)
  }

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

  function traverseLeft() {
    while (curr >= goal && left < right) {
      curr -= nums[left];
      left += 1;
      analyzeSubarray();
    }
  }

  while (right < nums.length) {
    traverseRight()
    debugOutput();

    console.log("done moving right!!")

    traverseLeft();
    debugOutput()

    console.log("done moving left!!")
  }

  return total_subarrays;
}

console.log(numSubarraysWithSum([1, 0, 1, 0, 1, 0, 0], 2));
