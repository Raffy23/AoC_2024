export const enum Tile {
  Space,
  Box,
  BoxL,
  BoxR,
  Wall,
}
type Grid = Array<Array<Tile>>;
type Coord = {
  x: number;
  y: number;
};
type Input = {
  grid: Grid;
  robot: Coord;
  moves: string;
};

export function parseInput(data: string): Input {
  const [rawGrid, moves] = data.split('\n\n');

  let robot = undefined;
  const grid = rawGrid.split('\n').map((row, y) =>
    row.split('').map((tile, x) => {
      switch (tile) {
        case '#':
          return Tile.Wall;
        case '.':
          return Tile.Space;
        case 'O':
          return Tile.Box;
        case '@':
          robot = { x, y };
          return Tile.Space;
        default:
          throw new Error('Unknown tile!');
      }
    }),
  );

  if (robot === undefined) {
    throw new Error('Robot not found');
  }

  return {
    grid,
    robot,
    moves: moves.replaceAll('\n', ''),
  };
}

function toDirection(move: string): Coord {
  switch (move[0]) {
    case '^':
      return { y: -1, x: 0 };
    case 'v':
      return { y: 1, x: 0 };
    case '<':
      return { y: 0, x: -1 };
    case '>':
      return { y: 0, x: 1 };
    default:
      throw new Error('unreachable');
  }
}

function moveBox(grid: Grid, { x, y }: Coord, { x: dX, y: dY }: Coord): boolean {
  const nX = x + dX;
  const nY = y + dY;

  if (grid[nY][nX] === Tile.Space || (grid[nY][nX] === Tile.Box && moveBox(grid, { x: nX, y: nY }, { x: dX, y: dY }))) {
    grid[y][x] = Tile.Space;
    grid[nY][nX] = Tile.Box;
    return true;
  }

  return false;
}

function moveRobot(grid: Grid, { x, y }: Coord, { x: dX, y: dY }: Coord): Coord {
  const nX = x + dX;
  const nY = y + dY;

  if (grid[nY][nX] === Tile.Space || (grid[nY][nX] === Tile.Box && moveBox(grid, { x: nX, y: nY }, { x: dX, y: dY }))) {
    return { x: nX, y: nY };
  }

  return { x, y };
}

export function print(grid: Grid, robot: Coord | undefined = undefined) {
  for (let y = 0; y < grid.length; y++) {
    let line = '';
    for (let x = 0; x < grid[0].length; x++) {
      if (robot && robot.y === y && robot.x === x) {
        line += '@';
        continue;
      }

      switch (grid[y][x]) {
        case Tile.Space:
          line += ' ';
          break;
        case Tile.Box:
          line += 'O';
          break;
        case Tile.BoxL:
          line += '[';
          break;
        case Tile.BoxR:
          line += ']';
          break;
        case Tile.Wall:
          line += '█';
          break;
      }
    }
    console.log(line);
  }
}

export function part1({ grid, robot, moves }: Input): number {
  for (const m of moves) {
    robot = moveRobot(grid, robot, toDirection(m));
  }

  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === Tile.Box) {
        score += y * 100 + x;
      }
    }
  }

  return score;
}

function toWideTile(tile: Tile): [Tile, Tile] {
  switch (tile) {
    case Tile.Space:
      return [Tile.Space, Tile.Space];
    case Tile.Box:
      return [Tile.BoxL, Tile.BoxR];
    case Tile.Wall:
      return [Tile.Wall, Tile.Wall];
  }

  throw new Error('invalid tile');
}

export function toWideGrid(grid: Grid): Grid {
  return grid.map((row) =>
    row.reduce((row, tile) => {
      row.push(...toWideTile(tile));
      return row;
    }, [] as Array<Tile>),
  );
}

function isBox(tile: Tile): boolean {
  return tile === Tile.Box || tile === Tile.BoxL || tile === Tile.BoxR;
}

function moveBox2(grid: Grid, { x, y }: Coord, { x: dX, y: dY }: Coord, mutate: boolean = true): boolean {
  if (grid[y][x] === Tile.Space) {
    return true;
  }

  const boxL = grid[y][x] === Tile.BoxL ? { y, x } : { y, x: x - 1 };
  const boxR = grid[y][x] === Tile.BoxR ? { y, x } : { y, x: x + 1 };
  const move = () => {
    if (mutate) {
      grid[boxL.y][boxL.x] = Tile.Space;
      grid[boxR.y][boxR.x] = Tile.Space;

      grid[boxL.y + dY][boxL.x + dX] = Tile.BoxL;
      grid[boxR.y + dY][boxR.x + dX] = Tile.BoxR;
    }

    return true;
  };

  const nextL = grid[boxL.y + dY][boxL.x + dX];
  const nextR = grid[boxR.y + dY][boxR.x + dX];

  if (dY !== 0) {
    if (nextL === Tile.Wall || nextR === Tile.Wall) {
      return false;
    }

    const canMoveL = nextL === Tile.Space || moveBox2(grid, { y: boxL.y + dY, x: boxL.x }, { x: dX, y: dY }, false);
    const canMoveR = nextR === Tile.Space || moveBox2(grid, { y: boxR.y + dY, x: boxR.x }, { x: dX, y: dY }, false);

    if (canMoveL && canMoveR) {
      if (nextL !== Tile.Space) moveBox2(grid, { y: boxL.y + dY, x: boxL.x }, { x: dX, y: dY }, mutate);
      if (nextR !== Tile.Space) moveBox2(grid, { y: boxR.y + dY, x: boxR.x }, { x: dX, y: dY }, mutate);

      return move();
    }
  } else if (dX === -1) {
    if (
      nextL === Tile.Space ||
      (nextL === Tile.BoxR && moveBox2(grid, { y: boxL.y, x: boxL.x - 1 }, { x: dX, y: dY }))
    ) {
      return move();
    }
  } else if (dX === 1) {
    if (
      nextR === Tile.Space ||
      (nextR === Tile.BoxL && moveBox2(grid, { y: boxR.y, x: boxR.x + 1 }, { x: dX, y: dY }))
    ) {
      return move();
    }
  }

  return false;
}

function moveRobot2(grid: Grid, { x, y }: Coord, { x: dX, y: dY }: Coord): Coord {
  const nX = x + dX;
  const nY = y + dY;

  if (
    grid[nY][nX] === Tile.Space ||
    ((grid[nY][nX] === Tile.BoxL || grid[nY][nX] === Tile.BoxR) && moveBox2(grid, { x: nX, y: nY }, { x: dX, y: dY }))
  ) {
    return { x: nX, y: nY };
  }

  return { x, y };
}

export function part2({ grid, robot, moves }: Input): number {
  robot = { x: robot.x * 2, y: robot.y };
  grid = toWideGrid(grid);

  for (const m of moves) {
    robot = moveRobot2(grid, robot, toDirection(m));
  }

  let score = 0;
  for (let y = 1; y < grid.length; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === Tile.BoxL) {
        score += y * 100 + x;
      }
    }
  }

  return score;
}
