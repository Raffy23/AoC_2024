export function parseInput(data: string): string {
  return data.trimEnd();
}

export function part1(data: string): number {
  let checkSum = 0;

  let checkSumIndex = 0;
  let lastFileIdx = data.length - 1;
  let lastFileSize = Number(data[lastFileIdx]);
  let lastFileID = lastFileIdx / 2;

  let i = 0;
  for (i = 0; i < lastFileIdx; i += 2) {
    let file = Number(data[i]);
    let space = Number(data[i + 1]);

    const fileID = i / 2;
    for (; file > 0; file--) {
      checkSum += fileID * checkSumIndex++;
    }

    while (space > 0) {
      for (; space > 0 && lastFileSize > 0; space--, lastFileSize--) {
        checkSum += lastFileID * checkSumIndex++;
      }

      if (lastFileSize === 0) {
        if (lastFileIdx - 2 <= i) {
          break;
        }

        lastFileIdx -= 2;
        lastFileSize = Number(data[lastFileIdx]);
        lastFileID = lastFileIdx / 2;
      }
    }
  }

  for (; lastFileSize > 0; lastFileSize--) {
    checkSum += lastFileID * checkSumIndex++;
  }

  return checkSum;
}

export function part2(data: string): number {
  let checkSum = 0;
  let checkSumIndex = 0;

  let lastFileIdx = data.length - 1;

  const consumed = new Set<number>();

  let i = 0;
  for (i = 0; i < data.length; i += 2) {
    let file = Number(data[i]);
    let space = Number(data[i + 1]);

    const fileID = i / 2;
    if (!consumed.has(fileID)) {
      consumed.add(fileID);
      for (; file > 0; file--) {
        checkSum += fileID * checkSumIndex++;
      }
    } else {
      checkSumIndex += file;
    }

    let nextCandidate = lastFileIdx;
    while (nextCandidate >= i && space > 0) {
      const lastFileID = nextCandidate / 2;
      let lastFileSize = Number(data[nextCandidate]);

      if (lastFileSize > space || consumed.has(lastFileID)) {
        nextCandidate -= 2;
        continue;
      }

      consumed.add(lastFileID);
      space -= lastFileSize;

      for (; lastFileSize > 0; lastFileSize--) {
        checkSum += lastFileID * checkSumIndex++;
      }

      nextCandidate -= 2;
    }

    checkSumIndex += space;
    while (consumed.has(lastFileIdx / 2)) {
      lastFileIdx -= 2;
    }
  }

  return checkSum;
}
