const { inputData } = require('./input');
const { findCorruptedSymbolIndex } = require('./helper');
const costMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const lines = inputData.split('\n');

const result = lines
  .map((l) => l[findCorruptedSymbolIndex(l)])
  .filter((b) => !!b)
  .map((b) => costMap[b])
  .reduce((sum, cost) => sum + cost, 0);
console.log('Result:', result);
