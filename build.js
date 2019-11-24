// import classes

const Planet = require('./Planet');
const Rover = require('./Rover');
const options = require('./options');
// game options

const mars = new Planet('Mars', 5, 5, 0);
const curiosity = new Rover('Curiosity', mars, options);
console.log('>');
console.log(new Date().toLocaleString());

// console.log(curiosity);

console.log('mars.board: \n',mars.board);
console.log('curiosity.position: \n',curiosity.position);
curiosity.inputCommands('rffrffrrbglfbrfbrfbrfblfblfblfblfblfblfblfbrbfrbfrbfrbfrbfrbfrbfrbfrlbflbflbflbflbflbf');
console.log(curiosity.travelLog);

module.exports = options;