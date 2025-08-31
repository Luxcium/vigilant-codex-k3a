import net from 'node:net';
import { Actor } from '../runtime/actors';
import { decodeRequest, encodeResponse } from '../protocol';

export interface TcpConfig {
  port: number;
}

export function createTcpServer(actor: Actor, config: TcpConfig) {
  const server = net.createServer((socket) => {
    let buffer = '';
    socket.on('data', async (chunk) => {
      buffer += chunk.toString();
      let index;
      while ((index = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 1);
        if (!line.trim()) continue;
        try {
          const req = decodeRequest(line);
          const result = await actor.dispatch(req.method, req.params);
          socket.write(encodeResponse({ id: req.id, result }) + '\n');
        } catch (err) {
          socket.write(
            encodeResponse({ id: 0, error: { message: (err as Error).message } }) + '\n'
          );
        }
      }
    });
  });

  server.listen(config.port);
  return server;
}
