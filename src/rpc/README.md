# Remote RPC Actors

Minimal remote actor system exposing commands over HTTP and TCP using a worker-thread pool.

## Architecture

- **Protocol**: JSON request/response with `{ id, method, params }` and `{ id, result | error }`.
- **Runtime**: `RpcWorkerPool` executes registered commands across worker threads.
- **Actors**: Named pools with random selection helper.
- **Transports**: HTTP `POST /rpc` and newline-delimited TCP.
- **Config**: Defaults merged with environment variables and CLI flags.

## Usage

```ts
import { methods } from './commands/methods';
import { RpcWorkerPool } from './runtime/worker-pool';
import { createHttpServer } from './transport/http';

const methodsPath = require.resolve('./commands/methods.ts');
const pool = new RpcWorkerPool(2, methodsPath);
const server = createHttpServer(pool, { bodyLimit: 1_000_000, timeout: 5_000 });
server.listen(8080);
```

HTTP request example:

```bash
curl -X POST http://localhost:8080/rpc \
  -H 'Content-Type: application/json' \
  -d '{"id":"1","method":"echo","params":["hi"]}'
```

TCP example:

```bash
echo '{"id":"1","method":"sum","params":[1,2]}' | nc localhost 9090
```

## Config Keys

| Key | Env | CLI | Default |
| --- | --- | --- | --- |
| httpPort | RPC_HTTP_PORT | --httpPort | 8080 |
| tcpPort | RPC_TCP_PORT | --tcpPort | 9090 |
| poolSize | RPC_POOL_SIZE | --poolSize | 2 |
| bodyLimit | RPC_BODY_LIMIT | --bodyLimit | 1000000 |
| timeout | RPC_TIMEOUT | --timeout | 5000 |

## Next Steps

- Backpressure strategy and queue metrics.
- Structured logging and metrics export.
- Authentication and input validation.
