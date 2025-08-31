import { Worker } from 'node:worker_threads';
import { MethodRegistry } from '../commands/methods';
import { Request, Response } from '../protocol';

let nextId = 0;

function serializeMethods(methods: MethodRegistry) {
  const serialized: Record<string, string> = {};
  for (const [name, fn] of Object.entries(methods)) {
    serialized[name] = fn.toString();
  }
  return serialized;
}

function createWorker(methods: MethodRegistry): Worker {
  const code = `
    const { parentPort, workerData } = require('node:worker_threads');
    const handlers = {};
    for (const [name, src] of Object.entries(workerData.methods)) {
      handlers[name] = eval(src);
    }
    parentPort.on('message', async (msg) => {
      const { id, method, params } = msg;
      try {
        const result = await handlers[method](params);
        parentPort.postMessage({ id, result });
      } catch (err) {
        parentPort.postMessage({ id, error: { message: err.message } });
      }
    });
  `;
  return new Worker(code, { eval: true, workerData: { methods: serializeMethods(methods) } });
}

export class RpcWorkerPool {
  private workers: Worker[] = [];
  private pending = new Map<number, (res: Response) => void>();
  private index = 0;

  constructor(private methods: MethodRegistry, private size = 2) {
    for (let i = 0; i < size; i++) {
      const worker = createWorker(methods);
      worker.on('message', (res: Response) => {
        const resolver = this.pending.get(res.id as number);
        if (resolver) {
          this.pending.delete(res.id as number);
          resolver(res);
        }
      });
      this.workers.push(worker);
    }
  }

  exec(method: string, params: any): Promise<any> {
    const id = nextId++;
    const worker = this.workers[this.index++ % this.workers.length];
    return new Promise((resolve, reject) => {
      this.pending.set(id, (res) => {
        if ('error' in res) {
          reject(new Error(res.error.message));
        } else {
          resolve(res.result);
        }
      });
      worker.postMessage({ id, method, params } as Request);
    });
  }

  async close(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.terminate()));
  }
}
