import { expect, test } from 'vitest';
import { parseInput1, part1, parseInput2, part2 } from './day03';

const sampleInput1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const sampleInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

test('input parsing - part 1', () => {
  expect(parseInput1(sampleInput1)).toStrictEqual([
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5],
  ]);
});

test('part1 - sample', () => {
  expect(
    part1([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ]),
  ).toStrictEqual(161);
});

test('input parsing - part 2', () => {
  expect(parseInput2(sampleInput2)).toStrictEqual([
    { type: 'mul', n1: 2, n2: 4 },
    { type: "don't" },
    { type: 'mul', n1: 5, n2: 5 },
    { type: 'mul', n1: 11, n2: 8 },
    { type: 'do' },
    { type: 'mul', n1: 8, n2: 5 },
  ]);
});

test('part2 - sample', () => {
  expect(
    part2([
      { type: 'mul', n1: 2, n2: 4 },
      { type: "don't" },
      { type: 'mul', n1: 5, n2: 5 },
      { type: 'mul', n1: 11, n2: 8 },
      { type: 'do' },
      { type: 'mul', n1: 8, n2: 5 },
    ]),
  ).toStrictEqual(48);
});
