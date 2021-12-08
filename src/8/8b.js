const { inputData } = require('./input');
const {
  ONE_LENGTH,
  FOUR_LENGTH,
  SEVEN_LENGTH,
  EIGHT_LENGTH,
} = require('./helper');

function mapToDigits(sequence) {
  const digits = {};
  digits[1] = sequence.find((s) => s.length === ONE_LENGTH);
  digits[4] = sequence.find((s) => s.length === FOUR_LENGTH);
  digits[7] = sequence.find((s) => s.length === SEVEN_LENGTH);
  digits[8] = sequence.find((s) => s.length === EIGHT_LENGTH);

  const zeroSixNines = sequence.filter((s) => s.length === 6);
  const twoThreeFives = sequence.filter((s) => s.length === 5);

  /**
   * 6 is 8 without half of 1.
   */
  digits[6] = zeroSixNines.find((s) => {
    const signalChars = s.split('');
    const one = digits[1];
    return (
      (signalChars.indexOf(one[0]) > -1 &&
        signalChars.indexOf(one[1]) === -1) ||
      (signalChars.indexOf(one[1]) > -1 && signalChars.indexOf(one[0]) === -1)
    );
  });

  /**
   * 5 is 6 without one segment.
   */
  digits[5] = twoThreeFives.find(
    (s) => digits[6].split('').filter((c) => s.indexOf(c) === -1).length === 1,
  );

  /**
   * 9 is 5 and 1 combined.
   */
  digits[9] = zeroSixNines.find(
    (s) =>
      s ===
      [...new Set([...digits[1].split(''), ...digits[5].split('')])]
        .sort()
        .join(''),
  );

  digits[0] = zeroSixNines.find((s) => s !== digits[6] && s !== digits[9]);

  /**
   * 3 is 9 without one segment and not equals 5.
   */
  digits[3] = twoThreeFives.find(
    (s) =>
      s !== digits[5] &&
      digits[9].split('').filter((c) => s.indexOf(c) === -1).length === 1,
  );

  digits[2] = twoThreeFives.find((s) => s !== digits[3] && s !== digits[5]);

  return digits;
}

const parsedData = inputData.split('\n').map((r) => r.split(' | '));
const signals = parsedData.map(([patterns, output]) => ({
  patterns: patterns.split(' ').map((s) => s.split('').sort().join('')),
  output: output.split(' ').map((s) => s.split('').sort().join('')),
}));

const decodedOutputs = signals.map(({ patterns, output }) => {
  const mappedToDigits = mapToDigits([...patterns, ...output]);
  const sortedCollection = Object.values(mappedToDigits).sort(
    (a, b) => a[0] - b[0],
  );

  return output.reduce(
    (res, command) => res + sortedCollection.indexOf(command),
    '',
  );
});
const result = decodedOutputs.reduce((sum, num) => sum + +num, 0);

console.log('Result:', result);
