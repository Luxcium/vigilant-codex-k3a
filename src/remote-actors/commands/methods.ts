export type Method = (params: any) => Promise<any> | any;
export type MethodRegistry = Record<string, Method>;

export const methods: MethodRegistry = {
  helloworld: () => 'hello world',
  echo: (params) => params,
  sum: (params: { a: number; b: number }) => params.a + params.b,
};
