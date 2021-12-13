const { inputData } = require('./input');
const { fold } = require('./helper');

const [dotsData, foldsData] = inputData.split('\n\n');

let dots = dotsData.split('\n').map((dot) => {
  const [x, y] = dot.split(',').map((n) => +n);
  return { x, y };
});
const folds = foldsData.split('\n').map((f) => {
  const [flavorText, value] = f.split('=');
  return { axisName: flavorText[flavorText.length - 1], value: +value };
});

console.log('Result:', fold(dots, folds[0]).length);
