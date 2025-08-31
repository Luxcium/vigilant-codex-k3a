import { afterAll, describe, expect, it } from 'vitest';
import net from 'node:net';
import { methods, initializeActors, createTcpServer } from '../../remote-actors';

const actor = initializeActors(methods, 2);
const server = createTcpServer(actor, { port: 0 });
const address = server.address();
const port = typeof address === 'object' && address ? address.port : 0;

afterAll(async () => {
  await actor.close();
  server.close();
});

describe('tcp server', () => {
  it('responds to rpc calls', async () => {
    const socket = net.connect(port); 
    const promise = new Promise<string>((resolve) => {
      socket.on('data', (data) => {
        resolve(data.toString().trim());
        socket.end();
      });
    });
    socket.write('{"id":1,"method":"echo","params":"hi"}\n');
    const response = await promise;
    expect(response).toBe('{"id":1,"result":"hi"}');
  });
});
