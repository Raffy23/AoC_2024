import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day08';

const sampleInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    new Map([
      [
        '0',
        [
          { x: 8, y: 1 },
          { x: 5, y: 2 },
          { x: 7, y: 3 },
          { x: 4, y: 4 },
        ],
      ],
      [
        'A',
        [
          { x: 6, y: 5 },
          { x: 8, y: 8 },
          { x: 9, y: 9 },
        ],
      ],
    ]),
    { w: 12, h: 12 },
  ]);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(14);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInput))).toStrictEqual(34);
});
