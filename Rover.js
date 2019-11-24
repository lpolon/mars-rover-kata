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
          `one or more inputs for .move() are invalid. Please only pass strings or objects with the values: ${[
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
        this._moveFoward(this._direction);
      } else if (e === 'b') {
        this._moveBackward(this._direction);
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

  _moveFoward(cardinalDirection) {
    switch (cardinalDirection) {
      case 'N':
        if (this.position.r - 1 > 0) {
          if (this.planet.board[this.position.r - 1][0].o === false) {
            this.position.r--;
            const newPosition = { r: this.position.r, c: this.position.c };
            this.travelLog.push(newPosition);
            console.log(
              `The ${this.name} rover moved northward. position: r = ${this.position.r}, c = ${this.position.c}`
            );
          } else {
            console.log(
              `The ${this.name} rover found a obstacle ahead at r = ${
                this.planet.board[0][this.position.c + 1].r
              }, c = ${
                this.planet.board[0][this.position.c + 1].c
              } and can't move on. ${this.name}'s position: r = ${
                this.position.r
              }, c = ${this.position.c}`
            );
          }
        } else {
          console.log(
            helper.logPathBlock(cardinalDirection, this.name, this.position.r, this.position.c)
          );
        }
        break;
      case 'W':
        if (this.position.c - 1 >= 0) {
          if (this.planet.board[0][this.position.c - 1].o === false) {
            this.position.c--;
            const newPosition = { r: this.position.r, c: this.position.c };
            this.travelLog.push(newPosition);
            console.log(
              `The ${this.name} rover moved westward. position: r = ${this.position.r}, c = ${this.position.c}`
            );
          } else {
            console.log(
              `The ${this.name} rover found a obstacle ahead at r = ${
                this.planet.board[0][this.position.c + 1].r
              }, c = ${
                this.planet.board[0][this.position.c + 1].c
              } and can't move on. ${this.name}'s position: r = ${
                this.position.r
              }, c = ${this.position.c}`
            );
          }
        } else {
          console.log(
            `The ${this.name} rover didn't move westward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
          );
        }
        break;
      case 'S':
        // check border
        if (this.position.r + 1 < this.planet.board.length) {
          // check obstacle property value in rows
          if (this.planet.board[this.position.r + 1][0].o === false) {
            this.position.r++;
            const newPosition = { r: this.position.r, c: this.position.c };
            this.travelLog.push(newPosition);
            console.log(
              `The ${this.name} rover moved southward. position: r = ${this.position.r}, c = ${this.position.c}`
            );
          } else {
            console.log(
              `The ${this.name} rover found a obstacle ahead at r = ${
                this.planet.board[0][this.position.c + 1].r
              }, c = ${
                this.planet.board[0][this.position.c + 1].c
              } and can't move on. ${this.name}'s position: r = ${
                this.position.r
              }, c = ${this.position.c}`
            );
          }
        } else {
          console.log(
            `The ${this.name} rover didn't move southward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
          );
        }
        break;
      case 'E':
        // check border
        if (this.position.c + 1 < this.planet.board[0].length) {
          // check obstacle property value in columns
          if (this.planet.board[0][this.position.c + 1].o === false) {
            this.position.c++;
            const newPosition = { r: this.position.r, c: this.position.c };
            this.travelLog.push(newPosition);
            console.log(
              `The ${this.name} rover moved eastward. position: r = ${this.position.r}, c = ${this.position.c}`
            );
          } else {
            console.log(
              `The ${this.name} rover found a obstacle ahead at r = ${
                this.planet.board[0][this.position.c + 1].r
              }, c = ${
                this.planet.board[0][this.position.c + 1].c
              } and can't move on. ${this.name}'s position: r = ${
                this.position.r
              }, c = ${this.position.c}`
            );
          }
        } else {
          console.log(
            `The ${this.name} rover didn't move eastward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
          );
        }
        break;
    }
  }

  _moveBackward(cardinalDirection) {
    switch (cardinalDirection) {
      case 'N':
        this._moveFoward('S');
        break;
      case 'W':
        this._moveFoward('E')
        break;
      case 'S':
        this._moveFoward('N');
        break;
      case 'E':
        this._moveFoward('W');
        break;
    }
  }
}

module.exports = Rover;
