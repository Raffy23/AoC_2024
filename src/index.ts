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

const Days = new Map<string, () => number | string | bigint>([
  ['01 1', () => Day01.part1(Day01.parseInput(readInput('01')))],
  ['01 2', () => Day01.part2(Day01.parseInput(readInput('01')))],
  ['02 1', () => Day02.part1(Day02.parseInput(readInput('02')))],
  ['02 2', () => Day02.part2(Day02.parseInput(readInput('02')))],
  ['03 1', () => Day03.part1(Day03.parseInput1(readInput('03')))],
  ['03 2', () => Day03.part2(Day03.parseInput2(readInput('03')))],
  ['04 1', () => Day04.part1(Day04.parseInput(readInput('04')))],
  ['04 2', () => Day04.part2(Day04.parseInput(readInput('04')))],
  ['05 1', () => Day05.part1(Day05.parseInput(readInput('05')))],
  ['05 2', () => Day05.part2(Day05.parseInput(readInput('05')))],
  ['06 1', () => Day06.part1(Day06.parseInput(readInput('06')))],
  ['06 2', () => Day06.part2(Day06.parseInput(readInput('06')))],
  ['07 1', () => Day07.part1(Day07.parseInput(readInput('07')))],
  ['07 2', () => Day07.part2(Day07.parseInput(readInput('07')))],
  ['08 1', () => Day08.part1(Day08.parseInput(readInput('08')))],
  ['08 2', () => Day08.part2(Day08.parseInput(readInput('08')))],
  ['09 1', () => Day09.part1(Day09.parseInput(readInput('09')))],
  ['09 2', () => Day09.part2(Day09.parseInput(readInput('09')))],
  ['10 1', () => Day10.part1(Day10.parseInput(readInput('10')))],
  ['10 2', () => Day10.part2(Day10.parseInput(readInput('10')))],
  ['11 1', () => Day11.part1(Day11.parseInput(readInput('11')))],
  ['11 2', () => Day11.part2(Day11.parseInput(readInput('11')))],
  ['12 1', () => Day12.part1(Day12.parseInput(readInput('12')))],
  ['12 2', () => Day12.part2(Day12.parseInput(readInput('12')))],
  ['13 1', () => Day13.part1(Day13.parseInput(readInput('13')))],
  ['13 2', () => Day13.part2(Day13.parseInput(readInput('13')))],
  ['14 1', () => Day14.part1(Day14.parseInput(readInput('14')))],
  ['14 2', () => Day14.part2(Day14.parseInput(readInput('14')))],
  ['15 1', () => Day15.part1(Day15.parseInput(readInput('15')))],
  ['15 2', () => Day15.part2(Day15.parseInput(readInput('15')))],
  ['16 1', () => Day16.part1(Day16.parseInput(readInput('16')))],
  ['16 2', () => Day16.part2(Day16.parseInput(readInput('16')))],
  ['17 1', () => Day17.part1(Day17.parseInput(readInput('17')))],
  ['17 2', () => Day17.part2(Day17.parseInput(readInput('17')))],
  ['18 1', () => Day18.part1(Day18.parseInput(readInput('18')))],
  ['18 2', () => Day18.part2(Day18.parseInput(readInput('18')))],
  ['19 1', () => Day19.part1(Day19.parseInput(readInput('19')))],
  ['19 2', () => Day19.part2(Day19.parseInput(readInput('19')))],
  ['20 1', () => Day20.part1(Day20.parseInput(readInput('20')))],
  ['20 2', () => Day20.part2(Day20.parseInput(readInput('20')))],
  ['21 1', () => Day21.part1(Day21.parseInput(readInput('21')))],
  ['21 2', () => Day21.part2(Day21.parseInput(readInput('21')))],
  ['22 1', () => Day22.part1(Day22.parseInput(readInput('22')))],
  ['22 2', () => Day22.part2(Day22.parseInput(readInput('22')))],
]);

const day = process.argv[2];
const part = process.argv[3];

if (!!day && !!part) {
  const key = `${day} ${part}`;
  const fallback = () => `Day ${day}, Part ${part} does not exist!`;
  const run = (f: () => number | bigint | string) => {
    return () => {
      console.time(`Day ${day}, Part ${part}`);
      const r = f();
      console.timeEnd(`Day ${day}, Part ${part}`);

      return r;
    };
  };

  console.log(run(Days.get(key) ?? fallback)());
} else if (day === 'all') {
  Days.forEach((fn, day) => {
    console.time(`Day ${day}`);
    console.log(`Day ${day}: ${fn()}`);
    console.timeEnd(`Day ${day}`);
  });
} else {
  console.error('Day or part is not defined!');
  process.exit(1);
}
