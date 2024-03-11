// https://leetcode.com/problems/median-of-two-sorted-arrays/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged = nums1.concat(nums2).sort((a, b) => a - b);
  const length = merged.length;
  if (length % 2 === 0) {
    return (merged[length / 2 - 1] + merged[length / 2]) / 2;
  }
  return merged[Math.floor(length / 2)];
}
