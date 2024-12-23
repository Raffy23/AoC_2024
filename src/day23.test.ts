import { expect, test } from 'vitest';
import { parseInput, part1, part2 } from './day23';

const sampleInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;

test('parse input', () => {
  expect(parseInput(sampleInput)).toStrictEqual(
    new Map([
      ['kh', new Set(['tc', 'qp', 'ub', 'ta'])],
      ['tc', new Set(['kh', 'wh', 'td', 'co'])],
      ['qp', new Set(['kh', 'ub', 'td', 'wh'])],
      ['de', new Set(['cg', 'co', 'ta', 'ka'])],
      ['cg', new Set(['de', 'tb', 'yn', 'aq'])],
      ['ka', new Set(['co', 'tb', 'de', 'ta'])],
      ['co', new Set(['ka', 'ta', 'de', 'tc'])],
      ['yn', new Set(['aq', 'cg', 'wh', 'td'])],
      ['aq', new Set(['yn', 'vc', 'wq', 'cg'])],
      ['ub', new Set(['qp', 'kh', 'wq', 'vc'])],
      ['vc', new Set(['aq', 'ub', 'wq', 'tb'])],
      ['tb', new Set(['ka', 'cg', 'wq', 'vc'])],
      ['wh', new Set(['tc', 'td', 'yn', 'qp'])],
      ['wq', new Set(['tb', 'ub', 'aq', 'vc'])],
      ['td', new Set(['tc', 'wh', 'qp', 'yn'])],
      ['ta', new Set(['co', 'ka', 'de', 'kh'])],
    ]),
  );
});

test('part 1 - example', () => {
  expect(part1(parseInput(sampleInput))).toStrictEqual(7);
});

test('part 2 - example', () => {
  expect(part2(parseInput(sampleInput))).toStrictEqual('co,de,ka,ta');
});
