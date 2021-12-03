const { inputData } = require('./input');
const { movePosition, Position } = require('./helper');

const submarinePosition = new Position();

const parsedData = inputData.split('\n').map((c) => {
  const splitCommand = c.split(' ');
  return {
    command: splitCommand[0],
    step: +splitCommand[1],
  };
});

parsedData.forEach((c) => movePosition(submarinePosition, c.command, c.step));

console.log('Result:', submarinePosition.horizontal * submarinePosition.depth);
