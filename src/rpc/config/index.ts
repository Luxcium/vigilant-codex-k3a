import process from 'node:process';

export interface RpcConfig {
  httpPort: number;
  tcpPort: number;
  poolSize: number;
  bodyLimit: number;
  timeout: number;
}

const defaults: RpcConfig = {
  httpPort: 8080,
  tcpPort: 9090,
  poolSize: 2,
  bodyLimit: 1_000_000,
  timeout: 5_000,
};

export function loadConfig(argv: string[] = process.argv.slice(2)): RpcConfig {
  const env = process.env;
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const part = argv[i];
    if (part.startsWith('--')) {
      const [key, value] = part.replace(/^--/, '').split('=');
      if (value) args[key] = value;
      else if (argv[i + 1]) args[key] = argv[++i];
    }
  }
  return {
    httpPort: Number(args.httpPort ?? env.RPC_HTTP_PORT ?? defaults.httpPort),
    tcpPort: Number(args.tcpPort ?? env.RPC_TCP_PORT ?? defaults.tcpPort),
    poolSize: Number(args.poolSize ?? env.RPC_POOL_SIZE ?? defaults.poolSize),
    bodyLimit: Number(args.bodyLimit ?? env.RPC_BODY_LIMIT ?? defaults.bodyLimit),
    timeout: Number(args.timeout ?? env.RPC_TIMEOUT ?? defaults.timeout),
  };
}
