// https://leetcode.com/problems/contains-duplicate/

function containsDuplicate(nums: number[]): boolean {
    const seen = new Map()
    for (let num of nums) {
        if (seen.has(num)) return true;
        seen.set(num,true)
    }
    return false
};