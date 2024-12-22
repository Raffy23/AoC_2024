export function parseInput(data: string): Array<bigint> {
  return data
    .trimEnd()
    .split('\n')
    .map((s) => BigInt(s));
}

function toKey(seq: Array<number>, offset: number): number {
  const prime = 31;
  let result = 1;

  result = prime * result + seq[offset];
  result = prime * result + seq[offset - 1];
  result = prime * result + seq[offset - 2];
  result = prime * result + seq[offset - 3];

  return result;
}

function mixAndPrune(secret: bigint, value: bigint): bigint {
  return (secret ^ value) % 16777216n;
}

export function nextRandom(secret: bigint): bigint {
  secret = mixAndPrune(secret, secret << 6n);
  secret = mixAndPrune(secret, secret >> 5n);
  secret = mixAndPrune(secret, secret << 11n);

  return secret;
}

export function part1(input: Array<bigint>): bigint {
  return input.reduce((sum, n) => {
    for (let i = 0; i < 2000; i++) {
      n = nextRandom(n);
    }
    return sum + n;
  }, 0n);
}

export function part2(input: Array<bigint>): number {
  const length = 2000;

  const allKeys = new Set<number>();
  const mappings = input.map((secret) => {
    const prices = new Array(length);
    const diffs = new Array(length - 1);
    const mapping = new Map<number, number>();

    prices[0] = Number(secret % 10n);

    for (let i = 1; i < length + 1; i++) {
      secret = nextRandom(secret);

      prices[i] = Number(secret % 10n);
      diffs[i] = prices[i] - prices[i - 1];

      if (i > 4) {
        const key = toKey(diffs, i);

        if (!mapping.has(key)) {
          mapping.set(key, prices[i]);
          allKeys.add(key);
        }
      }
    }

    return mapping;
  });

  let max = 0;
  for (const key of allKeys) {
    const score = mappings.reduce((sum, changes) => {
      return sum + (changes.get(key) ?? 0);
    }, 0);

    if (score > max) {
      max = score;
    }
  }

  return max;
}
