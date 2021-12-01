const { inputData } = require('./input');

function mapToSlidingWindows(windowLength) {
  return function (_, index, data) {
    if (index + (windowLength - 1) < data.length) {
      let windowValue = 0;
      for (let i = index; i <= index + (windowLength - 1); i++) {
        windowValue += data[i];
      }
      return windowValue;
    } else {
      return null;
    }
  };
}

const parsedData = inputData
  .split('\n')
  .map((d) => +d)
  .map(mapToSlidingWindows(3))
  .filter((n) => !!n || n === 0);

let depthIncreasesTimes = 0;
for (let i = 1; i < parsedData.length; i++) {
  if (parsedData[i - 1] < parsedData[i]) {
    depthIncreasesTimes++;
  }
}

console.log('Result:', depthIncreasesTimes);
