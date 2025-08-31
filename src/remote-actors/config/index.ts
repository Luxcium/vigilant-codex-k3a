export interface Config {
  httpPort: number;
  tcpPort: number;
  poolSize: number;
  maxBodySize: number;
}

const defaults: Config = {
  httpPort: 3000,
  tcpPort: 4000,
  poolSize: 2,
  maxBodySize: 1024 * 1024,
};

export function getEnvConfig(): Partial<Config> {
  return {
    httpPort: process.env.RPC_HTTP_PORT ? Number(process.env.RPC_HTTP_PORT) : undefined,
    tcpPort: process.env.RPC_TCP_PORT ? Number(process.env.RPC_TCP_PORT) : undefined,
    poolSize: process.env.RPC_POOL_SIZE ? Number(process.env.RPC_POOL_SIZE) : undefined,
    maxBodySize: process.env.RPC_MAX_BODY ? Number(process.env.RPC_MAX_BODY) : undefined,
  };
}

export function getArgvConfig(argv: string[]): Partial<Config> {
  const cfg: Partial<Config> = {};
  for (const arg of argv) {
    const [key, value] = arg.split('=');
    switch (key) {
      case '--httpPort':
        cfg.httpPort = Number(value);
        break;
      case '--tcpPort':
        cfg.tcpPort = Number(value);
        break;
      case '--poolSize':
        cfg.poolSize = Number(value);
        break;
      case '--maxBodySize':
        cfg.maxBodySize = Number(value);
        break;
    }
  }
  return cfg;
}

export function getConfig(argv = process.argv.slice(2)): Config {
  return {
    ...defaults,
    ...getEnvConfig(),
    ...getArgvConfig(argv),
  };
}
