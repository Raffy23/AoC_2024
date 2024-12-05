import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day05';

const sampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

test('input parsing', () => {
  expect(parseInput(sampleInput)).toStrictEqual({
    ordering: new Map([
      [47, new Set([53, 13, 61, 29])],
      [97, new Set([13, 61, 47, 29, 53, 75])],
      [75, new Set([29, 53, 47, 61, 13])],
      [61, new Set([13, 53, 29])],
      [29, new Set([13])],
      [53, new Set([29, 13])],
    ]),
    pages: [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ],
  });
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(143);
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInput))).toStrictEqual(123);
});
