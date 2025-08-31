import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { RpcWorkerPool } from '../../rpc/runtime/worker-pool';
import { createHttpServer } from '../../rpc/transport/http';
import { encodeRequest, decodeResponse } from '../../rpc/protocol';

describe('http transport', () => {
  test('handles rpc request', async () => {
    const methodsPath = path.resolve(__dirname, '../../rpc/commands/methods.ts');
    const pool = new RpcWorkerPool(1, methodsPath);
    const server = createHttpServer(pool, { bodyLimit: 1_000_000, timeout: 5_000 });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const port = (server.address() as any).port;
    const body = encodeRequest({ id: '1', method: 'sum', params: [2, 3] });
    const res = await fetch(`http://127.0.0.1:${port}/rpc`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    });
    const text = await res.text();
    const rpcRes = decodeResponse(text);
    expect(rpcRes).toEqual({ id: '1', result: 5 });
    server.close();
    await pool.destroy();
  });
});
