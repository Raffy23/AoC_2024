import { expect, test } from 'vitest';
import { nextRandom, part1, part2, parseInput } from './day22';

const sampleInputs = [
  `1
10
100
2024
`,
  `1
2
3
2024
`,
];
test('sample', () => {
  const inputs = [
    123n,
    15887950n,
    16495136n,
    527345n,
    704524n,
    1553684n,
    12683156n,
    11100544n,
    12249484n,
    7753432n,
    5908254n,
  ];

  for (let i = 0; i < inputs.length - 1; i++) {
    expect(nextRandom(inputs[i])).toStrictEqual(inputs[i + 1]);
  }
});

test('part 1 - example', () => {
  expect(part1(parseInput(sampleInputs[0]))).toStrictEqual(37327623n);
});

test('part 2 - example', () => {
  expect(part2(parseInput(sampleInputs[1]))).toStrictEqual(23);
});
