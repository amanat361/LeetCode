// https://leetcode.com/problems/group-anagrams/

function groupByLength(strs: string[]): Map<number, string[]> {
  const groups = new Map<number, string[]>();
  for (let str of strs) {
    const len = str.length;
    const group = groups.get(len);
    if (group) {
      group.push(str);
    } else {
      groups.set(len, [str]);
    }
  }
  return groups;
}

function groupAnagrams(strs: string[]): string[][] {
  const groups = groupByLength(strs);

  const result = new Array<Array<string>>();
  for (let group of groups.values()) {
    const anagrams = new Map<string, string[]>();
    for (let str of group) {
      const key = str.split("").sort().join("");
      const anagram = anagrams.get(key);
      if (anagram) {
        anagram.push(str);
      } else {
        anagrams.set(key, [str]);
      }
    }
    for (let anagram of anagrams.values()) {
      result.push(anagram);
    }
  }

  return result;
}
