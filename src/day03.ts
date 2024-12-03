type Input1 = Array<[number, number]>;

type Inst =
  | { type: 'mul'; n1: number; n2: number }
  | { type: 'do' }
  | { type: "don't" };
type Input2 = Array<Inst>;

export function parseInput1(data: string): Input1 {
  const inputRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  return [...data.matchAll(inputRegex)].map(([_, n1, n2]) => [
    Number(n1),
    Number(n2),
  ]);
}

export function part1(input: Input1): number {
  return input.reduce((sum, [n1, n2]) => sum + n1 * n2, 0);
}

export function parseInput2(data: string): Input2 {
  const inputRegex = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\)/g;

  return [...data.matchAll(inputRegex)].map(
    ([_, typeMul, n1, n2, typeDo, typeDont]) => {
      const type = typeMul ?? typeDo ?? typeDont;

      if (type === 'mul') {
        return {
          type: 'mul',
          n1: Number(n1),
          n2: Number(n2),
        };
      } else if (type === 'do') {
        return {
          type: 'do',
        };
      } else if (type === "don't") {
        return {
          type: "don't",
        };
      } else {
        throw new Error(`Unknown type! ${type}`);
      }
    },
  );
}

export function part2(input: Input2): number {
  return input.reduce(
    ({ sum, enabled }, inst) => {
      switch (inst.type) {
        case 'mul':
          if (enabled) {
            return { sum: sum + inst.n1 * inst.n2, enabled };
          } else {
            return { sum, enabled };
          }

        case 'do':
          return { sum, enabled: true };

        case "don't":
          return { sum, enabled: false };
      }
    },
    { sum: 0, enabled: true },
  ).sum;
}
