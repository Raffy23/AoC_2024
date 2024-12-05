interface Input {
  ordering: Map<number, Set<number>>;
  pages: Array<Array<number>>;
}

export function parseInput(data: string): Input {
  const [orderings, pages] = data.split('\n\n');

  const orderingRegex = /(\d+)\|(\d+)/g;
  const pageListRegex = /(\d+)/g;

  return {
    ordering: [...orderings.matchAll(orderingRegex)].reduce((m, [_, p1, p2]) => {
      const n1 = Number(p1);
      const n2 = Number(p2);

      let list = m.get(n1);
      if (list === undefined) {
        list = new Set();
        m.set(n1, list);
      }

      list.add(n2);
      return m;
    }, new Map<number, Set<number>>()),
    pages: pages
      .trimEnd()
      .split('\n')
      .map((line) => [...line.matchAll(pageListRegex)].map(([_, s]) => Number(s))),
  };
}

function isUnordered(ordering: Map<number, Set<number>>, list: Array<number>): boolean {
  return list.some((page, idx) => ordering.get(page)?.has(list[idx - 1]));
}

export function part1({ ordering, pages }: Input): number {
  return pages
    .filter((list) => !isUnordered(ordering, list))
    .map((list) => list[Math.floor(list.length / 2)])
    .reduce((sum, value) => sum + value, 0);
}

export function part2({ ordering, pages }: Input): number {
  return pages
    .filter((list) => isUnordered(ordering, list))
    .map((list) => list.sort((l, r) => (ordering.get(l)?.has(r) ? -1 : 0)))
    .map((list) => list[Math.floor(list.length / 2)])
    .reduce((sum, value) => sum + value, 0);
}
