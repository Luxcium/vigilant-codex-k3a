import { parallel } from './patterns/parallel.js';
import { sequential } from './patterns/sequential.js';
import { router } from './patterns/router.js';
import { loop } from './patterns/loop.js';
import type { Agent } from './core/Agent.js';

export async function loadGraph(file: string): Promise<Agent> {
  const spec = await import(file, { assert: { type: 'json' } }).then(
    m => m.default
  );
  return build(spec);
}

async function build(node: any): Promise<Agent> {
  switch (node.type) {
    case 'parallel':
      return parallel(await Promise.all(node.children.map(build)));
    case 'sequential':
      return sequential(await Promise.all(node.children.map(build)));
    case 'router':
      const routes: Record<string, Agent> = {};
      for (const k in node.routes) routes[k] = await build(node.routes[k]);
      return router(routes);
    case 'loop':
      return loop(await build(node.child), node.max, node.stopWord);
    case 'RetrieverAgent':
      const { RetrieverAgent } = await import(
        './examples/agents/RetrieverAgent.js'
      );
      return new RetrieverAgent();
    case 'WriterAgent':
      const { WriterAgent } = await import('./examples/agents/WriterAgent.js');
      return new WriterAgent();
    case 'CriticAgent':
      const { CriticAgent } = await import('./examples/agents/CriticAgent.js');
      return new CriticAgent();
    case 'HumanGate':
      const { HumanGate } = await import('./examples/agents/HumanGate.js');
      return new HumanGate();
    default:
      throw new Error(`Unknown node type ${node.type}`);
  }
}
