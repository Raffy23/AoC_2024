import { expect, test } from 'vitest';
import { findCheats, parseInput } from './day20';

const sampleInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;

test('part 1 - example', () => {
  expect(findCheats(parseInput(sampleInput), 2)).toStrictEqual(
    new Map([
      [2, 14],
      [4, 14],
      [6, 2],
      [8, 4],
      [10, 2],
      [12, 3],
      [20, 1],
      [36, 1],
      [38, 1],
      [40, 1],
      [64, 1],
    ]),
  );
});

test('part 2 - example', () => {
  expect(
    new Map(
      findCheats(parseInput(sampleInput), 20)
        .entries()
        .filter(([d]) => d >= 50),
    ),
  ).toStrictEqual(
    new Map([
      [50, 32],
      [52, 31],
      [54, 29],
      [56, 39],
      [58, 25],
      [60, 23],
      [62, 20],
      [64, 19],
      [66, 12],
      [68, 14],
      [70, 12],
      [72, 22],
      [74, 4],
      [76, 3],
    ]),
  );
});
