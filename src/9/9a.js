const { inputData } = require('./input');
const { HeightPoint } = require('./helper');

const heightMap = inputData
  .split('\n')
  .map((r, y) => r.split('').map((h, x) => new HeightPoint(+h, x, y)));

const minHeights = [];
for (let y = 0; y < heightMap.length; y++) {
  for (let x = 0; x < heightMap[y].length; x++) {
    const point = heightMap[y][x];
    if (point.isLowestWithAdjacent(heightMap)) {
      minHeights.push(point.value);
    }
  }
}

const result = minHeights.reduce((sum, h) => sum + h + 1, 0);
console.log('Result:', result);
