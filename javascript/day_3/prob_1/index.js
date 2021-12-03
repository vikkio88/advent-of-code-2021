const input = require('./data/input.json');
//const input = require('./data/example.json');

// assuming the same amount of bits
const numberOfBits = input[0].length;

const bits = Array.from({length:numberOfBits}, () => ({0:0,1:0}));

for (const line of input) {
    const inputBits = [...line];
    for (const index in inputBits) {
        const value = inputBits[index];
        bits[index][value] += 1;
    }
}

let gammaRate = '';
let epsilonRate = '';

for (const bitCount of bits) {
    if (bitCount[0] > bitCount[1]){
        gammaRate += '0';
        epsilonRate += '1';
    } else {
        gammaRate += '1';
        epsilonRate += '0';
    }
}

console.log(`BIN gamma: ${gammaRate} , epsilon: ${epsilonRate}`);
gammaRate = parseInt(gammaRate ,2);
epsilonRate = parseInt(epsilonRate ,2);
console.log(`DEC gamma: ${gammaRate} , epsilon: ${epsilonRate}`);
console.log(`solution: ${gammaRate * epsilonRate}`);
