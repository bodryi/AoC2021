const MAX_BASIN_VALUE = 8;
const TOP_BASIN_COUNT = 3;

class HeightPoint {
  x;
  y;
  value;

  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
  }

  isLowestWithAdjacent(heightMap) {
    const adjacentValues = [
      heightMap[this.y - 1]?.[this.x]?.value,
      heightMap[this.y + 1]?.[this.x]?.value,
      heightMap[this.y]?.[this.x - 1]?.value,
      heightMap[this.y]?.[this.x + 1]?.value,
    ].filter((v) => !!v || v === 0);

    if (adjacentValues.indexOf(this.value) > -1) {
      return false;
    }

    return Math.min(...adjacentValues.concat(this.value)) === this.value;
  }

  equals(heightPoint) {
    return this.x === heightPoint.x && this.y === heightPoint.y;
  }
}

function getBasin(heightPoint, heightMap, basin = new Set()) {
  basin.add(heightPoint);

  const adjacentValues = [
    heightMap[heightPoint.y - 1]?.[heightPoint.x],
    heightMap[heightPoint.y + 1]?.[heightPoint.x],
    heightMap[heightPoint.y]?.[heightPoint.x - 1],
    heightMap[heightPoint.y]?.[heightPoint.x + 1],
  ].filter(
    (point) => !!point && point.value <= MAX_BASIN_VALUE && !basin.has(point),
  );

  adjacentValues.forEach((p) => {
    basin = getBasin(p, heightMap, basin);
  });

  return basin;
}

module.exports = {
  HeightPoint,
  getBasin,
  TOP_BASIN_COUNT,
};
