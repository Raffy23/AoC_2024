const enum Op {
  ADV = 0,
  BXL = 1,
  BST = 2,
  JNZ = 3,
  BXC = 4,
  OUT = 5,
  BDV = 6,
  CDV = 7,
}

export type State = {
  a: bigint;
  b: bigint;
  c: bigint;
  i: number;
};

type Output = {
  print(n: number): void;
};

type Input = { state: State; program: Array<number> };

export function parseInput(data: string): Input {
  const [registers, program] = data.split('\n\n');

  console.log(program);

  return {
    state: {
      a: BigInt(registers.match(/Register A: (\d+)/)![1]),
      b: BigInt(registers.match(/Register B: (\d+)/)![1]),
      c: BigInt(registers.match(/Register C: (\d+)/)![1]),
      i: 0,
    },
    program: program
      .slice('Program: '.length)
      .split(',')
      .map((s) => Number(s)),
  };
}

function comboOperand(state: State, operand: number): bigint {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return BigInt(operand);
    case 4:
      return state.a;
    case 5:
      return state.b;
    case 6:
      return state.c;
    default:
      throw new Error(`invalid combo operand ${operand}`);
  }
}

function literal(operand: number): bigint {
  return BigInt(operand);
}

export function execute(state: State, program: Array<number>, output: Output): boolean {
  const opcode = program[state.i++];
  const operand = program[state.i++];

  switch (opcode) {
    case Op.ADV:
      state.a = state.a >> comboOperand(state, operand);
      break;
    case Op.BXL:
      state.b = state.b ^ literal(operand);
      break;
    case Op.BST:
      state.b = comboOperand(state, operand) % 8n;
      break;
    case Op.JNZ:
      if (state.a !== 0n) {
        state.i = operand;
      }
      break;
    case Op.BXC:
      state.b = state.b ^ state.c;
      break;
    case Op.OUT:
      output.print(Number(comboOperand(state, operand) % 8n));
      break;
    case Op.BDV:
      state.b = state.a >> comboOperand(state, operand);
      break;
    case Op.CDV:
      state.c = state.a >> comboOperand(state, operand);
      break;
    case undefined:
      return false;
    default:
      throw new Error('invalid opcode');
  }

  return true;
}

export function ArrayOutput(): Output & { values: Array<number> } {
  const values: Array<number> = [];

  return {
    values,
    print: (n: number) => {
      values.push(n);
    },
  };
}

export function simulate<T extends Output>(state: State, program: Array<number>, output: T): T {
  while (state.i < program.length && execute(state, program, output));
  return output;
}

export function part1({ state, program }: Input): string {
  return simulate(state, program, ArrayOutput()).values.join(',');
}

export function part2({ program }: Input): bigint {
  // need at least n iterations wich have a stride of a << 3
  let a = 1n << (3n * BigInt(program.length));

  // backwards search, match loop multipler for last element first, then
  // add all the multipliers with the loop increment (a << 3)
  const loopMults = Array(program.length).fill(0n);
  for (let i = program.length - 1; i >= 0; i--) {
    let output = simulate({ a: a, b: 0n, c: 0n, i: 0 }, program, ArrayOutput()).values;

    while (output[i] !== program[i]) {
      loopMults[i]++;
      a = loopMults.reduce((prev, curr, i) => prev + (curr << (3n * BigInt(i))));

      output = simulate({ a: a, b: 0n, c: 0n, i: 0 }, program, ArrayOutput()).values;
    }
  }

  return a;
}
