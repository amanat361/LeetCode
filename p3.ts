// https://leetcode.com/problems/longest-substring-without-repeating-characters/

let tests = [
  {
    input: "abcabcbb",
    output: 3,
  },
  {
    input: "bbbbb",
    output: 1,
  },
  {
    input: "pwwkew",
    output: 3,
  },
  {
    input: "",
    output: 0,
  },
];

function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0;
  let right = 0;
  let max = 0;

  while (right < s.length) {
    const char = s[right];
    const index = map.get(char);
    if (index !== undefined && index >= left) {
      left = Math.max(index + 1, left);
    }
    map.set(char, right);
    max = Math.max(max, right - left + 1);
    right++;
  }

  return max;
};

tests.forEach((t, i) => console.log(
  'test', i, lengthOfLongestSubstring(t.input) === t.output
))