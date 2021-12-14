function applyInsertion(pairCounter, rules) {
  const pairs = Object.keys(pairCounter);
  const newPairCounter = {};
  for (let i = 0; i < pairs.length; i++) {
    const rule = rules.find((r) => r.between === pairs[i]);
    if (rule) {
      const count = pairCounter[pairs[i]];
      const left = pairs[i][0] + rule.insert;
      const right = rule.insert + pairs[i][1];
      newPairCounter[left] = newPairCounter[left]
        ? newPairCounter[left] + count
        : count;
      newPairCounter[right] = newPairCounter[right]
        ? newPairCounter[right] + count
        : count;
    }
  }

  return newPairCounter;
}

function countSingleElements(pairsCounter) {
  return Object.keys(pairsCounter).reduce((c, pair, i, arr) => {
    const [first, last] = pair.split('');
    c[first] = c[first] ? c[first] + pairsCounter[pair] : pairsCounter[pair];

    if (i === arr.length - 1) {
      c[last] = c[last] ? c[last] + 1 : 1;
    }

    return c;
  }, {});
}

module.exports = {
  applyInsertion,
  countSingleElements
};
