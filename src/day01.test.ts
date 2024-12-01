import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day01';

const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    [3, 4, 2, 1, 3, 3],
    [4, 3, 5, 3, 9, 3],
  ]);
});

test('part1 - sample', () => {
  expect(
    part1([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]),
  ).toStrictEqual(11);
});

test('part2 - sample', () => {
  expect(
    part2([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]),
  ).toStrictEqual(31);
});
