const { inputData } = require('./input');

const parsedData = inputData.split('\n').map((d) => +d);

let depthIncreasesTimes = 0;
for (let i = 1; i < parsedData.length; i++) {
  if (parsedData[i - 1] < parsedData[i]) {
    depthIncreasesTimes++;
  }
}

console.log('Result:', depthIncreasesTimes);
