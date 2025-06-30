import { parallel } from './patterns/parallel.js';
import { sequential } from './patterns/sequential.js';
import { router } from './patterns/router.js';
import { loop } from './patterns/loop.js';
import type { Agent } from './core/Agent.js';

export async function loadGraph(file: string): Promise<Agent> {
  const spec = await import(file, { assert: { type: 'json' } }).then((m) => m.default);
  return build(spec);
}

function build(node: any): Agent {
  switch (node.type) {
    case 'parallel':
      return parallel(node.children.map(build));
    case 'sequential':
      return sequential(node.children.map(build));
    case 'router':
      const routes: Record<string, Agent> = {};
      for (const k in node.routes) routes[k] = build(node.routes[k]);
      return router(routes);
    case 'loop':
      return loop(build(node.child), node.max, node.stopWord);
    case 'RetrieverAgent':
      return new (require('./examples/agents/RetrieverAgent.js').RetrieverAgent)();
    case 'WriterAgent':
      return new (require('./examples/agents/WriterAgent.js').WriterAgent)();
    case 'CriticAgent':
      return new (require('./examples/agents/CriticAgent.js').CriticAgent)();
    case 'HumanGate':
      return new (require('./examples/agents/HumanGate.js').HumanGate)();
    default:
      throw new Error(`Unknown node type ${node.type}`);
  }
}
