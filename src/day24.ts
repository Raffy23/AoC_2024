const enum Op {
  And = 'AND',
  Or = 'OR',
  Xor = 'XOR',
}

type Gate = { in1: string; in2: string; op: Op };
type Network = Map<string, Gate>;
type Input = { network: Network; values: Map<string, number> };

export function parseInput(data: string): Input {
  const [initialValues, network] = data.trimEnd().split('\n\n');

  return {
    values: initialValues
      .matchAll(/^([A-Za-z0-9]+): (\d)$/gm)
      .reduce((values, [_, name, value]) => values.set(name, Number(value)), new Map()),

    network: network
      .matchAll(/^([A-Za-z0-9]+) ([A-Za-z0-9]+) ([A-Za-z0-9]+) -> ([A-Za-z0-9]+)$/gm)
      .reduce((network, [_, in1, op, in2, name]) => network.set(name, { in1, in2, op }), new Map()),
  };
}

function getValue(input: Input, name: string): number {
  const { network, values } = input;
  let val = values.get(name);
  if (val === undefined) {
    const { in1, in2, op } = network.get(name)!;

    switch (op) {
      case Op.And:
        val = getValue(input, in1) & getValue(input, in2);
        break;
      case Op.Or:
        val = getValue(input, in1) | getValue(input, in2);
        break;
      case Op.Xor:
        val = getValue(input, in1) ^ getValue(input, in2);
        break;
      default:
        throw new Error(`unknown operation ${op}`);
    }

    values.set(name, val);
  }

  return val;
}

export function part1({ network, values }: Input): number {
  const binaryValue = [...network.keys().filter((name) => name.startsWith('z'))]
    .sort()
    .map((name) => getValue({ network, values }, name))
    .reverse()
    .join('');

  return parseInt(binaryValue, 2);
}

type Gate2 = Gate & { out: string };

function isXY(a: string): boolean {
  return a[0] === 'x' || a[0] === 'y';
}

function isZ(a: string): boolean {
  return a[0] === 'z';
}

function isFirstBit(in1: string): boolean {
  return in1 === 'x00' || in1 === 'y00';
}

function isUsedAsInput(out: string, l: Array<{ in1: string; in2: string }>) {
  return l.find(({ in1, in2 }) => in1 === out || in2 === out) !== undefined;
}

export function part2({ network, values }: Input): string {
  const bits = [...network.keys().filter((name) => isZ(name))].length;
  const last = `z${bits - 1}`;

  // x + y = z is done with adders:
  //  half:
  //    out   = x XOR y
  //    carry = x AND y
  //
  //  full:
  //    out   = (x XOR y) XOR c_in
  //    carry = (x AND y) OR ((x AND y) & c_in)
  //
  //  last bit:
  //    out   = carry[bits - 1]
  //
  const xyOuts: Array<Gate2> = [];
  const xyCarries: Array<Gate2> = [];
  const zOut: Array<Gate2> = [];
  const ands: Array<Gate2> = [];
  const carries: Array<Gate2> = [];

  for (const [out, { in1, in2, op }] of network) {
    if (isXY(in1) || isXY(in2)) {
      switch (op) {
        case Op.And:
          xyCarries.push({ out, in1, in2, op });
          break;
        case Op.Or:
          break;
        case Op.Xor:
          xyOuts.push({ out, in1, in2, op });
          break;
      }
    } else {
      switch (op) {
        case Op.And:
          ands.push({ out, in1, in2, op });
          break;
        case Op.Or:
          carries.push({ out, in1, in2, op });
          break;
        case Op.Xor:
          zOut.push({ out, in1, in2, op });
          break;
      }
    }
  }

  return [
    ...xyOuts.filter(({ out, in1 }) => !isFirstBit(in1) && (isZ(out) || !isUsedAsInput(out, zOut))),
    ...xyCarries.filter(({ out, in1 }) => !isFirstBit(in1) && (isZ(out) || !isUsedAsInput(out, carries))),
    ...zOut.filter(({ out }) => !isZ(out)),
    ...ands.filter(({ out }) => isZ(out)),
    ...carries.filter(({ out }) => isZ(out) && out !== last),
  ]
    .map(({ out }) => out)
    .sort()
    .join(',');
}
