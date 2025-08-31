import net from 'node:net';
import { RpcWorkerPool } from '../runtime/worker-pool';
import { decodeRequest, encodeResponse } from '../protocol';

export function createTcpServer(pool: RpcWorkerPool): net.Server {
  return net.createServer((socket) => {
    let buffer = '';
    socket.on('data', async (chunk) => {
      buffer += chunk.toString();
      let index;
      while ((index = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 1);
        try {
          const req = decodeRequest(line);
          const result = await pool.exec(req.method, req.params);
          socket.write(encodeResponse({ id: req.id, result }) + '\n');
        } catch (error) {
          // Try to extract the id from the raw line, fallback to 'unknown'
          let extractedId: string | number = 'unknown';
          try {
            // Try to extract "id" using a regex (works for simple JSON-RPC lines)
            const match = line.match(/"id"\s*:\s*(".*?"|\d+)/);
            if (match) {
              // Remove quotes if present
              extractedId = match[1].replace(/^"|"$/g, '');
            }
          } catch (_) {
            // ignore extraction errors, fallback to 'unknown'
          }
          socket.write(
            encodeResponse({
              id: extractedId,
              error: { code: 500, message: (error as Error).message },
            }) + '\n',
          );
        }
      }
    });
  });
}
