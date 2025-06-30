import type { VectorStore } from './VectorStore.js';

export class InMemoryVectorStore implements VectorStore {
  private store = new Map<string, string>();
  async upsert(id: string, text: string): Promise<void> {
    this.store.set(id, text);
  }
  async query(text: string, k: number): Promise<string[]> {
    const results: string[] = [];
    for (const value of this.store.values()) {
      if (value.includes(text)) results.push(value);
      if (results.length >= k) break;
    }
    return results;
  }
}
