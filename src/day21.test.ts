import { expect, test } from 'vitest';
import { part1, parseInput } from './day21';

const sampleInput = `029A
980A
179A
456A
379A
`;

test('lut', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(126384);
});
