const input = require('./data/input.json');
//const input = require('./data/example.json');

const triplets = [];


for (const index in input) {
    const value = input[index];

    if (triplets[index - 2] && triplets[index - 2].length < 4) {
        triplets[index - 2].push(value);
    }

    if (triplets[index - 1] && triplets[index - 1].length < 4) {
        triplets[index - 1].push(value);
    }

    const currentTriplet = triplets[index] || [];
    if (currentTriplet && currentTriplet.length < 4) {
        currentTriplet.push(value);
    }

    triplets[index] = currentTriplet;
}

const validTriplets = triplets.filter(t => t.length === 3);
const newInput = validTriplets.map(t => t.reduce((acc, i) => acc + i, 0));

let previous = null;
let increases = 0;
for (const current of newInput) {
    if (previous !== null && current > previous) increases++;
    previous = current;
}

console.log(increases);
