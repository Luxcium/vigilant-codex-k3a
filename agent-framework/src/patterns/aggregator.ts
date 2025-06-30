import type { Agent } from '../core/Agent.js';

export const aggregator = (agents: Agent[]): Agent => ({
  id: 'Aggregator',
  describe: () => 'Merges child observations',
  async act(input, ctx) {
    const outputs = [] as string[];
    for (const a of agents) {
      const res = await a.act(input, ctx);
      outputs.push(res.content);
    }
    return { content: outputs.join('\n') };
  },
});
