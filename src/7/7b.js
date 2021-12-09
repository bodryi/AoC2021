const { inputData } = require('./input');

const initialPositions = inputData.split(',').map((n) => +n);
const maxPosition = Math.max(...initialPositions);
const minPosition = Math.min(...initialPositions);

const fuelCostsMap = {};
for (let i = minPosition; i <= maxPosition; i++) {
  if (!fuelCostsMap[i]) {
    fuelCostsMap[i] = 0;
  }
  for (let p = 0; p < initialPositions.length; p++) {
    const steps = Math.abs(initialPositions[p] - i);
    const cost = (steps * (steps + 1)) / 2;
    fuelCostsMap[i] += cost;
  }
}

console.log('Result:', Math.min(...Object.values(fuelCostsMap)));
