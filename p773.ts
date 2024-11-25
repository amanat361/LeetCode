// https://leetcode.com/problems/sliding-puzzle/

function isSolvable(board: number[][]): boolean {
    // flatten board and remove empty tile
    const flat = board.flat().filter(n => n !== 0);

    // keep track of inversions
    let inversions = 0;

    // this is O(n^2) but n is 5 so idc
    for (let i = 0; i < flat.length - 1; i++) {
        for (let j = i + 1; j < flat.length; j++) {
            if (flat[i] > flat[j]) {
                inversions += 1;
            }
        }
    }

    // return parity of inversions
    return inversions % 2 == 0;
}

const flattenIndex = (i, j) => i * 3 + j;
const thickenIndex = (i) => [Math.floor(i / 3), i % 3];

const neighbors = [
    [[0,1],[1,0]],
    [[0,0],[0,2],[1,1]],
    [[0,1],[1,2]],
    [[0,0],[1,1]],
    [[0,1],[1,0],[1,2]],
    [[0,2],[1,1]],
]

function compareObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function isSolved(board: number[][]): boolean {
    return compareObjects(board,[[1,2,3],[4,5,0]]);
}

function displayBoard(board: number[][]): void {
    console.log(board[0]);
    console.log(board[1]);
    console.log("\n")
}

function md(x: number, y: number, val: number): number {
    const dest = thickenIndex(val - 1);
    const xDist = Math.abs(dest[0] - x);
    const yDist = Math.abs(dest[1] - y);
    return xDist + yDist;
}

function slidingPuzzle(board: number[][]): number {
    if (!isSolvable(board)) return -1;
    const flat = board.flat();

    // look at empty tile
    let empty = flat.indexOf(0);
    let prev = 0;

    // keep track of moves
    let moves = 0;

    while (!isSolved(board)) {
        // 2d variant of empty index
        const emptyPos = thickenIndex(empty);

        // look at neighbors to empty tile
        // exclude the previous tile slid
        // add the value of the tile to arr
        const candidates = neighbors[empty].filter(
            ([px,py]) => board[px][py] !== prev
        ).map(([px,py]) => ([px,py,board[px][py]]));

        // find the candidate with highest MD
        let tile = candidates[0];

        // what is the distance from the first candidate to where it belongs?
        let bestDist = md(tile[0], tile[1], tile[2]);

        // what is the distance from the first candidate to where it belongs
        // AFTER it has been swapped with the empty tile?
        let distIfSwapped = md(emptyPos[0], emptyPos[1], tile[2]);

        // does this candidate get closer to where it belongs?
        let closer = bestDist > distIfSwapped;

        for (let c = 1; c < candidates.length; c++) {
            // look at the next available candidate
            const curr = candidates[c];

            // what is the distance from this candidate to where it belongs?
            const dist = md(curr[0], curr[1], curr[2]);

            // what about the distance to where it belongs if it is swapped?
            distIfSwapped = md(emptyPos[0], emptyPos[1], curr[2]);

            // if currently no candidates move closer, but this one does, then
            // this is the better candidate, if it is tied with another
            if (dist === bestDist && !closer && dist > distIfSwapped) {
                bestDist = dist;
                tile = candidates[c];
            }
            if (dist > bestDist) {
                bestDist = dist;
                tile = candidates[c];
            }
        }

        // lets see what we are sliding and what position it is in
        console.log(`The tile we should slide is ${tile[2]}`)
        displayBoard(board);
        // console.log(`It is in the position X: ${tile[0]} and Y: ${tile[1]}`)
        // console.log(`The manhattan distance is ${best} moves away`)

        // swap this tile with the empty tile
        board[emptyPos[0]][emptyPos[1]] = tile[2];
        board[tile[0]][tile[1]] = 0;

        // dont swap this tile again
        empty = flattenIndex(tile[0],tile[1]);
        prev = tile[2];

        // increment moves
        moves += 1;
    }

    return moves;
};