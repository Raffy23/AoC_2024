type Coord = {
  x: number;
  y: number;
};
type Input = Array<{
  a: Coord;
  b: Coord;
  prize: Coord;
}>;

export function parseInput(data: string): Input {
  return data.split('\n\n').map((block) => {
    const [[_1, aX], [_2, aY], [_3, bX], [_4, bY], [_5, pX], [_6, pY]] = [...block.matchAll(/(\d+)/g)];
    return {
      a: { x: Number(aX), y: Number(aY) },
      b: { x: Number(bX), y: Number(bY) },
      prize: { x: Number(pX), y: Number(pY) },
    };
  });
}

/*
  A*a_x + B*b_x = p_x
  A*a_y + B*b_y = p_y

  A = (p_x - B*b_x) / a_x
  A = (p_y - B*b_y) / a_y
  B = (p_x - A*a_x) / b_x
  B = (p_y - A*a_y) / b_y

  (p_x - B*b_x) / a_x = (p_y - B*b_y) / a_y
  a_y*p_x - B*b_x*a_y = a_x*p_y - B*b_y*a_x
  B*b_y*a_x - B*b_x*a_y = a_x*p_y - a_y*p_x
  B = (a_x*p_y - a_y*p_x) / (b_y*a_x - b_x*a_y)

  (p_x - A*a_x) / b_x = (p_y - A*a_y) / b_y
  b_y*p_y - A*a_x*b_y = b_x*p_y - A*a_y*b_x
  A*a_y*b_x - A*a_x*b_y = b_x*p_y - b_y*p_y
  A = (b_x*p_y - b_y*p_x) / (a_y*b_x - a_x*b_y)
*/
function cost(a_x: number, a_y: number, b_x: number, b_y: number, p_x: number, p_y: number): number {
  const A = (b_x * p_y - b_y * p_x) / (a_y * b_x - a_x * b_y);
  const B = (a_x * p_y - a_y * p_x) / (b_y * a_x - b_x * a_y);

  if (!Number.isInteger(A) || !Number.isInteger(B)) {
    return 0;
  }

  return 3 * A + B;
}

export function part1(input: Input) {
  return input.reduce((sum, m) => sum + cost(m.a.x, m.a.y, m.b.x, m.b.y, m.prize.x, m.prize.y), 0);
}
export function part2(input: Input) {
  const offset = 10000000000000;
  return input.reduce((sum, m) => sum + cost(m.a.x, m.a.y, m.b.x, m.b.y, m.prize.x + offset, m.prize.y + offset), 0);
}
