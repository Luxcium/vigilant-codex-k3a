import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { RpcWorkerPool } from '../../rpc/runtime/worker-pool';

describe('worker pool', () => {
  test('executes methods', async () => {
    const methodsPath = path.resolve(__dirname, '../../rpc/commands/methods.ts');
    const pool = new RpcWorkerPool(2, methodsPath);
    const result = await pool.exec('sum', [1, 2]);
    expect(result).toBe(3);
    await pool.destroy();
  });
});
