const matrix = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"]
];

const m = 3; // matrix sizes
const n = 3;

function spiralMatrix(matrix, m, n) {
  // mn - matrix sizes
  let answer = "";

  let i = 0; // current element
  let j = 0;

  // used elements will be coded like 'i/j': true
  const usedElements = {};

  // direction of movement in matrix
  // change order 'right', 'down', 'left', 'up'
  let currentDirection = "right";

  // returning instead of reasining to can test direction before using
  function whichWillBeNextDirection(direction) {
    if (direction === "right") {
      return "down";
    }
    if (direction === "down") {
      return "left";
    }
    if (direction === "left") {
      return "up";
    }
    if (direction === "up") {
      return "right";
    }
  }

  // can be used with real or testing direction
  function nextElementIndexes(direction) {
    if (direction === "right") {
      return [i, j + 1];
    }
    if (direction === "down") {
      return [i + 1, j];
    }
    if (direction === "left") {
      return [i, j - 1];
    }
    if (direction === "up") {
      return [i - 1, j];
    }
  }

  function isElementValidBySize(testedI, testedJ) {
    return testedI >= 0 && testedI < m && testedJ >= 0 && testedJ < n;
  }

  function isElementUsed(testedI, testedJ) {
    return !!usedElements[testedI + "/" + testedJ];
  }

  function makeElementUsed(usedI, usedJ) {
    usedElements[usedI + "/" + usedJ] = true;
  }

  function isElementValid(testedI, testedJ) {
    return (
      isElementValidBySize(testedI, testedJ) && !isElementUsed(testedI, testedJ)
    );
  }

  function isDirectionValid(direction) {
    return isElementValid(...nextElementIndexes(direction));
  }

  while (true) {
    // will be controlled from inside
    if (!i && !j) {
      answer += matrix[i][j];
    } else {
      answer += " " + matrix[i][j];
    }
    makeElementUsed(i, j);
    if (isDirectionValid(currentDirection)) {
      [i, j] = nextElementIndexes(currentDirection);
      continue;
    }
    if (isDirectionValid(whichWillBeNextDirection(currentDirection))) {
      currentDirection = whichWillBeNextDirection(currentDirection);
      [i, j] = nextElementIndexes(currentDirection);
      continue;
    }
    break; // defense against endles loop
  }

  return answer;
}

console.log(spiralMatrix(matrix, m, n));
