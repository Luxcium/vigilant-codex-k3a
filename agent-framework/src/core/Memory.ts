export interface Memory {
  read(query: string): Promise<string>;
  write(entry: string): Promise<void>;
}
