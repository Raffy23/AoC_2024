import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day13';

const sampleInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    {
      a: { x: 94, y: 34 },
      b: { x: 22, y: 67 },
      prize: { x: 8400, y: 5400 },
    },
    {
      a: { x: 26, y: 66 },
      b: { x: 67, y: 21 },
      prize: { x: 12748, y: 12176 },
    },
    {
      a: { x: 17, y: 86 },
      b: { x: 84, y: 37 },
      prize: { x: 7870, y: 6450 },
    },
    {
      a: { x: 69, y: 23 },
      b: { x: 27, y: 71 },
      prize: { x: 18641, y: 10279 },
    },
  ]);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(480);
});
