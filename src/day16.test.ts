import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day16';

const sampleInputs = [
  `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,
  `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
];

test('part1 - example 1', () => {
  expect(part1(parseInput(sampleInputs[0]))).toStrictEqual(7036);
});

test('part1 - example 2', () => {
  expect(part1(parseInput(sampleInputs[1]))).toStrictEqual(11048);
});

test('part2 - example 1', () => {
  expect(part2(parseInput(sampleInputs[0]))).toStrictEqual(45);
});

test('part2 - example 2', () => {
  expect(part2(parseInput(sampleInputs[1]))).toStrictEqual(64);
});
