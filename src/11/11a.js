const { inputData } = require('./input');
const {
  DumboOctopus,
  getFlashedOctopuses,
  accumulateStep,
  flashStep,
  resetStep,
} = require('./helper');

const STEPS = 100;

const octopuses = inputData
  .split('\n')
  .map((r, y) => r.split('').map((e, x) => new DumboOctopus(x, y, +e)));

let flashCounter = 0;
for (let step = 1; step <= STEPS; step++) {
  accumulateStep(octopuses);
  flashStep(octopuses);
  flashCounter += getFlashedOctopuses(octopuses).length;
  resetStep(octopuses);
}

console.log('Result:', flashCounter);
