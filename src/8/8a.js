const { inputData } = require('./input');
const {
  ONE_LENGTH,
  FOUR_LENGTH,
  SEVEN_LENGTH,
  EIGHT_LENGTH,
} = require('./helper');

const parsedData = inputData.split('\n').map((r) => r.split(' | '));
const signals = parsedData.map(([patterns, output]) => ({
  patterns: patterns.split(' '),
  output: output.split(' '),
}));

function countEasyDigits(output) {
  return (
    output.filter(
      (s) =>
        s.length === ONE_LENGTH ||
        s.length === FOUR_LENGTH ||
        s.length === SEVEN_LENGTH ||
        s.length === EIGHT_LENGTH,
    )?.length || 0
  );
}

const result = signals
  .map((s) => countEasyDigits(s.output))
  .reduce((sum, count) => sum + count, 0);

console.log('Result:', result);
