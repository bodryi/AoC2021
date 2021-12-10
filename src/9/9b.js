const { inputData } = require('./input');
const { HeightPoint, getBasin, TOP_BASIN_COUNT } = require('./helper');

const heightMap = inputData
  .split('\n')
  .map((r, y) => r.split('').map((h, x) => new HeightPoint(+h, x, y)));

const minHeightPoints = [];
for (let y = 0; y < heightMap.length; y++) {
  for (let x = 0; x < heightMap[y].length; x++) {
    const point = heightMap[y][x];
    if (point.isLowestWithAdjacent(heightMap)) {
      minHeightPoints.push(point);
    }
  }
}

const biggestBasins = minHeightPoints
  .map((point) => getBasin(point, heightMap).size)
  .sort((a, b) => {
    return a - b;
  })
  .slice(-TOP_BASIN_COUNT);
const result = biggestBasins.reduce((mul, n) => mul * n, 1);

console.log('Result:', result);
