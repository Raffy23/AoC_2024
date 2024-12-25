type Input = {
  locks: Array<Array<number>>;
  keys: Array<Array<number>>;
};

export function parseInput(data: string): Input {
  const output: Input = {
    locks: [],
    keys: [],
  };

  for (const schematic of data.trimEnd().split('\n\n')) {
    const pattern = schematic.split('\n');
    const countSymbol = pattern[0][0];
    const isKey = countSymbol === '.';

    const heights = [];
    for (let col = 0; col < pattern[0].length; col++) {
      let row = 0;
      for (; row < pattern.length - 1 && pattern[row][col] === countSymbol; row++);

      if (isKey) {
        row = pattern.length - row;
      }

      heights.push(row - 1);
    }

    if (isKey) {
      output.keys.push(heights);
    } else {
      output.locks.push(heights);
    }
  }

  return output;
}

export function part1({ keys, locks }: Input): number {
  const fit = (key: Array<number>, lock: Array<number>): boolean => {
    for (let i = 0; i < key.length; i++) {
      if (5 - key[i] < lock[i]) {
        return false;
      }
    }

    return true;
  };

  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (fit(key, lock)) {
        count++;
      }
      //console.log(lock, key, fit(key, lock));
    }
  }

  return count;
}
