import { expect, test } from 'vitest';
import { parseInput, run, part1, part2 } from './day11';

test('part1 - example (6)', () => {
  expect(run(parseInput('125 17'), 6)).toStrictEqual(22);
});

test('part1 - example (25)', () => {
  expect(part1(parseInput('125 17'))).toStrictEqual(55312);
});
