/*
Eu tentei organizar sempre pensando em como tornar o código reutilizável e fácil de entender. Tentei utilizar as coisas que eu aprendi no material da Ironhack e também no que eu já tinha estudado pelo codeAcademy. Por favor, não deixem de me explicar o que não faz sentido na forma de organizar, maus hábitos, etc... Obrigado!
*/

/*
status:
bugs: não achei nenhum
iterações de 1 até 5 concluídas.
bonus de 1 até 3 concluídas

to-do:
- bonus 4: obstáculos
- bonus 4: other rovers // 
- getters interessantes. p.ex.: status, ou um travel log mais legal..

method ._checkColision()
how to make many players move at the same time?
*/

// game options
const options = {
  outOfBoundsMsg: '\n YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH', // this is a quote from Baldur's gate. It doesn't make a lot of sense here. You just hear it a lot while you are "stuck" in the border of the screen waiting for your party xD
  blockBadInputs: false // false: invalid inputs are skipped and logged. true: ._parseInput() throws error
};

// create board (custom size)
class Planet {
  constructor(name, numOfRows, numOfColumns) {
    // check parameters
    if (
      typeof numOfRows === 'undefined' ||
      typeof numOfColumns === 'undefined'
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
          rowArr.push({ r: i, c: j });
        }
        board.push(rowArr);
      }
      return board;
    };
    this.board = createBoard(numOfRows, numOfColumns);
    this.name = name;
  }
}
// create player object and where it will be placed
class Rover {
  constructor(name, planet) {
    this.name = name;
    this._direction = 'N'; // there is a setter to change this property
    this.position = { r: 0, c: 0 };
    this.travelLog = [{ r: 0, c: 0 }];
    this.planet = planet;
  }
  set direction(newDirection) {
    if (
      ['N', 'S', 'E', 'W'].includes(newDirection) &&
      typeof newDirection === 'string'
    ) {
      this._direction = newDirection;
    } else {
      console.log('invalid input for direction assignment');
    }
  }
  _parseInput(inputArr) {
    const newInputArr = [];
    // split strings
    inputArr.forEach(e => {
      if (e.length > 1) {
        newInputArr.push(e.split(''));
      } else {
        newInputArr.push(e);
      }
    });
    const flattenedNewInputArr = newInputArr.flat(1);

    if (options.blockBadInputs) {
      if (
        flattenedNewInputArr.every(e => {
          return ['f', 'b', 'l', 'r'].includes(e);
        })
      ) {
        return flattenedNewInputArr;
      } else {
        console.log(
          `one or more inputs for .move() are invalid. Please only pass strings or objects with the values: ${[
            'f',
            'b',
            'l',
            'r'
          ]}`
        );
      }
    } else if (!options.blockBadInputs) {
      const filteredflattenedNewInputArr = [];
      const removedInputValues = [];
      flattenedNewInputArr.forEach(e => {
        if (['f', 'b', 'l', 'r'].includes(e)) {
          filteredflattenedNewInputArr.push(e);
        } else {
          removedInputValues.push(e);
          return;
        }
      });
      if (removedInputValues.length > 0) {
        console.log(
          `the following inputs were invalid and ignored: ${removedInputValues}`
        );
      }
      return filteredflattenedNewInputArr;
    }
  }
  inputCommands(...newInput) {
    const parsedInputArr = this._parseInput(newInput);
    parsedInputArr.forEach(e => {
      console.log('input: ' + e);
      if (e === 'f') {
        this._moveFoward();
        return;
      } else if (e === 'b') {
        this._moveBackward();
        return;
      } else if (e === 'l') {
        this._turnLeft();
        return;
      } else if (e === 'r') {
        this._turnRight();
        return;
      }
    });
    return 'end of routine';
  }
  _turnLeft() {
    switch (this._direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'N';
        break;
    }
    console.log(
      `The ${this.name} rover turned left and is now facing: ${this._direction}`
    );
  }
  _turnRight() {
    switch (this._direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
    }
    console.log(
      `The ${this.name} rover turned right and is now facing: ${this._direction}`
    );
  }
  _moveFoward() {
    switch (this._direction) {
      case 'N':
        if (this.position.r - 1 >= 0) {
          this.position.r--;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved northward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover didn't move northward. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
      case 'W':
        if (this.position.c - 1 >= 0) {
          this.position.c--;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved westward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover didn't move westward. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
      case 'S':
        if (this.position.r + 1 <= this.planet.board.length) {
          this.position.r++;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved southward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          `The ${this.name} rover didn't move southward. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`;
        }
        break;
      case 'E':
        if (this.position.c + 1 <= this.planet.board[0].length) {
          this.position.c++;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved eastward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover didn't move eastward. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
    }
  }
  _moveBackward() {
    switch (this._direction) {
      case 'N':
        if (this.position.r + 1 <= this.planet.board.length) {
          this.position.r++;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved, in reverse, southward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`;
        }
        break;
      case 'W':
        if (this.position.c + 1 <= this.planet.board[0].length) {
          this.position.c++;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved, in reverse, eastward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
      case 'S':
        if (this.position.r - 1 >= 0) {
          this.position.r--;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved, in reverse, northward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
      case 'E':
        if (this.position.c - 1 >= 0) {
          this.position.c--;
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved, in reverse, westward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          console.log(
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${options.outOfBoundsMsg}`
          );
        }
        break;
    }
  }
} // end of Rover Class

const mars = new Planet('Mars', 10, 10);
const curiosity = new Rover('Curiosity', mars);

console.log('>');

curiosity.inputCommands('rflrffffbbbb');
curiosity.inputCommands('fffffffffffffffffffffffffffffffllllll', 'r', 'l');
console.log(curiosity.travelLog);

console.log(new Date().toLocaleString());
