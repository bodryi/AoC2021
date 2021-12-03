const { inputData } = require('./input');

const commands = {
  up: 'up',
  down: 'down',
  forward: 'forward',
};

class Position {
  horizontal;
  depth;

  constructor(initialHorizontal = 0, initialDepth = 0) {
    this.horizontal = initialHorizontal;
    this.depth = initialDepth;
  }

  up(step) {
    this.depth -= step;
  }

  down(step) {
    this.depth += step;
  }

  forward(step) {
    this.horizontal += step;
  }
}

const submarinePosition = new Position();

const parsedData = inputData.split('\n').map((c) => {
  const splitCommand = c.split(' ');
  return {
    command: splitCommand[0],
    step: +splitCommand[1],
  };
});

parsedData.forEach((c) => {
  switch (c.command) {
    case commands.up: {
      submarinePosition.up(c.step);
      break;
    }
    case commands.down: {
      submarinePosition.down(c.step);
      break;
    }
    case commands.forward: {
      submarinePosition.forward(c.step);
      break;
    }
    default: {
      throw new Error(`Unknown command: ${c.command}`);
    }
  }
});

console.log('Result:', submarinePosition.horizontal * submarinePosition.depth);
