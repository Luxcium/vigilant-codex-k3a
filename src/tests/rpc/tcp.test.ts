import net from 'node:net';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { RpcWorkerPool } from '../../rpc/runtime/worker-pool';
import { createTcpServer } from '../../rpc/transport/tcp';
import { encodeRequest, decodeResponse } from '../../rpc/protocol';

describe('tcp transport', () => {
  test('handles rpc request', async () => {
    const methodsPath = path.resolve(__dirname, '../../rpc/commands/methods.ts');
    const pool = new RpcWorkerPool(1, methodsPath);
    const server = createTcpServer(pool);
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const port = (server.address() as net.AddressInfo).port;

    const client = net.createConnection(port);
    const dataPromise = new Promise<string>((resolve) =>
      client.once('data', (d) => resolve(d.toString())),
    );
    client.write(
      encodeRequest({ id: '1', method: 'echo', params: ['hi'] }) + '\n',
    );
    const data = await dataPromise;
    const rpcRes = decodeResponse(data.trim());
    expect(rpcRes).toEqual({ id: '1', result: 'hi' });
    client.end();
    server.close();
    await pool.destroy();
  });
});
