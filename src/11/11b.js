const { inputData } = require('./input');
const {
  DumboOctopus,
  getFlashedOctopuses,
  accumulateStep,
  flashStep,
  resetStep,
} = require('./helper');

const octopuses = inputData
  .split('\n')
  .map((r, y) => r.split('').map((e, x) => new DumboOctopus(x, y, +e)));

let step = 0;
while (true) {
  step++;
  accumulateStep(octopuses);
  flashStep(octopuses);
  const flashedSimultaneously = getFlashedOctopuses(octopuses).length;
  if (flashedSimultaneously === 100) {
    break;
  }
  resetStep(octopuses);
}

console.log('Result:', step);
