import { RpcWorkerPool } from './worker-pool';

export type ActorRegistry = Record<string, RpcWorkerPool>;

export function initializeActors(
  methodsPath: string,
  poolSize: number,
  names: string[],
): ActorRegistry {
  const registry: ActorRegistry = {};
  for (const name of names) {
    registry[name] = new RpcWorkerPool(poolSize, methodsPath);
  }
  return registry;
}

export function selectActor(
  registry: ActorRegistry,
  name?: string,
): RpcWorkerPool {
  const keys = Object.keys(registry);
  if (name && registry[name]) return registry[name];
  const key = keys[Math.floor(Math.random() * keys.length)];
  return registry[key];
}

export function dispatch(
  actor: RpcWorkerPool,
  method: string,
  params: unknown[],
): Promise<unknown> {
  return actor.exec(method, params);
}
