const { inputData } = require('./input');
const { Node, START_VALUE, END_VALUE } = require('./helper');

const nodes = inputData.split('\n').reduce((n, path) => {
  const [value, neighbor] = path.split('-');
  const existingValueNode = n.find((node) => node.value === value);
  const existingNeighborNode = n.find((node) => node.value === neighbor);

  if (existingValueNode && existingNeighborNode) {
    existingValueNode.addNeighbor(existingNeighborNode);
    existingNeighborNode.addNeighbor(existingValueNode);
  }

  if (existingValueNode && !existingNeighborNode) {
    const neighborNode = new Node(neighbor);
    existingValueNode.addNeighbor(neighborNode);
    neighborNode.addNeighbor(existingValueNode);
    n.push(neighborNode);
  }

  if (!existingValueNode && existingNeighborNode) {
    const valueNode = new Node(value);
    existingNeighborNode.addNeighbor(valueNode);
    valueNode.addNeighbor(existingNeighborNode);
    n.push(valueNode);
  }

  if (!existingValueNode && !existingNeighborNode) {
    const valueNode = new Node(value);
    const neighborNode = new Node(neighbor);
    valueNode.addNeighbor(neighborNode);
    neighborNode.addNeighbor(valueNode);
    n.push(valueNode);
    n.push(neighborNode);
  }

  return n;
}, []);

const startNode = nodes.find((n) => n.value === START_VALUE);
const endNode = nodes.find((n) => n.value === END_VALUE);

function traverse(
  from,
  to,
  nodes,
  path = [],
  paths = [],
  canBeVisitedTwice = null,
) {
  path.push(from);

  if (from.value === to.value) {
    paths.push(path);

    return;
  }

  from.neighbors
    .filter((n) => {
      const visitedTimes = path.filter(
        (visited) => visited.value === n.value,
      ).length;

      return (
        n.canBeVisitedMultipleTimes ||
        !visitedTimes ||
        (visitedTimes === 1 && n.value === canBeVisitedTwice?.value)
      );
    })
    .forEach((n) => {
      traverse(n, to, nodes, [...path], paths, canBeVisitedTwice);
      if (!canBeVisitedTwice) {
        from.neighbors
          .filter((n) => n.canBeVisitedTwice)
          .forEach((t) => traverse(t, to, nodes, [...path], paths, t));
      }
    });

  return paths;
}

console.log(
  'Result:',
  new Set([
    ...traverse(startNode, endNode, nodes).map((path) =>
      path.map((n) => n.value).join(),
    ),
  ]).size,
);
