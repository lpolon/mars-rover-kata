// import classes

const Planet = require('./Planet');
const Rover = require('./Rover');
// const helper = require('./helper');

// game options
const options = {
  outOfBoundsMsg: '\n YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH',
  blockBadInputs: false, // false: invalid inputs are skipped and logged. true: ._parseInput() throws error
};

const mars = new Planet('Mars', 3, 3, 0);
const curiosity = new Rover('Curiosity', mars, options);
console.log('>');

console.log('mars.board: \n',mars.board);
console.log('curiosity.position: \n',curiosity.position);
curiosity.inputCommands('rffff');
console.log(curiosity.travelLog);

console.log(new Date().toLocaleString());