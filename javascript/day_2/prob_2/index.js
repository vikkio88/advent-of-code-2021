const input = require('./data/input.json');
//const input = require('./data/example.json');

const position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
};

const modifiers = {
    forward: { horizontal: +1, depth: +1, aim: 0 },
    up: { horizontal: 0, depth: 0, aim: -1 },
    down: { horizontal: 0, depth: 0, aim: +1 },
};

for (const command of input) {
    const [type, amount] = command.split(" ");

    const modifier = modifiers[type];
    if (modifier) {
        const previousAim = position.aim;
        position.aim += modifier.aim * amount;
        position.horizontal += modifier.horizontal * amount;
        position.depth += modifier.depth * previousAim * amount;
    }
}

console.log(`final position: horizontal: ${position.horizontal} , depth: ${position.depth}`);
console.log(`value: ${position.horizontal * position.depth}`);
