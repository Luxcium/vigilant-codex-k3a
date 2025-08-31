import http from 'node:http';
import { RpcWorkerPool } from '../runtime/worker-pool';
import { decodeRequest, encodeResponse } from '../protocol';

interface HttpConfig {
  bodyLimit: number;
  timeout: number;
}

export function createHttpServer(
  pool: RpcWorkerPool,
  config: HttpConfig,
): http.Server {
  const server = http.createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/rpc') {
      res.statusCode = 404;
      res.end();
      return;
    }
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > config.bodyLimit) {
        res.statusCode = 413;
        res.end();
        req.destroy();
      }
    });
    req.on('end', async () => {
      try {
        const rpcReq = decodeRequest(body);
        const result = await pool.exec(rpcReq.method, rpcReq.params);
        res.setHeader('Content-Type', 'application/json');
        res.end(encodeResponse({ id: rpcReq.id, result }));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          encodeResponse({
            id: '0',
            error: { code: 500, message: (error as Error).message },
          }),
        );
      }
    });
  });
  server.setTimeout(config.timeout);
  return server;
}
