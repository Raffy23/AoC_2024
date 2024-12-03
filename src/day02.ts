export type Input = Array<Array<number>>;

export function parseInput(data: string): Input {
  return data
    .trimEnd()
    .split('\n')
    .map((str) => str.split(' ').map((n) => Number(n)));
}

function isSafe(report: Array<number>): boolean {
  let prevDiff = report[1] - report[0];

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];

    const badDirection = Math.sign(prevDiff) != Math.sign(diff);
    const badSlope = Math.abs(diff) > 3 || diff === 0;

    if (badDirection || badSlope) {
      return false;
    }

    prevDiff = diff;
  }

  return true;
}

export function part1(input: Input): number {
  return input.reduce((sum, report) => sum + (isSafe(report) ? 1 : 0), 0);
}

function isSafe2(report: Array<number>): boolean {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    let tmp = [...report];
    tmp.splice(i, 1);

    if (isSafe(tmp)) {
      return true;
    }
  }

  return false;
}

export function part2(input: Input): number {
  return input.reduce((sum, report) => sum + (isSafe2(report) ? 1 : 0), 0);
}
