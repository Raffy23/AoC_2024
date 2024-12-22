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

const North = { y: -1, x: 0 };
const East = { y: 0, x: 1 };
const South = { y: 1, x: 0 };
const West = { y: 0, x: -1 };
const Directions = [North, East, South, West];

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

function manhattanDist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

export function findCheats({ grid, start, end }: Input, length: number): Map<number, number> {
  const distance = grid.map((row) => new Array(row.length).fill(-1));
  const path = [];

  let x = start.x;
  let y = start.y;
  distance[y][x] = 0;

  let c = 0;
  while (!(x === end.x && y === end.y)) {
    path.push({ x, y });
    distance[y][x] = c++;

    for (const dir of Directions) {
      const nX = x + dir.x;
      const nY = y + dir.y;

      if (distance[nY][nX] === -1 && grid[nY][nX] === Tile.Space) {
        x = nX;
        y = nY;
        break;
      }
    }
  }

  distance[end.y][end.x] = c;

  const cheats = new Map<number, number>();
  for (const { x, y } of path) {
    const minX = Math.max(x - length, 0);
    const maxX = Math.min(x + length + 1, grid[0].length);
    const minY = Math.max(y - length, 0);
    const maxY = Math.min(y + length + 1, grid.length);

    for (let tX = minX; tX < maxX; tX++) {
      for (let tY = minY; tY < maxY; tY++) {
        if (grid[tY][tX] === Tile.Wall || (tY === y && tX === x)) {
          continue;
        }

        const d = manhattanDist(tX, tY, x, y);
        if (d > length || d == 1) {
          continue;
        }

        const diff = distance[tY][tX] - distance[y][x] - d;
        if (diff > 1) {
          cheats.set(diff, (cheats.get(diff) ?? 0) + 1);
        }
      }
    }
  }

  return cheats;
}

export function part1({ grid, start, end }: Input): number {
  return findCheats({ grid, start, end }, 2)
    .entries()
    .reduce((sum, [distance, count]) => sum + (distance >= 100 ? count : 0), 0);
}

export function part2({ grid, start, end }: Input): number {
  return findCheats({ grid, start, end }, 20)
    .entries()
    .reduce((sum, [distance, count]) => sum + (distance >= 100 ? count : 0), 0);
}
