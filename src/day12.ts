export function parseInput(data: string): Array<string> {
  return data.trimEnd().split('\n');
}

function scanPlot(
  area: Array<string>,
  plant: string,
  visited: Array<Array<boolean>>,
  y: number,
  x: number,
): [number, number] {
  if (y < 0 || x < 0 || y >= area.length || x >= area[0].length || area[y][x] !== plant) {
    return [0, 1];
  }

  if (visited[y][x]) {
    return [0, 0];
  }

  visited[y][x] = true;

  const u = scanPlot(area, plant, visited, y - 1, x);
  const d = scanPlot(area, plant, visited, y + 1, x);
  const l = scanPlot(area, plant, visited, y, x - 1);
  const r = scanPlot(area, plant, visited, y, x + 1);

  return [u[0] + d[0] + l[0] + r[0] + 1, u[1] + d[1] + l[1] + r[1]];
}

export function part1(input: Array<string>): number {
  const visited = input.map((a) => new Array(a.length).fill(false));

  let score = 0;
  for (let y = 0; y < input.length; y++) {
    let x = visited[y].indexOf(false);

    while (x !== -1) {
      const [count, fence] = scanPlot(input, input[y][x], visited, y, x);
      score += count * fence;
      x = visited[y].indexOf(false, x + 1);
    }
  }

  return score;
}

function scanPlot2(
  area: Array<string>,
  plant: string,
  visited: Array<Array<boolean>>,
  y: number,
  x: number,
): [number, number, number] {
  const outOfBounds = (y: number, x: number): boolean => y < 0 || x < 0 || y >= area.length || x >= area[0].length;

  if (outOfBounds(y, x) || area[y][x] !== plant) {
    return [0, 1, 0];
  }

  if (visited[y][x]) {
    return [0, 0, 0];
  }

  visited[y][x] = true;

  const [u, fU, cF] = scanPlot2(area, plant, visited, y - 1, x);
  const [d, fD, cD] = scanPlot2(area, plant, visited, y + 1, x);
  const [l, fL, cL] = scanPlot2(area, plant, visited, y, x - 1);
  const [r, fR, cR] = scanPlot2(area, plant, visited, y, x + 1);

  let corners = cF + cD + cL + cR;
  const [uL, uR, dL, dR] = [
    !outOfBounds(y - 1, x - 1) && area[y - 1][x - 1] === plant,
    !outOfBounds(y - 1, x + 1) && area[y - 1][x + 1] === plant,
    !outOfBounds(y + 1, x - 1) && area[y + 1][x - 1] === plant,
    !outOfBounds(y + 1, x + 1) && area[y + 1][x + 1] === plant,
  ];

  if (fU && uL && !fL) {
    corners++;
  }
  if (fU && uR && !fR) {
    corners++;
  }
  if (fD && dL && !fL) {
    corners++;
  }
  if (fD && dR && !fR) {
    corners++;
  }

  const fences = fU + fD + fL + fR;
  switch (fences) {
    case 0:
    case 1:
      corners += 0;
      break;
    case 4:
      corners += 4;
      break;
    case 3:
      corners += 2;
      break;
    case 2:
      if ((fU && fL) || (fU && fR) || (fD && fL) || (fD && fR)) {
        corners += 1;
      }
      break;
  }

  return [u + d + l + r + 1, 0, corners];
}

export function part2(input: Array<string>): number {
  const visited = input.map((a) => new Array(a.length).fill(false));

  let score = 0;
  for (let y = 0; y < input.length; y++) {
    let x = visited[y].indexOf(false);

    while (x !== -1) {
      const [count, _, sides] = scanPlot2(input, input[y][x], visited, y, x);
      score += count * sides;
      x = visited[y].indexOf(false, x + 1);
    }
  }

  return score;
}
