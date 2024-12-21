export default class PQueue<T> {
  private values: Array<T> = [];
  private priorities: Array<number> = [];

  add(value: T, priority: number) {
    for (let i = 0; i < this.priorities.length; i++) {
      if (this.priorities[i] > priority) {
        this.values.splice(i, 0, value);
        this.priorities.splice(i, 0, priority);
        return;
      }
    }

    this.values.push(value);
    this.priorities.push(priority);
  }

  pop(): { value: T; priority: number } | undefined {
    const p = this.priorities.shift();
    if (p === undefined) {
      return undefined;
    }

    return { priority: p, value: this.values.shift()! };
  }

  peek(): { value: T; priority: number } {
    return { priority: this.priorities[0], value: this.values[0] };
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.priorities.length;
  }
}
