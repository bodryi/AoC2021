const { inputData } = require('./input');
const { lineIncomplete, completeBracketsString } = require('./helper');
const costsMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
const lines = inputData.split('\n');

const completionCosts = lines
  .map((l) => lineIncomplete(l))
  .filter(([incomplete]) => incomplete)
  .map(([, incompletePart]) =>
    completeBracketsString(incompletePart)
      .split('')
      .map((b) => costsMap[b])
      .reduce((sum, cost) => 5 * sum + cost, 0),
  )
  .sort((a, b) => a - b);

console.log('Result:', completionCosts[Math.floor(completionCosts.length / 2)]);
