const START_VALUE = 'start';
const END_VALUE = 'end';

class Node {
  value;
  neighbors;

  get canBeVisitedMultipleTimes() {
    return this.value && this.value === this.value.toUpperCase();
  }

  get canBeVisitedTwice() {
    return (
      this.value &&
      this.value !== START_VALUE &&
      this.value !== END_VALUE &&
      this.value === this.value.toLowerCase()
    );
  }

  constructor(value, neighbors = []) {
    this.value = value;
    this.neighbors = neighbors;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}

module.exports = {
  Node,
  START_VALUE,
  END_VALUE,
};
