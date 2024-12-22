import PQueue from './util/PQueue';

type LookupTable = Record<string, Record<string, Array<string>>>;

export const NUMPAD = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [' ', '0', 'A'],
];

export const KEYPAD = [
  [' ', '^', 'A'],
  ['<', 'v', '>'],
];

export function parseInput(data: string): Array<string> {
  return data.trimEnd().split('\n');
}

export function generateLookupTable(pad: Array<Array<string>>): LookupTable {
  const keys = pad
    .flatMap((rows, rowIdx) => {
      return rows.map((key, colIdx) => ({ key, row: rowIdx, col: colIdx }));
    })
    .filter(({ key }) => key !== ' ');

  const lut: LookupTable = {};
  const add = (from: string, to: string, moves: string) => {
    if (lut[from] === undefined) {
      lut[from] = {};
    }

    if (lut[from][to] === undefined) {
      lut[from][to] = [];
    }

    lut[from][to].push(moves);
  };

  for (const { key: from, row: sY, col: sX } of keys) {
    //[{ key: 'A', row: 3, col: 2 }]) {
    for (const { key: to, row: eY, col: eX } of keys) {
      //[{ key: '5', row: 1, col: 1 }]) {
      if (from === to) {
        add(from, to, 'A');
        continue;
      }

      const result: PQueue<string> = new PQueue();

      const visited = pad.map((row) => Array(row.length).fill(Number.MAX_SAFE_INTEGER));
      const queue = new PQueue<{ x: number; y: number; moves: string }>();

      queue.add({ x: sX, y: sY, moves: '' }, 0);

      while (!queue.isEmpty()) {
        const {
          value: { x, y, moves },
          priority: cost,
        } = queue.pop()!;

        if (x == eX && y == eY) {
          result.add(moves, cost);
        }

        if (visited[y][x] < cost || pad[y][x] === ' ') {
          continue;
        }

        visited[y][x] = cost;

        const lastMove = moves.slice(-1);
        const next = [
          { y: -1, x: 0, m: '^' },
          { y: 0, x: 1, m: '>' },
          { y: 1, x: 0, m: 'v' },
          { y: 0, x: -1, m: '<' },
        ];

        for (const { x: dX, y: dY, m } of next) {
          const nX = x + dX;
          const nY = y + dY;
          if (nX < 0 || nY < 0 || nX >= pad[0].length || nY >= pad.length) {
            continue;
          }

          const newCost = cost + (m == lastMove || lastMove === '' ? 1 : 6);
          queue.add({ x: nX, y: nY, moves: moves + m }, newCost);
        }
      }

      let cost = Number.MAX_SAFE_INTEGER;
      while (!result.isEmpty()) {
        const { value: moves, priority } = result.pop()!;

        if (priority > cost) {
          continue;
        }

        cost = priority;
        add(from, to, moves + 'A');
      }
    }
  }

  return lut;
}

export function solve(codes: Array<string>, keypads: number): number {
  const numpadLUT = generateLookupTable(NUMPAD);
  const keypadLUT = generateLookupTable(KEYPAD);

  const cache = new Map<string, number>();
  const compute_keypad = (moves: string, depth: number) => {
    if (depth === 0) {
      return moves.length;
    }

    const cacheKey = moves + '.' + depth;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    let current = 'A';
    let result = 0;

    for (const input of moves) {
      result += Math.min(...keypadLUT[current][input].map((newMoves) => compute_keypad(newMoves, depth - 1)));
      current = input;
    }

    cache.set(cacheKey, result);
    return result;
  };

  let current = 'A';
  let result = 0;
  for (const codeLine of codes) {
    let length = 0;
    for (const input of codeLine) {
      length += Math.min(...numpadLUT[current][input].map((moves) => compute_keypad(moves, keypads - 1)));
      current = input;
    }

    const codeValue = parseInt(codeLine.slice(0, codeLine.length - 1), 10);
    result += codeValue * length;
  }

  return result;
}

export function part1(codes: Array<string>): number {
  return solve(codes, 2 + 1);
}

export function part2(codes: Array<string>): number {
  return solve(codes, 25 + 1);
}
