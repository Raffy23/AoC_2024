import { expect, test } from 'vitest';
import { parseInput, part1 } from './day25';

const sampleInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`;

test('parse input', () => {
  expect(parseInput(sampleInput)).toStrictEqual({
    keys: [
      [5, 0, 2, 1, 3],
      [4, 3, 4, 0, 2],
      [3, 0, 2, 0, 1],
    ],
    locks: [
      [0, 5, 3, 4, 3],
      [1, 2, 0, 5, 3],
    ],
  });
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(3);
});
