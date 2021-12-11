const OPEN_BRACKETS = ['(', '[', '{', '<'];
const CLOSE_BRACKETS = [')', ']', '}', '>'];
const openCloseMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

function findCorruptedSymbolIndex(line) {
  const scan = [];
  for (let i = 0; i < line.split('').length; i++) {
    const bracket = line[i];
    if (OPEN_BRACKETS.indexOf(bracket) > -1) {
      scan.push(bracket);
    }

    if (CLOSE_BRACKETS.indexOf(bracket) > -1) {
      if (openCloseMap[scan[scan.length - 1]] !== bracket) {
        return i;
      }

      scan.splice(-1, 1);
    }
  }

  return -1;
}

function lineIncomplete(line) {
  const scan = [];
  for (let i = 0; i < line.split('').length; i++) {
    const bracket = line[i];
    if (OPEN_BRACKETS.indexOf(bracket) > -1) {
      scan.push(bracket);
    }

    if (CLOSE_BRACKETS.indexOf(bracket) > -1) {
      if (openCloseMap[scan[scan.length - 1]] !== bracket) {
        return [false, ''];
      }

      scan.splice(-1, 1);
    }
  }

  return [!!scan.length, scan.join('')];
}

function completeBracketsString(incomplete) {
  return incomplete
    .split('')
    .reverse()
    .map((b) => openCloseMap[b])
    .join('');
}

module.exports = {
  findCorruptedSymbolIndex,
  lineIncomplete,
  completeBracketsString,
};
