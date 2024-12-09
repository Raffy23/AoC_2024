import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day09';

const sampleInput = ['12345', '2333133121414131402\n'];

test('part1 - sample 1', () => {
  expect(part1(parseInput(sampleInput[0]))).toStrictEqual(60);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput[1]))).toStrictEqual(1928);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInput[1]))).toStrictEqual(2858);
});
