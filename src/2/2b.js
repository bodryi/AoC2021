const { inputData } = require('./input');
const { AimPosition, movePosition } = require('./helper');

const submarineAimPosition = new AimPosition();

const parsedData = inputData.split('\n').map((c) => {
  const splitCommand = c.split(' ');
  return {
    command: splitCommand[0],
    step: +splitCommand[1],
  };
});

parsedData.forEach((c) =>
  movePosition(submarineAimPosition, c.command, c.step),
);

console.log(
  'Result:',
  submarineAimPosition.horizontal * submarineAimPosition.depth,
);
