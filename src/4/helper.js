const whitespaceRegex = /\s+/;

class BoardItem {
  value;
  marked;

  constructor(value, marked = false) {
    this.value = value;
    this.marked = marked;
  }

  mark() {
    this.marked = true;
  }
}

class Board {
  board = [];

  get unmarkedNumbers() {
    const result = [];
    for (const row of this.board) {
      for (const num of row) {
        if (!num.marked) {
          result.push(num.value);
        }
      }
    }

    return result;
  }

  get boardWon() {
    const transposedBoard = this.board.map((_, colIndex) =>
      this.board.map((row) => row[colIndex]),
    );
    const vertical = transposedBoard.some((row) =>
      row.every((num) => num.marked),
    );
    const horizontal = this.board.some((row) => row.every((num) => num.marked));
    return horizontal || vertical;
  }

  constructor(stringRows) {
    for (const row of stringRows) {
      this.board.push(
        row
          .trim()
          .split(whitespaceRegex)
          .map((n) => new BoardItem(+n)),
      );
    }
  }

  markNumber(v) {
    for (const row of this.board) {
      for (const num of row) {
        if (num.value === v) {
          num.mark();
        }
      }
    }
  }
}

module.exports = {
  Board,
};
