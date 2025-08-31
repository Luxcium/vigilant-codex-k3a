import { Worker } from 'node:worker_threads';
import { MethodRegistry } from '../commands/methods';
import { Request, Response } from '../protocol';
import * as path from 'path';

let nextId = 0;

// The worker script will import the method registry directly.
function createWorker(): Worker {
  // Use path.resolve to get the absolute path to the worker script.
  const workerPath = path.resolve(__dirname, 'workerThread.js');
  return new Worker(workerPath);
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
