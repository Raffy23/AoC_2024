export function parseInput(data: string): Array<Array<number>> {
  return data
    .trimEnd()
    .split('\n')
    .map((str) => str.split('').map((s) => Number(s)));
}

function toKey(x: number, y: number): number {
  return x * 10000 + y;
}

function walk(grid: Array<Array<number>>, peaks: Set<number>, pH: number, y: number, x: number): number {
  if (x < 0 || y < 0) {
    return 0;
  }

  const h = grid[y]?.at(x);

  if (h === undefined || Number.isNaN(pH) || pH !== h) {
    return 0;
  }

  if (h === 9) {
    peaks.add(toKey(x, y));
    return 1;
  }

  return (
    walk(grid, peaks, h + 1, y - 1, x) +
    walk(grid, peaks, h + 1, y + 1, x) +
    walk(grid, peaks, h + 1, y, x - 1) +
    walk(grid, peaks, h + 1, y, x + 1)
  );
}

export function part1(grid: Array<Array<number>>): number {
  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    let x = grid[y].indexOf(0);

    while (x !== -1) {
      const peaks = new Set<number>();

      walk(grid, peaks, 0, y, x);
      score += peaks.size;

      x = grid[y].indexOf(0, x + 1);
    }
  }

  return score;
}

export function part2(grid: Array<Array<number>>): number {
  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    let x = grid[y].indexOf(0);

    while (x !== -1) {
      score += walk(grid, new Set(), 0, y, x);
      x = grid[y].indexOf(0, x + 1);
    }
  }

  return score;
}
