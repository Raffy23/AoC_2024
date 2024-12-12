import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day12';

const sampleInputs = [
  `AAAA
BBCD
BBCC
EEEC
`,
  `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,
  `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
  `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
];

test('part1 - example', () => {
  expect(part1(parseInput(sampleInputs[1]))).toStrictEqual(1930);
});

test('part2 - sample 1', () => {
  expect(part2(parseInput(sampleInputs[2]))).toStrictEqual(236);
});

test('part2 - sample 2', () => {
  expect(part2(parseInput(sampleInputs[3]))).toStrictEqual(368);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInputs[1]))).toStrictEqual(1206);
});
