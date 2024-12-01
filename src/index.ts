import { readInput } from './utils';

import * as Day01 from './day01';

const Days = new Map<string, () => number>([
  ['01 1', () => Day01.part1(Day01.parseInput(readInput('01')))],
  ['01 2', () => Day01.part2(Day01.parseInput(readInput('01')))],
])

const day = process.argv[2];
const part = process.argv[3];

if (!!day && !!part) {
  const key = `${day} ${part}`;
  const fallback = () => `Day ${day}, Part ${part} does not exist!`;

  console.log((Days.get(key) ?? fallback)());
} else if (day === "all") {
  Days.forEach((fn, day) => {
    console.log(`Day ${day}: ${fn()}`);
  })
} else {
  console.error('Day or part is not defined!');
  process.exit(1);
}
