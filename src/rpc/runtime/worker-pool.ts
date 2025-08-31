import { Worker } from 'node:worker_threads';
import path from 'node:path';

interface Pending {
  resolve: (value: unknown) => void;
  reject: (err: Error) => void;
}

export class RpcWorkerPool {
  private workers: Worker[] = [];
  private callbacks = new Map<number, Pending>();
  private counter = 0;
  private next = 0;

  constructor(size: number, methodsPath: string) {
    const workerFile = path.resolve(__dirname, 'worker.ts');
    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerFile, {
        execArgv: ['-r', 'ts-node/register'],
        workerData: { methodsPath },
      });
      worker.on('message', (msg) => {
        const cb = this.callbacks.get(msg.id);
        if (!cb) return;
        this.callbacks.delete(msg.id);
        if (msg.error) cb.reject(new Error(msg.error.message));
        else cb.resolve(msg.result);
      });
      this.workers.push(worker);
    }
  }

  exec(method: string, params: unknown[]): Promise<unknown> {
    const id = this.counter++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      const worker = this.workers[this.next];
      this.next = (this.next + 1) % this.workers.length;
      worker.postMessage({ id, method, params });
    });
  }

  async destroy(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.terminate()));
  }
}
