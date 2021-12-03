const { inputData } = require('./input');
const { invert, mostCommon } = require('./helper');

const parsedData = inputData.split('\n');

const length = parsedData[0].length;

let gammaRate = '';
for (let i = 0; i < length; i++) {
  gammaRate += mostCommon(parsedData.map((v) => v[i]));
}

const epsilonRate = invert(gammaRate);

console.log('Result:', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
