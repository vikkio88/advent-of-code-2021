const input = require('./data/input.json');

let previous = null;
let increases = 0;
for (const current of input) {
    if (previous !== null && current > previous) increases++;
    previous = current;
}

console.log(increases);
