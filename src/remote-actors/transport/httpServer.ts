import http from 'node:http';
import { Actor } from '../runtime/actors';
import { decodeRequest, encodeResponse } from '../protocol';

export interface HttpConfig {
  port: number;
  maxBodySize: number;
}

export function createHttpServer(actor: Actor, config: HttpConfig) {
  const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST' || req.url !== '/rpc') {
      res.statusCode = 404;
      res.end();
      return;
    }

    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > config.maxBodySize) {
        res.statusCode = 413;
        res.end();
        req.destroy();
      } else {
        chunks.push(chunk);
      }
    });

    req.on('end', async () => {
      try {
        const body = Buffer.concat(chunks).toString();
        const request = decodeRequest(body);
        const result = await actor.dispatch(request.method, request.params);
        res.setHeader('Content-Type', 'application/json');
        res.end(
          encodeResponse({ id: request.id, result })
        );
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          encodeResponse({ id: 0, error: { message: (err as Error).message } })
        );
      }
    });
  });

  server.listen(config.port);
  return server;
}
