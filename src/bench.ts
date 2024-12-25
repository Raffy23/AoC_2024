/* eslint-disable @typescript-eslint/no-explicit-any */
import { readInput } from './utils';

import * as Day01 from './day01';
import * as Day02 from './day02';
import * as Day03 from './day03';
import * as Day04 from './day04';
import * as Day05 from './day05';
import * as Day06 from './day06';
import * as Day07 from './day07';
import * as Day08 from './day08';
import * as Day09 from './day09';
import * as Day10 from './day10';
import * as Day11 from './day11';
import * as Day12 from './day12';
import * as Day13 from './day13';
import * as Day14 from './day14';
import * as Day15 from './day15';
import * as Day16 from './day16';
import * as Day17 from './day17';
import * as Day18 from './day18';
import * as Day19 from './day19';
import * as Day20 from './day20';
import * as Day21 from './day21';
import * as Day22 from './day22';
import * as Day23 from './day23';
import * as Day24 from './day24';
import * as Day25 from './day25';

type Day<Input> = {
  parseInput: (data: string) => Input;
  solve1: (input: Input) => number | bigint | string;
  solve2: (input: Input) => number | bigint | string;
};

type Result = {
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  samples: number;
};

const TEST_ITERATIONS = 1000;
const WARM_UP_ITERATIONS = 10;

function bench<I, F extends (input: I) => any>(f: F, input: I): Result {
  let i = WARM_UP_ITERATIONS;

  const w0 = performance.now();
  while (i-- > 0) {
    f(input);
  }
  const w1 = performance.now();
  const warmUpTime = (w1 - w0) / WARM_UP_ITERATIONS; // ms
  const iterations = Math.min(TEST_ITERATIONS, 1_000 / warmUpTime);

  const measures = [];
  i = iterations;
  while (i-- > 0) {
    const t0 = performance.now();
    f(input);
    const t1 = performance.now();
    measures.push(t1 - t0);
  }

  const mean = measures.reduce((sum, value) => sum + value, 0) / measures.length;

  return {
    min: Math.min(...measures),
    max: Math.max(...measures),
    mean,
    stdDev: Math.sqrt(measures.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / measures.length),
    samples: measures.length,
  };
}

const Days = new Map<string, { f: (arg0: any) => number | string | bigint; p: (data: string) => any; i: string }>([
  ['01 1', { f: Day01.part1, p: Day01.parseInput, i: readInput('01') }],
  ['01 2', { f: Day01.part2, p: Day01.parseInput, i: readInput('01') }],
  ['02 1', { f: Day02.part1, p: Day02.parseInput, i: readInput('02') }],
  ['02 2', { f: Day02.part2, p: Day02.parseInput, i: readInput('02') }],
  ['03 1', { f: Day03.part1, p: Day03.parseInput1, i: readInput('03') }],
  ['03 2', { f: Day03.part2, p: Day03.parseInput2, i: readInput('03') }],
  ['04 1', { f: Day04.part1, p: Day04.parseInput, i: readInput('04') }],
  ['04 2', { f: Day04.part2, p: Day04.parseInput, i: readInput('04') }],
  ['05 1', { f: Day05.part1, p: Day05.parseInput, i: readInput('05') }],
  ['05 2', { f: Day05.part2, p: Day05.parseInput, i: readInput('05') }],
  ['06 1', { f: Day06.part1, p: Day06.parseInput, i: readInput('06') }],
  ['06 2', { f: Day06.part2, p: Day06.parseInput, i: readInput('06') }],
  ['07 1', { f: Day07.part1, p: Day07.parseInput, i: readInput('07') }],
  ['07 2', { f: Day07.part2, p: Day07.parseInput, i: readInput('07') }],
  ['08 1', { f: Day08.part1, p: Day08.parseInput, i: readInput('08') }],
  ['08 2', { f: Day08.part2, p: Day08.parseInput, i: readInput('08') }],
  ['09 1', { f: Day09.part1, p: Day09.parseInput, i: readInput('09') }],
  ['09 2', { f: Day09.part2, p: Day09.parseInput, i: readInput('09') }],
  ['10 1', { f: Day10.part1, p: Day10.parseInput, i: readInput('10') }],
  ['10 2', { f: Day10.part2, p: Day10.parseInput, i: readInput('10') }],
  ['11 1', { f: Day11.part1, p: Day11.parseInput, i: readInput('11') }],
  ['11 2', { f: Day11.part2, p: Day11.parseInput, i: readInput('11') }],
  ['12 1', { f: Day12.part1, p: Day12.parseInput, i: readInput('12') }],
  ['12 2', { f: Day12.part2, p: Day12.parseInput, i: readInput('12') }],
  ['13 1', { f: Day13.part1, p: Day13.parseInput, i: readInput('13') }],
  ['13 2', { f: Day13.part2, p: Day13.parseInput, i: readInput('13') }],
  ['14 1', { f: Day14.part1, p: Day14.parseInput, i: readInput('14') }],
  ['14 2', { f: Day14.part2, p: Day14.parseInput, i: readInput('14') }],
  ['15 1', { f: Day15.part1, p: Day15.parseInput, i: readInput('15') }],
  ['15 2', { f: Day15.part2, p: Day15.parseInput, i: readInput('15') }],
  ['16 1', { f: Day16.part1, p: Day16.parseInput, i: readInput('16') }],
  ['16 2', { f: Day16.part2, p: Day16.parseInput, i: readInput('16') }],
  ['17 1', { f: Day17.part1, p: Day17.parseInput, i: readInput('17') }],
  ['17 2', { f: Day17.part2, p: Day17.parseInput, i: readInput('17') }],
  ['18 1', { f: Day18.part1, p: Day18.parseInput, i: readInput('18') }],
  ['18 2', { f: Day18.part2, p: Day18.parseInput, i: readInput('18') }],
  ['19 1', { f: Day19.part1, p: Day19.parseInput, i: readInput('19') }],
  ['19 2', { f: Day19.part2, p: Day19.parseInput, i: readInput('19') }],
  ['20 1', { f: Day20.part1, p: Day20.parseInput, i: readInput('20') }],
  ['20 2', { f: Day20.part2, p: Day20.parseInput, i: readInput('20') }],
  ['21 1', { f: Day21.part1, p: Day21.parseInput, i: readInput('21') }],
  ['21 2', { f: Day21.part2, p: Day21.parseInput, i: readInput('21') }],
  ['22 1', { f: Day22.part1, p: Day22.parseInput, i: readInput('22') }],
  ['22 2', { f: Day22.part2, p: Day22.parseInput, i: readInput('22') }],
  ['23 1', { f: Day23.part1, p: Day23.parseInput, i: readInput('23') }],
  ['23 2', { f: Day23.part2, p: Day23.parseInput, i: readInput('23') }],
  ['24 1', { f: Day24.part1, p: Day24.parseInput, i: readInput('24') }],
  ['24 2', { f: Day24.part2, p: Day24.parseInput, i: readInput('24') }],
  ['25 1', { f: Day25.part1, p: Day25.parseInput, i: readInput('25') }],
]);

const padding = 9;
console.log('Day\t      max   \t      min   \t     mean ∓ std dev  \tsamples');
Days.entries().forEach(([day, { f, p, i }]) => {
  const { min, max, mean, samples, stdDev } = bench((input: string) => f(p(input)), i as any);

  const maxF = max.toFixed(3).padStart(padding, ' ');
  const minF = min.toFixed(3).padStart(padding, ' ');
  const meanF = mean.toFixed(3).padStart(padding, ' ');
  const stdDevF = stdDev.toFixed(3).padEnd(4, ' ');

  console.log(`${day}\t${maxF} ms\t${minF} ms\t${meanF} ∓ ${stdDevF} ms\t${samples.toString().padStart(7, ' ')}`);
});
