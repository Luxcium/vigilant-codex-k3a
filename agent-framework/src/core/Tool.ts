export interface Tool {
  name: string;
  run(args: string): Promise<string>;
  schema: Record<string, any>;
}
