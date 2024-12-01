import { readFileSync } from 'fs';

export function readInput(day: string): string {
  return readFileSync(`inputs/day${day}.txt`).toString();
}
