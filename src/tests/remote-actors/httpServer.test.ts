import { afterAll, describe, expect, it } from 'vitest';
import { methods, initializeActors, createHttpServer } from '../../remote-actors';

const actor = initializeActors(methods, 2);
const server = createHttpServer(actor, { port: 0, maxBodySize: 1024 });
const address = server.address();
const port = typeof address === 'object' && address ? address.port : 0;

afterAll(async () => {
  await actor.close();
  server.close();
});

describe('http server', () => {
  it('responds to rpc calls', async () => {
    const res = await fetch(`http://localhost:${port}/rpc`, {
      method: 'POST',
      body: JSON.stringify({ id: 1, method: 'helloworld' }),
    });
    const json = await res.json();
    expect(json).toEqual({ id: 1, result: 'hello world' });
  });
});
