import { describe, expect, it, afterAll } from 'vitest';
import { methods, RpcWorkerPool } from '../../remote-actors';

describe('worker pool', () => {
  const pool = new RpcWorkerPool(methods, 2);
  afterAll(async () => {
    await pool.close();
  });

  it('executes methods', async () => {
    const res = await pool.exec('sum', { a: 2, b: 3 });
    expect(res).toBe(5);
  });
});
