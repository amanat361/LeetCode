// https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/

// INCOMPLETE (passes small tests but fails on large ones)

function maximumSubarraySum(nums: number[], k: number): number {
    // sliding window yet again
    let foo = 0;
    const seen = new Set();
    const counts = new Map();
    let sum = 0;
    let next: number;
    let prev: number;


    function addToMap(key) {
        counts.set(key, (counts.get(key) || 0) + 1);
    }

    function removeFromMap(key) {
        if (counts.has(key)) {
            const newCount = counts.get(key) - 1;
            if (newCount === 0) {
                counts.delete(key); // remove key entirely
            } else {
                counts.set(key, newCount); // decrement count
            }
        }
    }


    for (let i = 0; i < nums.length; i++) {
        // starting with the first number, add it to our sum
        next = nums[i];
        sum += next;
        console.log("\nadding", next);

        if (i >= k) {
            prev = nums[i - k];
            sum -= prev;
            seen.delete(prev);
            removeFromMap(prev);
            console.log("removing", prev)
        }

        if (!seen.has(next)) {
            if (i >= k - 1 && sum > foo && counts.size === 0) {
                console.log("new maximum found:")
                foo = sum;
            }
        } else {
            addToMap(next);
            console.log("duplicate found:", next)
        }

        // seen.push(next);

        console.log(seen)
        console.log(sum)
    }

    return foo;
};