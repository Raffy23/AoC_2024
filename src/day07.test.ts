import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day07';

const sampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    [190, [10, 19]],
    [3267, [81, 40, 27]],
    [83, [17, 5]],
    [156, [15, 6]],
    [7290, [6, 8, 6, 15]],
    [161011, [16, 10, 13]],
    [192, [17, 8, 14]],
    [21037, [9, 7, 18, 13]],
    [292, [11, 6, 16, 20]],
  ]);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(3749);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInput))).toStrictEqual(11387);
});
