# Remote Actors RPC System

Minimal yet extensible RPC system supporting HTTP and TCP transports with worker-thread backed actors.

## Features

- JSON-based protocol with request/response envelopes
- Worker-thread pool executing registered methods
- HTTP and TCP servers dispatching to actor registry
- Configurable via defaults, environment variables, and argv

## Usage

```ts
import { methods, initializeActors, createHttpServer, createTcpServer, getConfig } from './remote-actors';

const config = getConfig();
const actor = initializeActors(methods, config.poolSize);
createHttpServer(actor, { port: config.httpPort, maxBodySize: config.maxBodySize });
createTcpServer(actor, { port: config.tcpPort });
```

### HTTP

```bash
curl -X POST http://localhost:3000/rpc -d '{"id":1,"method":"helloworld"}'
```

### TCP

```bash
echo '{"id":1,"method":"echo","params":"hi"}' | nc localhost 4000
```

## Configuration

| Key | Env | Arg | Default |
| --- | --- | --- | --- |
| httpPort | RPC_HTTP_PORT | --httpPort | 3000 |
| tcpPort | RPC_TCP_PORT | --tcpPort | 4000 |
| poolSize | RPC_POOL_SIZE | --poolSize | 2 |
| maxBodySize | RPC_MAX_BODY | --maxBodySize | 1048576 |

## Next Steps

- Backpressure and metrics
- Structured error taxonomy
- Auth and input validation
- Typed client SDK
