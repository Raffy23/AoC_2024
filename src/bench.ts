import { add, complete, cycle, suite, save } from 'benny';
import { readInput } from './utils';

import * as Day01 from './day01';
import * as Day02 from './day02';

suite(
  'AoC 2024',
  add('Day01 part1', () => Day01.part1(Day01.parseInput(readInput('01')))),
  add('Day01 part2', () => Day01.part1(Day01.parseInput(readInput('01')))),
  add('Day02 part1', () => Day02.part1(Day02.parseInput(readInput('02')))),
  add('Day02 part2', () => Day02.part1(Day02.parseInput(readInput('02')))),
  cycle(),
  complete(),
  save({ file: 'reduce', version: '1.0.0' }),
  save({ file: 'reduce', format: 'chart.html' }),
);
