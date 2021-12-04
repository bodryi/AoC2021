const { inputNumbers, inputBoards } = require('./input');
const { Board } = require('./helper');

const parsedNumbers = inputNumbers.split(',').map((n) => +n);
const parsedBoards = inputBoards.split('\n\n').map((b) => b.trim().split('\n'));
const boards = parsedBoards.map((pb) => new Board(pb));

let firstWinnerBoardIndex;
let lastMarkedNumber;
for (let i = 0; i < parsedNumbers.length; i++) {
  for (const board of boards) {
    board.markNumber(parsedNumbers[i]);
  }
  firstWinnerBoardIndex = boards.findIndex((b) => b.boardWon);

  if (firstWinnerBoardIndex > -1) {
    lastMarkedNumber = parsedNumbers[i];
    break;
  }
}

const unmarkedNumbersSum = boards[firstWinnerBoardIndex].unmarkedNumbers.reduce(
  (sum, num) => sum + num,
  0,
);

console.log('Result:', unmarkedNumbersSum * lastMarkedNumber);
