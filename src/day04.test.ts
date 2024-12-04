import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day04';

const sampleInputs1 = [
  `..X...
.SAMX.
.A..A.
XMAS.S
.X....`,
  `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`,
  `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
];

const sampleInputs2 = [
  `M.S
.A.
M.S`,
  `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
];

test('input parsing', () => {
  expect(parseInput(sampleInputs1[1])).toStrictEqual([sampleInputs1[1], 11]);
});

test('part1 - example1', () => {
  expect(part1(parseInput(sampleInputs1[0]))).toStrictEqual(4);
});

test('part1 - example2', () => {
  expect(part1(parseInput(sampleInputs1[1]))).toStrictEqual(18);
});

test('part1 - sample', () => {
  expect(part1(parseInput(sampleInputs1[2]))).toStrictEqual(18);
});

test('part2 - example2', () => {
  expect(part2(parseInput(sampleInputs2[0]))).toStrictEqual(1);
});

test('part2 - sample', () => {
  expect(part2(parseInput(sampleInputs2[1]))).toStrictEqual(9);
});
