import type { Memory } from './Memory.js';

export class InMemoryMemory implements Memory {
  private log: string[] = [];
  async read(_query: string): Promise<string> {
    return this.log.join('\n');
  }
  async write(entry: string): Promise<void> {
    this.log.push(entry);
  }
}
