interface Pos {
  x: number;
  y: number;
}

interface Input {
  grid: Array<Array<string>>;
  guard: Pos;
}

export function parseInput(data: string): Input {
  const grid = data.trimEnd().split('\n');

  let x, y;
  for (y = 0; y < grid.length; y++) {
    x = grid[y].indexOf('^');
    if (x !== -1) {
      break;
    }
  }

  if (x === undefined) {
    throw new Error('Could not find guard!');
  }

  grid[y] = grid[y].replace('^', '.');

  return {
    grid: grid.map((s) => s.split('')),
    guard: {
      x,
      y,
    },
  };
}

const DIRECTIONS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function toKey(x: number, y: number, d: number): number {
  return x * 100_000 + y * 100 + d;
}

function fromKey(k: number): { x: number; y: number; d: number } {
  return {
    x: Math.trunc(k / 100_000),
    y: Math.trunc((k % 100_000) / 100),
    d: k % 100,
  };
}

function visitedPositions(input: Input): Set<number> {
  return new Set([
    ...walk(input)[0]
      .values()
      .map((n) => {
        const { x, y } = fromKey(n);
        return toKey(x, y, 0);
      }),
  ]);
}

function walk({ grid, guard }: Input): [Set<number>, boolean] {
  const visited = new Set<number>();

  let lookAt = 0;
  let x = guard.x;
  let y = guard.y;

  loop: do {
    const { x: oX, y: oY } = DIRECTIONS[lookAt];
    const key = toKey(x, y, lookAt);

    if (visited.has(key)) {
      return [visited, true];
    }

    visited.add(key);

    if (x + oX === -1) {
      break;
    }

    switch (grid[y + oY]?.at(x + oX)) {
      case 'O':
      case '#':
        lookAt = (lookAt + 1) % DIRECTIONS.length;
        break;

      case '.':
        y = y + oY;
        x = x + oX;
        break;

      case undefined:
        break loop;
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return [visited, false];
}

export function part1(input: Input): number {
  return visitedPositions(input).size;
}

export function part2(input: Input): number {
  const visited = visitedPositions(input);
  visited.delete(toKey(input.guard.x, input.guard.y, 0));

  let count = 0;
  for (const key of visited) {
    const { x, y } = fromKey(key);

    input.grid[y][x] = 'O';

    const [_, cycle] = walk(input);
    if (cycle) {
      count++;
    }

    input.grid[y][x] = '.';
  }

  return count;
}
