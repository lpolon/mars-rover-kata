/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
// create player object and where it will be placed

const helper = require('./helper');

class Rover {
  constructor(name, planet, msg) {
    this.name = name;
    this._direction = 'N'; // there is a setter to change this property
    // choose a random position to deploy:
    this.position = { r: 0, c: 0 };
    this.travelLog = [{ r: 0, c: 0 }];
    this.planet = planet;
    this.msg = msg;
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

    if (this.msg.blockBadInputs) {
      if (
        flattenedNewInputArr.every(e => {
          return ['f', 'b', 'l', 'r'].includes(e);
        })
      ) {
        return flattenedNewInputArr;
      } else {
        console.log(
          `one or more inputs for .inputCommand() are invalid. Please only pass strings or objects with the values: ${[
            'f',
            'b',
            'l',
            'r'
          ]}`
        );
      }
    } else if (!this.msg.blockBadInputs) {
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
        this._moveFoward(this._direction, 'f');
      } else if (e === 'b') {
        this._moveBackward(this._direction, 'r');
      } else if (e === 'l') {
        this._turnLeft();
      } else if (e === 'r') {
        this._turnRight();
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

  _moveN(cardinalDirection, gear) {
    if (this.position.r - 1 >= 0) {
      const nextPositionOnPlanet = this.planet.board[this.position.r - 1][0];
      if (nextPositionOnPlanet.o === false) {
        this.position.r--;
        const newPosition = { r: this.position.r, c: this.position.c };
        this.travelLog.push(newPosition);
        helper.checkGearToLogMove(gear, cardinalDirection, this.name, this.position.r, this.position.c);
      } else {
        console.log(
          helper.stringObstacle(this.name, nextPositionOnPlanet.r, nextPositionOnPlanet.c, this.position.r, this.position.c),
        );
      }
    } else {
      console.log(
        helper.stringPathBlock(cardinalDirection, this.name, this.position.r, this.position.c),
      );
    }
  }

  _moveW(cardinalDirection, gear) {
    if (this.position.c - 1 >= 0) {
      const nextPositionOnPlanet = this.planet.board[0][this.position.c - 1];
      if (nextPositionOnPlanet.o === false) {
        this.position.c--;
        const newPosition = { r: this.position.r, c: this.position.c };
        this.travelLog.push(newPosition);
        helper.checkGearToLogMove(gear, cardinalDirection, this.name, this.position.r, this.position.c);
      } else {
        console.log(
          helper.stringObstacle(this.name, nextPositionOnPlanet.r, nextPositionOnPlanet.c, this.position.r, this.position.c),
        );
      }
    } else {
      console.log(
        helper.stringPathBlock(cardinalDirection, this.name, this.position.r, this.position.c)
      );
    }
  }

  _moveS(cardinalDirection, gear) {
    if (this.position.r + 1 < this.planet.board.length) {
      const nextPositionOnPlanet = this.planet.board[this.position.r + 1][0];
      if (nextPositionOnPlanet.o === false) {
        this.position.r++;
        const newPosition = { r: this.position.r, c: this.position.c };
        this.travelLog.push(newPosition);
        helper.checkGearToLogMove(gear, cardinalDirection, this.name, this.position.r, this.position.c);
      } else {
        console.log(
          helper.stringObstacle(this.name, nextPositionOnPlanet.r, nextPositionOnPlanet.c, this.position.r, this.position.c),
        );
      }
    } else {
      console.log(
        helper.stringPathBlock(cardinalDirection, this.name, this.position.r, this.position.c),
      );
    }
  }

  _moveE(cardinalDirection, gear) {
    if (this.position.c + 1 < this.planet.board[0].length) {
      const nextPositionOnPlanet = this.planet.board[0][this.position.c + 1];
      if (nextPositionOnPlanet.o === false) {
        this.position.c++;
        const newPosition = { r: this.position.r, c: this.position.c };
        this.travelLog.push(newPosition);
        helper.checkGearToLogMove(gear, cardinalDirection, this.name, this.position.r, this.position.c);
      } else {
        console.log(
          helper.stringObstacle(this.name, nextPositionOnPlanet.r, nextPositionOnPlanet.c, this.position.r, this.position.c),
        );
      }
    } else {
      console.log(
        helper.stringPathBlock(cardinalDirection, this.name, this.position.r, this.position.c),
      );
    }
  }

  _moveFoward(cardinalDirection, gear) {
    switch (cardinalDirection) {
      case 'N':
        this._moveN('N', gear);
        break;
      case 'W':
        this._moveW('W', gear);
        break;
      case 'S':
        this._moveS('S', gear);
        break;
      case 'E':
        this._moveE('E', gear);
        break;
    }
  }

  _moveBackward(cardinalDirection, gear) {
    switch (cardinalDirection) {
      case 'N':
        this._moveS('S', gear);
        break;
      case 'W':
        this._moveE('E', gear);
        break;
      case 'S':
        this._moveN('N', gear);
        break;
      case 'E':
        this._moveW('W', gear);
        break;
    }
  }
}

module.exports = Rover;
