// https://leetcode.com/problems/intersection-of-two-arrays/

function intersection(nums1: number[], nums2: number[]): number[] {
  const foo = new Map();
  const bar = new Set();

  if (nums1.length > nums2.length) {
    for (let i = 0; i < nums2.length; i++) {
      foo.set(nums1[i], false);
      bar.add(nums2[i]);
    }
    for (let i = nums2.length; i < nums1.length; i++) {
      foo.set(nums1[i], false);
    }
  } else if (nums1.length < nums2.length) {
    for (let i = 0; i < nums1.length; i++) {
      foo.set(nums1[i], false);
      bar.add(nums2[i]);
    }
    for (let i = nums1.length; i < nums2.length; i++) {
      bar.add(nums2[i]);
    }
  } else {
    for (let i = 0; i < nums1.length; i++) {
      foo.set(nums1[i], false);
      bar.add(nums2[i]);
    }
  }

  const intersection = new Array();
  for (let key of bar) {
    if (foo.has(key)) {
      intersection.push(key);
    }
  }

  return intersection;
}

function generateRandomArray(length: number, max: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

// run 5 tests with random data
for (let i = 0; i < 5; i++) {
  const nums1 = generateRandomArray(10, 100);
  const nums2 = generateRandomArray(10, 100);
  console.log("---");
  console.log(nums1);
  console.log(nums2);
  console.log(intersection(nums1, nums2));
}
