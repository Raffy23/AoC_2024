export type Input = [Array<number>, Array<number>];

export function parseInput(data: string): Input {
  const inputRegex = /(\d+) {3}(\d+)/g;
  const output = [...data.matchAll(inputRegex)];

  return output.reduce(
    ([leftList, rightList], [_, left, right]) => {
      leftList.push(Number(left));
      rightList.push(Number(right));

      return [leftList, rightList];
    },
    [[], []] as Input,
  );
}

export function part1([inputLeft, inputRight]: Input): number {
  inputLeft.sort((l, r) => l - r);
  inputRight.sort((l, r) => l - r);

  let output = 0;
  for (let i = 0; i < inputLeft.length; i++) {
    output += Math.abs(inputLeft[i] - inputRight[i]);
  }

  return output;
}

export function part2([inputLeft, inputRight]: Input): number {
  const counts = inputRight.reduce(
    (counts, value) => counts.set(value, (counts.get(value) ?? 0) + 1),
    new Map<number, number>(),
  );

  return inputLeft.reduce((sum, value) => sum + value * (counts.get(value) ?? 0), 0);
}
