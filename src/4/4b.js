const { inputNumbers, inputBoards } = require('./input');
const { Board } = require('./helper');

const parsedNumbers = inputNumbers.split(',').map((n) => +n);
const parsedBoards = inputBoards.split('\n\n').map((b) => b.trim().split('\n'));
const boards = parsedBoards.map((pb) => new Board(pb));

let lastWinnerBoardIndex;
let lastMarkedNumber;
for (let i = 0; i < parsedNumbers.length; i++) {
  for (const board of boards) {
    board.markNumber(parsedNumbers[i]);
  }

  const boardsNotWon = boards.filter((b) => !b.boardWon);
  if (boardsNotWon.length === 1) {
    lastWinnerBoardIndex = boards.findIndex((b) => !b.boardWon);
  }

  if (!boardsNotWon.length) {
    lastMarkedNumber = parsedNumbers[i];
    break;
  }
}

const unmarkedNumbersSum = boards[lastWinnerBoardIndex].unmarkedNumbers.reduce(
  (sum, num) => sum + num,
  0,
);

console.log('Result:', unmarkedNumbersSum * lastMarkedNumber);
