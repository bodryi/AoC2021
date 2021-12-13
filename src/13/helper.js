function foldX(dots, x) {
  const leftDotsFolded = dots
    .filter((d) => d.x > x)
    .map((d) => ({ x: 2 * x - d.x, y: d.y }));
  return [...dots.filter((d) => d.x <= x), ...leftDotsFolded].filter(
    (r, i, mergeResult) =>
      mergeResult.findIndex((d) => r.x === d.x && r.y === d.y) === i,
  );
}

function foldY(dots, y) {
  const bottomDotsFolded = dots
    .filter((d) => d.y > y)
    .map((d) => ({ x: d.x, y: 2 * y - d.y }));
  return [...dots.filter((d) => d.y <= y), ...bottomDotsFolded].filter(
    (r, i, mergeResult) =>
      mergeResult.findIndex((d) => r.x === d.x && r.y === d.y) === i,
  );
}

function fold(dots, foldOp) {
  const { axisName, value } = foldOp;
  switch (axisName) {
    case 'x': {
      return foldX(dots, value);
    }
    case 'y': {
      return foldY(dots, value);
    }
    default:
      throw new Error(`unknown axisName ${axisName}`);
  }
}

function getDotsPicture(dots) {
  const maxY = Math.max(...dots.map((d) => d.y));
  const maxX = Math.max(...dots.map((d) => d.x));

  let dotsPicture = '';

  for (let y = 0; y <= maxY; y++) {
    let row = '';
    for (let x = 0; x <= maxX; x++) {
      const dot = dots.find((d) => d.x === x && d.y === y);
      row += dot ? '#' : '.';
    }
    dotsPicture += `${row}\n`;
  }

  return dotsPicture;
}

module.exports = {
  fold,
  getDotsPicture,
};
