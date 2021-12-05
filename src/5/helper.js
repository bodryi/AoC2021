const STEP_DELIMITER = '->';

function getBoundingBoxSize(segments) {
  const allX = segments.reduce((xArr, seg) => {
    xArr.push(seg.start.x);
    xArr.push(seg.end.x);
    return xArr;
  }, []);
  const allY = segments.reduce((yArr, seg) => {
    yArr.push(seg.start.y);
    yArr.push(seg.end.y);
    return yArr;
  }, []);

  return {
    width: Math.max(...allX) + 1,
    height: Math.max(...allY) + 1,
  };
}

class Point {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  start;
  end;

  constructor(xStart, yStart, xEnd, yEnd) {
    this.start = new Point(xStart, yStart);
    this.end = new Point(xEnd, yEnd);
  }
}

class Diagram {
  diagram;

  get intersectionPointsCount() {
    return this.diagram.reduce((intersections, row) => {
      intersections += row.filter((n) => n > 1).length;

      return intersections;
    }, 0);
  }

  constructor(width, height, fillWith = 0) {
    this.diagram = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(fillWith));
  }

  drawHorizontalOrVerticalSegment(segment) {
    const horizontal = segment.start.x === segment.end.x;
    const vertical = segment.start.y === segment.end.y;
    if (!horizontal && !vertical) {
      return;
    }

    if (vertical) {
      const [startX, endX] =
        segment.start.x < segment.end.x
          ? [segment.start.x, segment.end.x]
          : [segment.end.x, segment.start.x];
      for (let x = startX; x <= endX; x++) {
        this.diagram[segment.start.y][x]++;
      }
    } else {
      const [startY, endY] =
        segment.start.y < segment.end.y
          ? [segment.start.y, segment.end.y]
          : [segment.end.y, segment.start.y];
      for (let y = startY; y <= endY; y++) {
        this.diagram[y][segment.start.x]++;
      }
    }
  }

  drawDiagonalSegment(segment) {
    const horizontal = segment.start.x === segment.end.x;
    const vertical = segment.start.y === segment.end.y;
    if (horizontal || vertical) {
      return;
    }

    const { x: startX, y: startY } = segment.start;
    const { x: endX, y: endY } = segment.end;
    const xIncreases = segment.start.x < segment.end.x;
    const yIncreases = segment.start.y < segment.end.y;

    for (
      let x = startX, y = startY;
      xIncreases ? x <= endX : x >= endX, yIncreases ? y <= endY : y >= endY;
      xIncreases ? x++ : x--, yIncreases ? y++ : y--
    ) {
      this.diagram[y][x]++;
    }
  }

  stringify() {
    return this.diagram
      .map((r) => r.join(' '))
      .join('\n')
      .replaceAll('0', '.');
  }
}

module.exports = {
  STEP_DELIMITER,
  getBoundingBoxSize,
  Segment,
  Diagram,
};
