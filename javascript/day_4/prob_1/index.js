const fs = require('fs');
const input = './data/input.in';
//const input = './data/example.in';

const loadGame = filename => {

    const data = fs.readFileSync(filename, 'utf-8');
    const lines = data.split(/\r?\n/);

    const drawn = lines.shift().trim().split(',');
    const boards = [];
    const boardsNumbers = [];
    let index = 0;
    for (const line of lines) {
        if (!Array.isArray(boards[index])) {
            boards[index] = [];
            boardsNumbers[index] = {};
        }
        const row = line.trim().split(/\s+/);

        if (row.length === 1) {
            index++;
            continue;
        }
        boards[index].push(row);
        for (const n of row) {
            boardsNumbers[index][n] = false;
        }
    }

    return {
        drawn,
        boards,
        boardsNumbers,
    };
};

const indexBoard = board => {
    const nums = {};

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const value = board[i][j];
            nums[value] = [i, j];
        }
    }

    return nums;
};

// could calculated indexed one in load game and ignore boards
const { drawn, boards, boardsNumbers } = loadGame(input);

const indexedBoards = boards.map(b => indexBoard(b));

const markings = Array.from({ length: boards.length }, () => ({ r: Array.from({ length: 5 }, () => 0), c: Array.from({ length: 5 }, () => 0) }));

let lastCalledNumber = null;
let bingoCalled = false;

for (const n of drawn) {
    console.log(`called number ${n}`);
    console.log();
    // I need this at the end
    lastCalledNumber = n;
    for (const index in boards) {
        // check if there is a match;
        const position = indexedBoards[index][n];
        if (position !== undefined) {
            boardsNumbers[index][n] = true;
            // here check if bingo on row/col of that board
            const [i, j] = position;
            markings[index].r[i] += 1;
            markings[index].c[j] += 1;


            if (markings[index].r.includes(5) || markings[index].c.includes(5)) {
                console.log('BINGO', n);
                bingoCalled = index;
                break;
            }
        }
        if (bingoCalled) break;
    }

    if (bingoCalled) break;
    /*
    c++;
    if (c === 12) break;
    */
}

// print checked values
/*
console.log(`iteration${c}`);
for (const i in boardsNumbers) {
    const bn = boardsNumbers[i];
    console.log(`board: ${i}`);
    for (const key of Object.keys(bn)) {
        if (bn[key]) console.log(`${key}`);
    }
}
*/

console.log(`board ${bingoCalled}`, boards[bingoCalled]);
let sumNotCalled = 0;
const bn = boardsNumbers[bingoCalled];
for (const key of Object.keys(bn)) {
    if (!bn[key]) sumNotCalled += parseInt(key);
}

console.log(`sum of not called -> ${sumNotCalled}, last called ${lastCalledNumber}`);
console.log(`\t -> solution ${sumNotCalled * lastCalledNumber}`);