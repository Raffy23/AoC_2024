import { expect, test } from 'vitest';
import { parseInput, part1, part2, simulate, quadrant } from './day14';

const sampleInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    [
      { x: 0, y: 4 },
      { x: 3, y: -3 },
    ],
    [
      { x: 6, y: 3 },
      { x: -1, y: -3 },
    ],
    [
      { x: 10, y: 3 },
      { x: -1, y: 2 },
    ],
    [
      { x: 2, y: 0 },
      { x: 2, y: -1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 3 },
    ],
    [
      { x: 3, y: 0 },
      { x: -2, y: -2 },
    ],
    [
      { x: 7, y: 6 },
      { x: -1, y: -3 },
    ],
    [
      { x: 3, y: 0 },
      { x: -1, y: -2 },
    ],
    [
      { x: 9, y: 3 },
      { x: 2, y: 3 },
    ],
    [
      { x: 7, y: 3 },
      { x: -1, y: 2 },
    ],
    [
      { x: 2, y: 4 },
      { x: 2, y: -3 },
    ],
    [
      { x: 9, y: 5 },
      { x: -3, y: -3 },
    ],
  ]);
});

test('part1 - example', () => {
  expect(quadrant(simulate(parseInput(sampleInput), 7, 11, 100), 7, 11)).toStrictEqual({ q1: 1, q2: 4, q3: 1, q4: 3 });
});
