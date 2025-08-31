import { MethodRegistry } from '../commands/methods';
import { RpcWorkerPool } from './workerPool';

export interface Actor {
  dispatch(method: string, params: any): Promise<any>;
  close(): Promise<void>;
}

export function initializeActors(methods: MethodRegistry, size = 2): Actor {
  const pool = new RpcWorkerPool(methods, size);
  return {
    dispatch: (method, params) => pool.exec(method, params),
    close: () => pool.close(),
  };
}
