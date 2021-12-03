//const input = require('./data/input.json');
const input = require('./data/example.json');

const calculateBitsCount = (input, position) => {
    const bits = { 0: 0, 1: 0 };
    for (const line of input) {
        const inputBits = [...line];

        const value = inputBits[position];
        bits[value] += 1;
    }

    return bits;
};

const findValue = (lines, condition) => {
    let value = null;
    let index = 0;
    while (lines.length > 1) {
        // this could only go and count at index pos
        const bitCount = calculateBitsCount(lines, index);
        const [maxAmount, bitToCheck] = condition(bitCount);

        const remainingLines = [];
        for (const line of lines) {
            if (line[index] === bitToCheck) remainingLines.push(line);
            if (remainingLines.length >= maxAmount) break;
        }

        lines = remainingLines;
        value = remainingLines;
        index++;
    }

    return value.join('');
};

const oxy = findValue(input, bitCount => {
    if (bitCount[1] >= bitCount[0]) return [bitCount[1], '1'];
    return [bitCount[0], '0'];
});


const co2 = findValue(input, bitCount => {
    if (bitCount[0] <= bitCount[1]) return [bitCount[0], '0'];
    return [bitCount[1], '1'];
});
let oxyDEC = parseInt(oxy, 2);
let co2DEC = parseInt(co2, 2);
console.log(`oxy: ${oxy}, co2: ${co2}\nDEC: o2: ${oxyDEC} , co2: ${co2DEC}\n\t-> solution: ${oxyDEC * co2DEC}`);

/**
 prints:

oxy: 10111, co2: 01010
DEC: o2: 23 , co2: 10
        -> solution: 230

 */

