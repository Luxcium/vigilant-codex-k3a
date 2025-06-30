export interface VectorStore {
  upsert(id: string, text: string): Promise<void>;
  query(text: string, k: number): Promise<string[]>;
}
