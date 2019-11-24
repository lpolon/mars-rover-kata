/* eslint-disable default-case */
const options = require('./options');

const helper = {
  randomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  stringPathBlock(cardinalDirection, roverName, roverRow, roverColumn) {
    switch (cardinalDirection) {
      case 'N':
        return `The ${roverName} rover didn't move northward. position: r = ${roverRow}, c = ${roverColumn} ${options.outOfBoundsMsg}`;
      case 'S':
        return `The ${roverName} rover didn't move southward. position: r = ${roverRow}, c = ${roverColumn} ${options.outOfBoundsMsg}`;
      case 'W':
        return `The ${roverName} rover didn't move westward. position: r = ${roverRow}, c = ${roverColumn} ${options.outOfBoundsMsg}`;
      case 'E':
        return `The ${roverName} rover didn't move eastward. position: r = ${roverRow}, c = ${roverColumn} ${options.outOfBoundsMsg}`;
    }
  },
  stringMove(cardinalDirection, roverName, roverRow, roverColumn) {
    switch (cardinalDirection) {
      case 'N':
        return `The ${roverName} rover moved northward. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'S':
        return `The ${roverName} rover moved southward. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'W':
        return `The ${roverName} rover moved westward. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'E':
        return `The ${roverName} rover moved eastward. position: r = ${roverRow}, c = ${roverColumn}`;
    }
  },
  stringMoveReverse(cardinalDirection, roverName, roverRow, roverColumn) {
    switch (cardinalDirection) {
      case 'N':
        return `The ${roverName} rover moved northward in reverse. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'S':
        return `The ${roverName} rover moved southward in reverse. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'W':
        return `The ${roverName} rover moved westward in reverse. position: r = ${roverRow}, c = ${roverColumn}`;
      case 'E':
        return `The ${roverName} rover moved eastward in reverse. position: r = ${roverRow}, c = ${roverColumn}`;
    }
  },

  stringObstacle(
    roverName,
    obstaclePositionRow,
    obstaclePositionColumn,
    roverRow,
    roverColumn
  ) {
    return `The ${roverName} rover found a obstacle ahead at r = ${obstaclePositionRow}, c = ${obstaclePositionColumn} and can't move on. ${roverName}'s position: r = ${roverRow}, c = ${roverColumn}`;
  },

  checkGearToLogMove(gear, cardinalDirection, name, roverRow, roverColumn) {
    if (gear === 'f') {
      console.log(
        this.stringMove(cardinalDirection, name, roverRow, roverColumn)
      );
    } else if (gear === 'r') {
      console.log(
        this.stringMoveReverse(cardinalDirection, name, roverRow, roverColumn)
      );
    } else {
      return 'gear is not "r" or "f" and this line should never happen';
    }
  }
};

module.exports = helper;
