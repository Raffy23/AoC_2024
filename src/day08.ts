type Point = {
  x: number;
  y: number;
};

type Size = {
  h: number;
  w: number;
};

type Input = [Map<string, Array<Point>>, Size];

function toKey(x: number, y: number): number {
  return x * 100 + y;
}

export function parseInput(data: string): Input {
  const result = new Map();
  const lines = [...data.trimEnd().split('\n')];
  const size = { w: lines[0].length, h: lines.length };

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
      const symbol = line[x];
      if (symbol !== '.') {
        let list = result.get(symbol);

        if (list === undefined) {
          list = [];
          result.set(symbol, list);
        }

        list.push({ x, y });
      }
    }
  }

  return [result, size];
}

function addIfInMap(nodes: Set<number>, { w, h }: Size, { x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) {
  const dX = x1 - x2;
  const dY = y1 - y2;

  const aX = x1 + dX;
  const aY = y1 + dY;
  if (aX >= 0 && aX < w && aY >= 0 && aY < h) {
    nodes.add(toKey(aY, aX));
  }

  const bX = x2 - dX;
  const bY = y2 - dY;
  if (bX >= 0 && bX < w && bY >= 0 && bY < h) {
    nodes.add(toKey(bY, bX));
  }
}

export function part1([result, size]: Input): number {
  const antiNodes = new Set<number>();

  for (const [_, list] of result) {
    while (list.length > 1) {
      const [p1] = list.splice(0, 1);

      for (const p2 of list) {
        addIfInMap(antiNodes, size, p1, p2);
      }
    }
  }

  return antiNodes.size;
}

function addAllDistances(nodes: Set<number>, { w, h }: Size, { x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) {
  const dX = x1 - x2;
  const dY = y1 - y2;

  const loop = (o: number, { x, y }: Point) => {
    let i = 1;
    let aX = x + dX * i;
    let aY = y + dY * i;
    while (aX >= 0 && aX < w && aY >= 0 && aY < h) {
      nodes.add(toKey(aY, aX));

      i += o;
      aX = x + dX * i;
      aY = y + dY * i;
    }
  };

  loop(1, { x: x1, y: y1 });
  loop(-1, { x: x1, y: y1 });
  loop(1, { x: x2, y: y2 });
  loop(-1, { x: x2, y: y2 });
}

export function part2([result, size]: Input): number {
  const antiNodes = new Set<number>();

  for (const [_, list] of result) {
    while (list.length > 1) {
      const [p1] = list.splice(0, 1);

      for (const p2 of list) {
        addAllDistances(antiNodes, size, p1, p2);
      }
    }
  }

  return antiNodes.size;
}
