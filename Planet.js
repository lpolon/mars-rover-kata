const helper = require('./helper');

class Planet {
  constructor(name, numOfRows, numOfColumns, prob) {
    // check parameters
    if (typeof prob === 'undefined') {
      prob = 0;
    }
    if (
      typeof numOfRows === 'undefined'
      || typeof numOfColumns === 'undefined'
    ) {
      console.log(
        `error: number or Rows or Columns was undefined. Please declare it`
      );
      throw `number or Rows or Columns was undefined. Please declare it`;
    }
    if (numOfRows < 3 && numOfColumns < 3) {
      // console.log(`number of Rows and columns must be higher than 2!`)
      console.log(`error: number of Rows and columns must be higher than 2`);
      // eu não consegui catch(e) {console.error(e)} isso aqui.
      throw `number of Rows and columns must be higher than 2`;
    }
    const createBoard = (numOfRows, numOfColumns) => {
      const board = [];
      for (let i = 0; i < numOfRows; i++) {
        const rowArr = [];
        for (let j = 0; j < numOfColumns; j++) {
          if (prob >= helper.randomIntegerInRange(0, 100)) {
            rowArr.push({ r: i, c: j, o: true });
          } else {
            rowArr.push({ r: i, c: j, o: false });
          }
        }
        board.push(rowArr);
      }
      return board;
    };
    this.board = createBoard(numOfRows, numOfColumns);
    this.name = name;
  }
}

module.exports = Planet;
