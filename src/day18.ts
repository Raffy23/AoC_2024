import PQueue from './util/PQueue';

type Byte = {
  x: number;
  y: number;
};

type State = {
  x: number;
  y: number;
};

export function parseInput(data: string): Array<Byte> {
  return [
    ...data
      .trimEnd()
      .matchAll(/^(\d+),(\d+)$/gm)
      .map(([_, x, y]) => ({ x: Number(x), y: Number(y) })),
  ];
}

const North = { y: -1, x: 0 };
const East = { y: 0, x: 1 };
const South = { y: 1, x: 0 };
const West = { y: 0, x: -1 };
const Directions = [North, East, South, West];

function toKey(x: number, y: number): number {
  return x * 10000 + y;
}

export function _part1(bytes: Array<Byte>, w: number, h: number, c: number): number | undefined {
  w++;
  h++;

  const blocked = new Set<number>();
  for (let b = 0; b < c; b++) {
    blocked.add(toKey(bytes[b].x, bytes[b].y));
  }

  const start = { x: 0, y: 0 };
  const end = { x: w - 1, y: h - 1 };

  const nodes = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      row.push({
        visited: false,
        closed: false,
        costs: Number.MAX_SAFE_INTEGER,
      });
    }

    nodes.push(row);
  }

  const queue = new PQueue<State>();
  queue.add({ x: start.x, y: start.y }, 0);

  while (!queue.isEmpty()) {
    const current = queue.pop();
    if (current === undefined) {
      break;
    }

    const {
      value: { x, y },
      priority: cost,
    } = current;

    if (end.x === x && end.y === y) {
      return cost;
    }

    nodes[y][x].closed = true;

    for (const d of Directions) {
      const neighbor = { x: x + d.x, y: y + d.y };

      if (neighbor.y < 0 || neighbor.y >= h || neighbor.x < 0 || neighbor.x >= w) {
        continue;
      }

      if (nodes[neighbor.y][neighbor.x].closed || blocked.has(toKey(neighbor.x, neighbor.y))) {
        continue;
      }

      const score = cost + 1;
      const beenVisited = nodes[neighbor.y][neighbor.x].visited;

      if (!beenVisited || score < cost) {
        nodes[neighbor.y][neighbor.x].visited = true;
        nodes[neighbor.y][neighbor.x].costs = score;

        queue.add(neighbor, score);
      }
    }
  }

  return undefined;
}

export function part1(bytes: Array<Byte>): number {
  return _part1(bytes, 70, 70, 1024)!;
}

export function _part2(bytes: Array<Byte>, w: number, h: number, s: number): Byte | undefined {
  for (let b = s; b < bytes.length; b++) {
    if (_part1(bytes, w, h, b + 1) === undefined) {
      return bytes[b];
    }
  }
}

export function part2(bytes: Array<Byte>): string {
  const b = _part2(bytes, 70, 70, 1024)!;
  return `${b.x},${b.y}`;
}
