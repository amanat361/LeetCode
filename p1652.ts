// https://leetcode.com/problems/defuse-the-bomb

const wrap_idx = (i: number, n: number): number => ((i % n) + n) % n;

function decrypt(code: number[], k: number): number[] {
    // k = 0
    if (k === 0) return code.fill(0);

    // initialize the sum and defused array
    const defused: number[] = [] as number[];
    let sum = 0;

    // set the direction flag based on k
    const dir = k > 0;
    k = Math.abs(k);

    // create const for code.length
    const n = code.length

    // create the first window. wrap as needed with mod
    for (let i = 1; i <= k; i++) {
        let next_idx = wrap_idx(dir ? i : (n - i), n)
        sum += code[next_idx];
    }

    // save this value
    defused.push(sum);
    
    // then go through n iterations moving the window
    for (let i = 1; i < code.length; i++) {
        let next_idx = wrap_idx((dir ? k : (n - 1)) + i, n);
        let prev_idx = wrap_idx(next_idx - k, n);
        sum += code[next_idx];
        sum -= code[prev_idx];
        defused.push(sum)
    }

    // return the new values
    return defused
};