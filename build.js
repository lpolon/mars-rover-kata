// import classes

const Planet = require('./Planet');
const Rover = require('./Rover');
// const helper = require('./helper');

// game options
const options = {
  outOfBoundsMsg: '\n YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH',
  blockBadInputs: false, // false: invalid inputs are skipped and logged. true: ._parseInput() throws error
};

const mars = new Planet('Mars', 5, 5, 70);
const curiosity = new Rover('Curiosity', mars, options);
console.log('>');

curiosity.inputCommands('rrf');
// console.log(curiosity.travelLog);

console.log(new Date().toLocaleString());