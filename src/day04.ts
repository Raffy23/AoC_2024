export function parseInput(data: string): [string, number] {
  return [data, data.indexOf('\n') + 1];
}

function matchWord(input: string, searchIdx: number, stride: number): boolean {
  return (
    // input[searchIdx] is assumed to be X
    input[searchIdx + stride * 1] == 'M' && input[searchIdx + stride * 2] == 'A' && input[searchIdx + stride * 3] == 'S'
  );
}

function forEachChar(input: string, char: string, fn: (idx: number) => number): number {
  let matches = 0;

  let searchIdx = input.indexOf(char);
  while (searchIdx !== -1) {
    matches += fn(searchIdx);
    searchIdx = input.indexOf(char, searchIdx + 1);
  }

  return matches;
}

export function part1([input, rowLen]: [string, number]): number {
  const directions = [1, -1, -rowLen, rowLen, rowLen + 1, rowLen - 1, -rowLen + 1, -rowLen - 1];

  return forEachChar(
    input,
    'X',
    (searchIdx) => directions.map((direction) => matchWord(input, searchIdx, direction)).filter((v) => v).length,
  );
}

function matchShape(input: string, searchIdx: number, rowLen: number): boolean {
  const match1 = 'MS';
  const match2 = 'SM';

  const dL = input[searchIdx - rowLen - 1] + input[searchIdx + rowLen + 1];
  const dR = input[searchIdx + rowLen - 1] + input[searchIdx - rowLen + 1];

  return (dL == match1 || dL == match2) && (dR == match1 || dR == match2);
}

export function part2([input, rowLen]: [string, number]): number {
  return forEachChar(input, 'A', (searchIdx) => (matchShape(input, searchIdx, rowLen) ? 1 : 0));
}
