import PQueue from './util/PQueue';

export const enum Tile {
  Space,
  Wall,
}

type Grid = Array<Array<Tile>>;

type Coord = {
  x: number;
  y: number;
};

type Input = {
  grid: Grid;
  start: Coord;
  end: Coord;
};

export function parseInput(data: string): Input {
  let start = undefined;
  let end = undefined;

  const grid = data
    .trimEnd()
    .split('\n')
    .map((row, y) =>
      row.split('').map((tile, x) => {
        switch (tile) {
          case '#':
            return Tile.Wall;
          case '.':
            return Tile.Space;
          case 'S':
            start = { x, y };
            return Tile.Space;
          case 'E':
            end = { x, y };
            return Tile.Space;
          default:
            throw new Error('Unknown tile!');
        }
      }),
    );

  if (start === undefined || end === undefined) {
    throw new Error('unable to find start or end!');
  }

  return {
    start,
    end,
    grid,
  };
}

type State = {
  pos: Coord;
  dIdx: number;
};

const North = { y: -1, x: 0 };
const East = { y: 0, x: 1 };
const South = { y: 1, x: 0 };
const West = { y: 0, x: -1 };
const Directions = [North, East, South, West];

const Costs = {
  move: 1,
  turn: 1000,
};

function toKey(x: number, y: number): number {
  return x * 10000 + y;
}

export function part1({ grid, start, end }: Input): number {
  const queue = new PQueue<State>();
  const nodes = grid.map((row) =>
    row.map(() => ({
      visited: false,
      closed: false,
      costs: Number.MAX_SAFE_INTEGER,
      parent: undefined as State | undefined,
    })),
  );

  queue.add({ pos: start, dIdx: 1 }, 0);

  while (!queue.isEmpty()) {
    const current = queue.pop();
    if (current === undefined) {
      break;
    }

    const {
      value: {
        pos: { x, y },
        dIdx,
      },
      priority: cost,
    } = current;

    const dir = Directions[dIdx];

    if (end.x === x && end.y === y) {
      return cost;
    }

    nodes[y][x].closed = true;

    for (const dirIndex of [dIdx, (dIdx + 1) % Directions.length, (dIdx + Directions.length - 1) % Directions.length]) {
      const d = Directions[dirIndex];
      const neighbor = { x: x + d.x, y: y + d.y };

      if (nodes[neighbor.y][neighbor.x].closed || grid[neighbor.y][neighbor.x] === Tile.Wall) {
        continue;
      }

      const turnCost =
        d.x === dir.x && d.y === dir.y ? 0 : d.x === -dir.x || d.y === -dir.y ? Costs.turn * 2 : Costs.turn;

      const score = cost + turnCost + Costs.move;
      const beenVisited = nodes[neighbor.y][neighbor.x].visited;

      if (!beenVisited || score < cost) {
        nodes[neighbor.y][neighbor.x].visited = true;
        nodes[neighbor.y][neighbor.x].parent = { pos: { x, y }, dIdx: dirIndex };
        nodes[neighbor.y][neighbor.x].costs = score;

        queue.add({ pos: neighbor, dIdx: dirIndex }, score);
      }
    }
  }

  throw new Error('no path to end');
}

type State2 = {
  pos: Coord;
  dir: number;
  prev: Array<Coord>;
};

export function part2({ grid, start, end }: Input): number {
  const queue = new PQueue<State2>();
  const path = new Set<number>();
  const nodes = grid.map((row) =>
    row.map(() => ({
      cost: [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    })),
  );

  let minCosts = Number.MAX_SAFE_INTEGER;

  queue.add(
    {
      pos: start,
      dir: 1,
      prev: [start],
    },
    0,
  );

  while (!queue.isEmpty()) {
    const {
      value: { pos, dir, prev },
      priority: cost,
    } = queue.pop()!;

    const direction = Directions[dir];

    if (nodes[pos.y][pos.x].cost[dir] !== Number.MAX_SAFE_INTEGER) {
      const score = nodes[pos.y][pos.x].cost[dir];
      if (score < cost) {
        continue;
      }
    }

    nodes[pos.y][pos.x].cost[dir] = cost;

    if (end.x === pos.x && end.y === pos.y) {
      const newCosts = cost + Costs.move + Costs.turn;

      if (newCosts < minCosts) {
        path.clear();
      }

      if (newCosts <= minCosts) {
        prev.forEach(({ x, y }) => path.add(toKey(x, y)));
        path.add(toKey(end.x, end.y));
      }

      minCosts = Math.min(minCosts, newCosts);
    }

    const p = [...prev];
    p.push(pos);

    const l = (dir + 1) % Directions.length;
    const r = (dir + 3) % Directions.length;
    for (const dirIndex of [dir, l, r]) {
      const d = Directions[dirIndex];
      const neighbor = { x: pos.x + d.x, y: pos.y + d.y };

      const turnCost =
        d.x === direction.x && d.y === direction.y
          ? 0
          : d.x === -direction.x || d.y === -direction.y
            ? Costs.turn * 2
            : Costs.turn;

      const score = cost + turnCost + Costs.move;

      if (grid[neighbor.y][neighbor.x] === Tile.Space) {
        queue.add(
          {
            pos: neighbor,
            dir: dirIndex,
            prev: p,
          },
          score,
        );
      }
    }
  }

  return path.size;
}
