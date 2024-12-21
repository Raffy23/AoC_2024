import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day19';

const sampleInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

test('parse input', () => {
  expect(parseInput(sampleInput)).toStrictEqual({
    patterns: ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'],
    designs: ['brwrr', 'bggr', 'gbbr', 'rrbgbr', 'ubwu', 'bwurrg', 'brgr', 'bbrgwb'],
  });
});

test('part 1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(6);
});

test('part 2 - example', () => {
  expect(part2(parseInput(sampleInput))).toStrictEqual(16);
});
