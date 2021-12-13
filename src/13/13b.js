const { inputData } = require('./input');
const { fold, getDotsPicture } = require('./helper');

const [dotsData, foldsData] = inputData.split('\n\n');

let dots = dotsData.split('\n').map((dot) => {
  const [x, y] = dot.split(',').map((n) => +n);
  return { x, y };
});
const folds = foldsData.split('\n').map((f) => {
  const [flavorText, value] = f.split('=');
  return { axisName: flavorText[flavorText.length - 1], value: +value };
});

folds.forEach((foldOp) => {
  dots = fold(dots, foldOp);
});

console.log('Result:');
console.log(getDotsPicture(dots));
