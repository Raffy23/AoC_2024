import { expect, test } from 'vitest';
import { _part2, _part1, parseInput } from './day18';

const sampleInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;

test('parse input', () => {
  expect(parseInput(sampleInput)).toStrictEqual([
    { x: 5, y: 4 },
    { x: 4, y: 2 },
    { x: 4, y: 5 },
    { x: 3, y: 0 },
    { x: 2, y: 1 },
    { x: 6, y: 3 },
    { x: 2, y: 4 },
    { x: 1, y: 5 },
    { x: 0, y: 6 },
    { x: 3, y: 3 },
    { x: 2, y: 6 },
    { x: 5, y: 1 },
    { x: 1, y: 2 },
    { x: 5, y: 5 },
    { x: 2, y: 5 },
    { x: 6, y: 5 },
    { x: 1, y: 4 },
    { x: 0, y: 4 },
    { x: 6, y: 4 },
    { x: 1, y: 1 },
    { x: 6, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 5 },
    { x: 1, y: 6 },
    { x: 2, y: 0 },
  ]);
});

test('part 1 - small', () => {
  expect(_part1(parseInput(sampleInput), 6, 6, 12)).toStrictEqual(22);
});

test('part 2 - small', () => {
  expect(_part2(parseInput(sampleInput), 6, 6, 12)).toStrictEqual({ x: 6, y: 1 });
});
