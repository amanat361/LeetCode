// https://leetcode.com/problems/custom-sort-string/

function customSortString(order: string, s: string): string {
  const weights = new Map();
  for (let i = order.length - 1; i >= 0; i--) {
    weights.set(order[i], i);
  }
  return s
    .split("")
    .sort((a, b) => {
      if (weights.has(a)) {
        if (weights.has(b)) {
          return weights.get(a) - weights.get(b);
        }
        return -1;
      }
      if (weights.has(b)) {
        return 1;
      }
      return 0;
    })
    .join("");
}
