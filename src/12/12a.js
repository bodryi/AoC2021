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

function traverse(from, to, nodes, path = [], paths = []) {
  path.push(from);

  if (from.value === to.value) {
    paths.push(path);
    return;
  }

  from.neighbors
    .filter(
      (n) =>
        n.canBeVisitedMultipleTimes ||
        !path.find((visited) => visited.value === n.value),
    )
    .forEach((n) => traverse(n, to, nodes, [...path], paths));

  return paths;
}

console.log('Result:', traverse(startNode, endNode, nodes).length);
