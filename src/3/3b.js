const { inputData } = require('./input');
const { invert, mostCommon } = require('./helper');

function analyze(numbers, position, criteriaFn) {
  return numbers.filter((number) => criteriaFn(number[position]));
}

const parsedData = inputData.split('\n');
const length = parsedData[0].length;

let oxygenLogs = [...parsedData];
for (let i = 0; i < length; i++) {
  const mostCommonValue = mostCommon(oxygenLogs.map((v) => v[i]));
  oxygenLogs = analyze(oxygenLogs, i, (value) => value === mostCommonValue);

  if (oxygenLogs.length === 1) {
    break;
  }
}
const oxygenRate = oxygenLogs[0];

let co2Logs = [...parsedData];
for (let i = 0; i < length; i++) {
  const leastCommonValue = invert(mostCommon(co2Logs.map((v) => v[i])));
  co2Logs = analyze(co2Logs, i, (value) => value === leastCommonValue);
  if (co2Logs.length === 1) {
    break;
  }
}
const co2Rate = co2Logs[0];
console.log('Result:', parseInt(oxygenRate, 2) * parseInt(co2Rate, 2));
