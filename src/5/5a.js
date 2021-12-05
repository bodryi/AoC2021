const { inputData } = require('./input');
const {
  Segment,
  Diagram,
  STEP_DELIMITER,
  getBoundingBoxSize,
} = require('./helper');

const segments = inputData.split('\n').map((r) => {
  const [start, end] = r.split(STEP_DELIMITER);
  const [xStart, yStart] = start.split(',').map((n) => +n);
  const [xEnd, yEnd] = end.split(',').map((n) => +n);

  return new Segment(xStart, yStart, xEnd, yEnd);
});

const { width, height } = getBoundingBoxSize(segments);
const diagram = new Diagram(width, height);

segments.forEach((s) => diagram.drawHorizontalOrVerticalSegment(s));

console.log('Result:', diagram.intersectionPointsCount);
