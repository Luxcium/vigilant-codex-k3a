export type Method = (...args: unknown[]) => unknown | Promise<unknown>;
export type Methods = Record<string, Method>;

export const methods: Methods = {
  helloworld: () => 'hello world',
  echo: (msg: unknown) => msg,
  sum: (...args: unknown[]) => {
    const [a, b] = args as [number, number];
    return a + b;
  },
};
