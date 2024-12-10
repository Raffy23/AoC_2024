import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day10';

const sampleInput = [
  `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9
`,
  `..90..9
...1.98
...2..7
6543456
765.987
876....
987....
`,
  `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01
`,
  `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
];

test('part1 - sample 1', () => {
  expect(part1(parseInput(sampleInput[0]))).toStrictEqual(2);
});

test('part1 - sample 2', () => {
  expect(part1(parseInput(sampleInput[1]))).toStrictEqual(4);
});

test('part1 - sample 3', () => {
  expect(part1(parseInput(sampleInput[2]))).toStrictEqual(3);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput[3]))).toStrictEqual(36);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInput[3]))).toStrictEqual(81);
});
