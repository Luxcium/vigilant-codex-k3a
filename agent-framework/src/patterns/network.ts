import type { Agent } from '../core/Agent.js';

export interface GraphNode {
  agent: Agent;
  edges: string[];
}

export const network = (nodes: Record<string, GraphNode>, root: string): Agent => ({
  id: 'Network',
  describe: () => 'Graph-based agent network',
  async act(input, ctx) {
    const traverse = async (name: string, msg: string): Promise<string> => {
      const node = nodes[name];
      if (!node) return msg;
      const out = await node.agent.act(msg, ctx);
      let acc = out.content;
      for (const edge of node.edges) {
        acc = await traverse(edge, acc);
      }
      return acc;
    };
    const content = await traverse(root, input);
    return { content };
  },
});
