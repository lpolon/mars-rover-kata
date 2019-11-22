// import classes

const Planet = require('./obj-planet');
const Rover = require('./obj-rover');

// game options
const options = {
  outOfBoundsMsg: '\n YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH', // quote from the game baldur's gate. Just a silly joke.
  blockBadInputs: false, // false: invalid inputs are skipped and logged. true: ._parseInput() throws error
};

const mars = new Planet('Mars', 10, 10);
const curiosity = new Rover('Curiosity', mars);

console.log('>');

curiosity.inputCommands('rflrffffbbbb');
console.log(curiosity.travelLog);

console.log(new Date().toLocaleString());

module.exports = options;