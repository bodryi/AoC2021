const commands = {
  up: 'up',
  down: 'down',
  forward: 'forward',
};

class BasePosition {
  horizontal;
  depth;

  constructor(initialHorizontal = 0, initialDepth = 0) {
    this.horizontal = initialHorizontal;
    this.depth = initialDepth;
  }

  up(step) {}
  down(step) {}
  forward(step) {}
}

class Position extends BasePosition {
  constructor(initialHorizontal = 0, initialDepth = 0) {
    super(initialHorizontal, initialDepth);
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

class AimPosition extends BasePosition {
  aim;

  constructor(initialHorizontal = 0, initialDepth = 0, initialAim = 0) {
    super(initialHorizontal, initialDepth);
    this.aim = initialAim;
  }

  up(step) {
    this.aim -= step;
  }

  down(step) {
    this.aim += step;
  }

  forward(step) {
    this.horizontal += step;
    this.depth += this.aim * step;
  }
}

function movePosition(position, command, step) {
  switch (command) {
    case commands.up: {
      position.up(step);
      break;
    }
    case commands.down: {
      position.down(step);
      break;
    }
    case commands.forward: {
      position.forward(step);
      break;
    }
    default: {
      throw new Error(`Unknown command: ${command}`);
    }
  }
}

module.exports = {
  Position,
  AimPosition,
  movePosition,
};
