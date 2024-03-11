// https://leetcode.com/problems/valid-anagram/

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const a = s.split("");
  const b = t.split("");
  const seen = new Map();

  for (let letter of a) {
    const count = seen.get(letter);
    if (count) seen.set(letter, count + 1);
    else seen.set(letter, 1);
  }

  for (let letter of b) {
    const count = seen.get(letter);
    if (!count) return false;
    if (count === 1) {
      seen.delete(letter);
    } else {
      seen.set(letter, count - 1);
    }
  }

  return true;
}
