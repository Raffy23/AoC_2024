import { expect, test } from 'vitest';
import { parseInput, execute, simulate, State, part1, part2, ArrayOutput } from './day17';

function state(a: number, b: number, c: number, i: number): State {
  return {
    a: BigInt(a),
    b: BigInt(b),
    c: BigInt(c),
    i: i,
  };
}

const sampleInputs = [
  `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`,
  `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`,
];

test('parse input', () => {
  expect(parseInput(sampleInputs[0])).toStrictEqual({
    state: {
      a: 729n,
      b: 0n,
      c: 0n,
      i: 0,
    },
    program: [0, 1, 5, 4, 3, 0],
  });
});

test('program 2,6', () => {
  const s = state(0, 0, 9, 0);

  expect(execute(s, [2, 6], ArrayOutput())).toStrictEqual(true);
  expect(s.b).toStrictEqual(1n);
});

test('program 5,0,5,1,5,4', () => {
  const s = state(10, 0, 0, 0);
  const o = ArrayOutput();

  simulate(s, [5, 0, 5, 1, 5, 4], o);

  expect(o.values).toStrictEqual([0, 1, 2]);
});

test('program 0,1,5,4,3,0', () => {
  const s = state(2024, 0, 0, 0);
  const o = ArrayOutput();

  simulate(s, [0, 1, 5, 4, 3, 0], o);

  expect(s.a).toStrictEqual(0n);
  expect(o.values).toStrictEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
});

test('program 1,7', () => {
  const s = state(0, 29, 0, 0);

  expect(execute(s, [1, 7], ArrayOutput())).toStrictEqual(true);
  expect(s.b).toStrictEqual(26n);
});

test('program 1,7', () => {
  const s = state(0, 2024, 43690, 0);

  expect(execute(s, [4, 0], ArrayOutput())).toStrictEqual(true);
  expect(s.b).toStrictEqual(44354n);
});

test('part1 - example', () => {
  expect(part1(parseInput(sampleInputs[0]))).toStrictEqual('4,6,3,5,6,3,5,2,1,0');
});

test('part2 - example', () => {
  expect(part2(parseInput(sampleInputs[1]))).toStrictEqual(117440n);
});
