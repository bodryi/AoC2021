function invert(binaryString) {
  return binaryString
    .split('')
    .map((v) => (v === '1' ? '0' : '1'))
    .join('');
}

function mostCommon(values) {
  const counter = values.reduce((c, value) => {
    c[value] = c[value] ? c[value] + 1 : 1;
    return c;
  }, {});
  return Object.keys(counter).reduce((mostCommon, value) => {
    if (counter[value] >= counter[mostCommon]) {
      mostCommon = value;
    }
    return mostCommon;
  });
}

module.exports = {
  invert,
  mostCommon,
};
