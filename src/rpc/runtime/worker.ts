import { parentPort, workerData } from 'node:worker_threads';

type Methods = Record<string, (...args: unknown[]) => unknown>;

/* eslint-disable @typescript-eslint/no-require-imports */
const imported = require(workerData.methodsPath) as {
  methods?: Methods;
} & Methods;
const methods: Methods = imported.methods ?? imported;

parentPort?.on('message', async ({ id, method, params }) => {
  try {
    const result = await methods[method](...(params as unknown[]));
    parentPort?.postMessage({ id, result });
  } catch (error) {
    parentPort?.postMessage({
      id,
      error: { message: (error as Error).message },
    });
  }
});
