// https://leetcode.com/problems/two-sum/

let tests = [
    {
        input: [2,7,11,15],
        output: 9,
        expected: [0,1]
    },
    {
        input: [3,2,4],
        output: 6,
        expected: [1,2]
    },
    {
        input: [3,3],
        output: 6,
        expected: [0,1]
    }
]

function twoSum(nums, target) {
    let hash = new Map([
        [nums[0],0]
    ])

    for (let i = 1; i < nums.length; i++) {
        let comp = target - nums[i]
        if (hash.has(comp)) return [hash.get(comp),i]
        hash.set(nums[i],i)
    }
};

for (let test of tests) {
    console.log(twoSum(test.input,test.output))
}