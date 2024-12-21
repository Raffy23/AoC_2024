type Input = {
  patterns: Array<string>;
  designs: Array<string>;
};

export function parseInput(data: string): Input {
  const [patterns, design] = data.trimEnd().split('\n\n');

  return {
    patterns: patterns.split(', '),
    designs: design.split('\n'),
  };
}

function countMatches(patterns: Array<string>, cache: Map<string, number>, design: string): number {
  if (design.length === 0) {
    return 1;
  }

  const cachedValue = cache.get(design);
  if (cachedValue !== undefined) {
    return cachedValue;
  }

  const possibilities = patterns.reduce((sum, pattern) => {
    if (design.startsWith(pattern)) {
      return sum + countMatches(patterns, cache, design.substring(pattern.length));
    }

    return sum;
  }, 0);

  cache.set(design, possibilities);
  return possibilities;
}

export function part1({ patterns, designs }: Input): number {
  const cache = new Map<string, number>();
  return designs.reduce((sum, design) => sum + (countMatches(patterns, cache, design) > 0 ? 1 : 0), 0);
}

export function part2({ patterns, designs }: Input): number {
  const cache = new Map<string, number>();
  return designs.reduce((sum, design) => sum + countMatches(patterns, cache, design), 0);
}
