/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
// create player object and where it will be placed
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
        this._moveFoward();
      } else if (e === 'b') {
        this._moveBackward();
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
            `The ${this.name} rover didn't move northward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
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
            `The ${this.name} rover didn't move westward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
          );
        }
        break;
      case 'S':
        console.log(this.position.r);
        console.log(this.planet.board[this.position.r][0].o);
        if (this.position.r + 1 <= this.planet.board.length ) {
          this.position.r++;
          console.log(this.position.r);
          const newPosition = { r: this.position.r, c: this.position.c };
          this.travelLog.push(newPosition);
          console.log(
            `The ${this.name} rover moved southward. position: r = ${this.position.r}, c = ${this.position.c}`
          );
        } else {
          `The ${this.name} rover didn't move southward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`;
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
            `The ${this.name} rover didn't move eastward. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
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
          `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`;
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
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
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
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
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
            `The ${this.name} rover couldn't go further. position: r = ${this.position.r}, c = ${this.position.c} ${this.msg.outOfBoundsMsg}`
          );
        }
        break;
    }
  }
}

module.exports = Rover;