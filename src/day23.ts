type Graph = Map<string, Set<string>>;

export function parseInput(data: string): Graph {
  return data
    .trimEnd()
    .split('\n')
    .reduce((graph, line) => {
      const [n1, n2] = line.split('-');

      let e1 = graph.get(n1);
      let e2 = graph.get(n2);

      if (e1 === undefined) {
        e1 = new Set();
        graph.set(n1, e1);
      }
      if (e2 === undefined) {
        e2 = new Set();
        graph.set(n2, e2);
      }

      e1.add(n2);
      e2.add(n1);

      return graph;
    }, new Map());
}

export function part1(graph: Graph): number {
  const triangles = new Set<string>();

  for (const node of graph.keys().filter((name) => name.startsWith('t'))) {
    const neighbors = [...graph.get(node)!];

    for (let i = 0; i < neighbors.length; i++) {
      const pN1 = graph.get(neighbors[i])!;

      for (const shared of graph.get(node)!.intersection(pN1)) {
        triangles.add([node, neighbors[i], shared].sort().join(','));
      }
    }
  }

  return triangles.size;
}

export function part2(graph: Graph): string {
  let max = new Set<string>();

  // See: https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
  const bronKerbosh = (R: Set<string>, P: Set<string>, X: Set<string>) => {
    if (P.size === 0 && X.size === 0) {
      if (R.size > max.size) {
        max = new Set([...R]);
      }
    }

    while (P.size !== 0) {
      const v = P.values().next().value!;
      const N = graph.get(v)!;

      bronKerbosh(R.union(new Set([v])), P.intersection(N), X.intersection(N));

      P.delete(v);
      X.add(v);
    }
  };

  bronKerbosh(new Set(), new Set([...graph.keys()]), new Set());

  return [...max.values()].sort().join(',');
}
