type Input = Array<[number, Array<number>]>;

export function parseInput(data: string): Input {
  return data
    .trimEnd()
    .split('\n')
    .map((line) => {
      const numbers = line.matchAll(/(\d+)/g).map(([_, n]) => Number(n));
      return [numbers.next().value!, [...numbers]];
    });
}

function solve1(target: number, currentValue: number, numbers: Array<number>): boolean {
  if (currentValue > target) {
    return false;
  }

  if (currentValue === target) {
    return true;
  }

  if (numbers.length === 0) {
    return false;
  }

  const r1 = currentValue + numbers[0];
  const r2 = currentValue * numbers[0];
  const remaining = numbers.slice(1);

  return solve1(target, r1, remaining) || solve1(target, r2, remaining);
}

export function part1(input: Input): number {
  return input.filter(([target, numbers]) => solve1(target, 0, numbers)).reduce((sum, [value, _]) => sum + value, 0);
}

function solve2(target: number, currentValue: number, numbers: Array<number>): boolean {
  if (currentValue > target) {
    return false;
  }

  if (currentValue === target) {
    return true;
  }

  if (numbers.length === 0) {
    return false;
  }

  const r1 = currentValue + numbers[0];
  const r2 = currentValue * numbers[0];
  const r3 = Number(`${currentValue}${numbers[0]}`);
  const remaining = numbers.slice(1);

  return solve2(target, r1, remaining) || solve2(target, r2, remaining) || solve2(target, r3, remaining);
}

export function part2(input: Input) {
  return input.filter(([target, numbers]) => solve2(target, 0, numbers)).reduce((sum, [value, _]) => sum + value, 0);
}
