import { readInput } from './utils';

import * as Day01 from './day01';
import * as Day02 from './day02';
import * as Day03 from './day03';
import * as Day04 from './day04';

const Days = new Map<string, () => number>([
  ['01 1', () => Day01.part1(Day01.parseInput(readInput('01')))],
  ['01 2', () => Day01.part2(Day01.parseInput(readInput('01')))],
  ['02 1', () => Day02.part1(Day02.parseInput(readInput('02')))],
  ['02 2', () => Day02.part2(Day02.parseInput(readInput('02')))],
  ['03 1', () => Day03.part1(Day03.parseInput1(readInput('03')))],
  ['03 2', () => Day03.part2(Day03.parseInput2(readInput('03')))],
  ['04 1', () => Day04.part1(Day04.parseInput(readInput('04')))],
  ['04 2', () => Day04.part2(Day04.parseInput(readInput('04')))],
]);

const day = process.argv[2];
const part = process.argv[3];

if (!!day && !!part) {
  const key = `${day} ${part}`;
  const fallback = () => `Day ${day}, Part ${part} does not exist!`;

  console.log((Days.get(key) ?? fallback)());
} else if (day === 'all') {
  Days.forEach((fn, day) => {
    console.log(`Day ${day}: ${fn()}`);
  });
} else {
  console.error('Day or part is not defined!');
  process.exit(1);
}
