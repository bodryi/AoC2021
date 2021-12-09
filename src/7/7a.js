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
    fuelCostsMap[i] += Math.abs(initialPositions[p] - i);
  }
}

console.log('Result:', Math.min(...Object.values(fuelCostsMap)));
