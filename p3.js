// https://leetcode.com/problems/longest-substring-without-repeating-characters/

let tests = [
    {
        input: "abcabcbb",
        output: 3
    },
    {
        input: "bbbbb",
        output: 1
    },
    {
        input: "pwwkew",
        output: 3
    },
    {
        input: "",
        output: 0
    }
]

function lengthOfLongestSubstring(s) {
    let hash = new Map()
}