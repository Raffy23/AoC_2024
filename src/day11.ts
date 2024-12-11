export function parseInput(data: string): Array<number> {
  return data
    .trimEnd()
    .split(' ')
    .map((s) => Number(s));
}

function toKey(stone: number, itr: number): number {
  return stone * 100 + itr;
}

function blink(cache: Map<number, number>, iteration: number, stone: number): number {
  if (iteration === 0) {
    return 1;
  }

  const key = toKey(stone, iteration);
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  if (stone === 0) {
    const count = blink(cache, iteration - 1, 1);
    cache.set(key, count);

    return count;
  }

  if (stone === 1) {
    const count = blink(cache, iteration - 1, 2024);
    cache.set(key, count);

    return count;
  }

  const digits = `${stone}`;
  if (digits.length % 2 === 0) {
    const l = Number(digits.slice(0, digits.length / 2));
    const r = Number(digits.slice(digits.length / 2));

    const count = blink(cache, iteration - 1, l) + blink(cache, iteration - 1, r);
    cache.set(key, count);
    return count;
  }

  const count = blink(cache, iteration - 1, stone * 2024);
  cache.set(key, count);

  return count;
}

export function run(input: Array<number>, count: number) {
  const cache = new Map();
  return input.reduce((sum, stone) => sum + blink(cache, count, stone), 0);
}

export function part1(input: Array<number>): number {
  return run(input, 25);
}

export function part2(input: Array<number>): number {
  return run(input, 75);
}
