const { inputData } = require('./input');
const { applyInsertion, countSingleElements } = require('./helper');
const STEPS = 40;

const [startTemplateData, insertionRulesData] = inputData.split('\n\n');
const startTemplate = startTemplateData.split('');
const insertionRules = insertionRulesData.split('\n').map((r) => {
  const [between, insert] = r.split('->');
  return {
    between: between.trim(),
    insert: insert.trim(),
  };
});
let pairsCounter = {};
for (let i = 0; i < startTemplate.length - 1; i++) {
  const pair = startTemplate[i] + startTemplateData[i + 1];
  pairsCounter[pair] = pairsCounter[pair] ? pairsCounter[pair] + 1 : 1;
}

for (let i = 0; i < STEPS; i++) {
  pairsCounter = applyInsertion(pairsCounter, insertionRules);
}

const singleElementsCounter = countSingleElements(pairsCounter);

const entriesAcs = Object.keys(singleElementsCounter).sort(
  (a, b) => singleElementsCounter[a] - singleElementsCounter[b],
);
console.log(
  'Result:',
  singleElementsCounter[entriesAcs[entriesAcs.length - 1]] -
  singleElementsCounter[entriesAcs[0]],
);
