// https://leetcode.com/problems/valid-parentheses/

function isValid(s: string): boolean {
  const stack = new Array();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (char === ")" && last !== "(") {
        return false;
      }
      if (char === "]" && last !== "[") {
        return false;
      }
      if (char === "}" && last !== "{") {
        return false;
      }
    }
  }
  return stack.length === 0;
}