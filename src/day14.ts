type Vec2 = {
  x: number;
  y: number;
};

export function parseInput(data: string): Array<[Vec2, Vec2]> {
  return [
    ...data.matchAll(/^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/gm).map(
      ([_, pX, pY, vX, vY]) =>
        [
          { x: Number(pX), y: Number(pY) },
          { x: Number(vX), y: Number(vY) },
        ] as [Vec2, Vec2],
    ),
  ];
}

export function simulate(input: Array<[Vec2, Vec2]>, h: number, w: number, s: number): Array<Vec2> {
  return input.map(([pos, vel]) => {
    const x = (pos.x + w + ((vel.x * s) % w)) % w;
    const y = (pos.y + h + ((vel.y * s) % h)) % h;

    return { x, y };
  });
}

export function quadrant(input: Array<Vec2>, h: number, w: number): { q1: number; q2: number; q3: number; q4: number } {
  const qW = Math.floor(w / 2);
  const qH = Math.floor(h / 2);

  const inQ1 = (x: number, y: number) => x > 0 && y > 0;
  const inQ2 = (x: number, y: number) => x < 0 && y > 0;
  const inQ3 = (x: number, y: number) => x < 0 && y < 0;
  const inQ4 = (x: number, y: number) => x > 0 && y < 0;

  return input.reduce(
    ({ q1, q2, q3, q4 }, { x, y }) => {
      const rX = x - qW;
      const rY = y - qH;

      if (inQ1(rX, rY)) {
        return { q1: q1 + 1, q2, q3, q4 };
      }

      if (inQ2(rX, rY)) {
        return { q1, q2: q2 + 1, q3, q4 };
      }

      if (inQ3(rX, rY)) {
        return { q1, q2, q3: q3 + 1, q4 };
      }

      if (inQ4(rX, rY)) {
        return { q1, q2, q3, q4: q4 + 1 };
      }

      return { q1, q2, q3, q4 };
    },
    { q1: 0, q2: 0, q3: 0, q4: 0 },
  );
}

export function part1(input: Array<[Vec2, Vec2]>): number {
  const time = 100;
  const height = 103;
  const width = 101;

  const positions = simulate(input, height, width, time);
  const { q1, q2, q3, q4 } = quadrant(positions, height, width);

  return q1 * q2 * q3 * q4;
}

export function print(input: Array<Vec2>, h: number, w: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (input.findIndex(({ x: vX, y: vY }) => x === vX && y === vY) !== -1) {
        process.stdout.write('█');
      } else {
        process.stdout.write(' ');
      }
    }
    process.stdout.write('\n');
  }
}

function holes(positions: Array<Vec2>): number {
  const holesOfRow = (input: Array<number>) => {
    let count = 0;

    input.sort();
    for (let i = 0; i < input.length - 1; i++) {
      if (input[i + 1] - input[i] >= 2) {
        count++;
      }
    }

    return count;
  };

  const rows = new Map<number, Array<number>>();
  positions.forEach(({ x, y }) => {
    let row = rows.get(y);
    if (row === undefined) {
      row = [];
      rows.set(y, row);
    }

    row.push(x);
  });

  return rows.values().reduce((sum, pos) => sum + holesOfRow(pos), 0);
}

export function part2(input: Array<[Vec2, Vec2]>): number {
  const time = 100;
  const height = 103;
  const width = 101;

  let avg = 0;
  for (let t = time + 1; ; t++) {
    const positions = simulate(input, height, width, t);
    const h = holes(positions);

    avg += (h - avg) / (t - time);

    // To form a picture, the amount of holes between the robots has to be minimal
    // Assume outlier from average is such a case
    if (Math.abs(avg - h) > avg / 3) {
      // For debugging:
      //print(positions, height, width);
      return t;
    }
  }
}
