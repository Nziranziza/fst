/**
 * @description Generate a random index
 * Based on provided max and min values
 * if min is not provided, 0 is used
 * @param {number} max
 * @param {number} min
 * @returns {number} index
 */
function generateRandomIndex(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {string} string
 * @param {number} index
 * @param {string} replacement
 * @returns {string} newString
 */
function replaceAt(string, index, replacement) {
  return `${string.substring(0, index)}${replacement}${string.substring(
    index + replacement.length
  )}`;
}
/**
 * @description Check for winner given a specific row or column
 * @param {string[]} row
 * @returns {string}
 */
export function whoWon(row) {
  const rowLength = row.length;
  const { x, o } = row.reduce(
    (prev, cur) => {
      if (!cur) {
        return prev;
      }
      return {
        ...prev,
        [cur]: prev[cur] + 1,
      };
    },
    { x: 0, o: 0 }
  );

  if (x === rowLength) {
    return "x";
  }
  if (o === rowLength) {
    return "o";
  }
  return null;
}

/**
 * @description Get the winner from the board
 * if the no winner and there is no possible move
 * return tie true
 * @param {string} board
 * @returns { winner: string; tie: boolean }
 */
export function getWinner(board) {
  const boardArray = [
    board.slice(0, 3).split(""),
    board.slice(3, 6).split(""),
    board.slice(6, 9).split(""),
  ];
  let winner = null;
  let tie = false;
  for (let x = 0; x < boardArray.length; x++) {
    // Check for rows
    winner = whoWon(boardArray[x]);
    if (winner) {
      return {
        winner,
        tie,
      };
    }

    // Check for columns
    const col = boardArray.map((_, y) => boardArray[y][x]);
    winner = whoWon(col);
    if (winner) {
      return {
        winner,
        tie,
      };
    }
  }
  // Check for diagonal
  const diagonals = [boardArray.map((_, index) => boardArray[index][index])];
  diagonals.push(
    boardArray.map(
      (_, index) => boardArray[index][boardArray.length - 1 - index]
    )
  );

  for (let i = 0; i < diagonals.length; i++) {
    const diagonal = diagonals[i];
    winner = whoWon(diagonal);
    if (winner) {
      return {
        winner,
        tie,
      };
    }
  }

  // Check for a tie
  tie = !boardArray.find((row) => {
    return row.find((col) => col === " ") === " ";
  });

  return {
    winner,
    tie,
  };
}

/**
 * @description Should detech computer next move
 * and generate a new board
 * @param {string} board
 * @returns {string} board
 */
export function playNext(board) {
  const emptySpaces = board
    .split("")
    .map((space, index) => (space === " " ? index : null))
    .filter((index) => index);
  const nextMove = generateRandomIndex(emptySpaces.length - 1);
  return replaceAt(board, emptySpaces[nextMove], "o");
}
