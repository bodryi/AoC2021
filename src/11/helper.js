const FLASH_ENERGY_THRESHOLD = 9;

class DumboOctopus {
  x;
  y;
  energy;
  flashed = false;

  get readyToFlash() {
    return this.energy > FLASH_ENERGY_THRESHOLD && !this.flashed;
  }

  constructor(x, y, energy = 0) {
    this.x = x;
    this.y = y;
    this.energy = energy;
  }

  accumulate() {
    if (this.flashed) {
      return;
    }
    this.energy++;
  }

  flash() {
    this.energy = 0;
    this.flashed = true;
  }

  resetFlashed() {
    this.flashed = false;
  }
}

function getReadyToFlashOctopuses(octs) {
  const readyToFlash = [];
  for (let y = 0; y < octs.length; y++) {
    for (let x = 0; x < octs[y].length; x++) {
      if (octs[y][x].readyToFlash) {
        readyToFlash.push(octs[y][x]);
      }
    }
  }

  return readyToFlash;
}

function getFlashedOctopuses(octs) {
  const flashed = [];
  for (let y = 0; y < octs.length; y++) {
    for (let x = 0; x < octs[y].length; x++) {
      if (octs[y][x].flashed) {
        flashed.push(octs[y][x]);
      }
    }
  }

  return flashed;
}

function getAdjacent(octopus, octs) {
  const { x, y } = octopus;
  return [
    octs[y - 1]?.[x],
    octs[y + 1]?.[x],
    octs[y]?.[x - 1],
    octs[y]?.[x + 1],
    octs[y - 1]?.[x - 1],
    octs[y - 1]?.[x + 1],
    octs[y + 1]?.[x - 1],
    octs[y + 1]?.[x + 1],
  ].filter((o) => !!o);
}

function accumulateStep(octs) {
  for (let y = 0; y < octs.length; y++) {
    for (let x = 0; x < octs[y].length; x++) {
      octs[y][x].accumulate();
    }
  }
}

function flashStep(octs) {
  let readyToFlash = getReadyToFlashOctopuses(octs);

  while (readyToFlash.length) {
    readyToFlash.forEach((o) => o.flash());
    readyToFlash.forEach((o) => {
      const adjacent = getAdjacent(o, octs);
      adjacent.forEach((a) => a.accumulate());
    });

    readyToFlash = getReadyToFlashOctopuses(octs);
  }
}

function resetStep(octs) {
  for (let y = 0; y < octs.length; y++) {
    for (let x = 0; x < octs[y].length; x++) {
      octs[y][x].resetFlashed();
    }
  }
}

module.exports = {
  DumboOctopus,
  getFlashedOctopuses,
  accumulateStep,
  flashStep,
  resetStep,
};
