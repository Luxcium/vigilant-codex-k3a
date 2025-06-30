import type { Agent } from '../core/Agent.js';

export const sequential = (chain: Agent[]): Agent => ({
  id: 'Sequential',
  describe: () => `Executes ${chain.length} agents in order`,
  async act(input, ctx) {
    let acc = input;
    for (const a of chain) {
      acc = (await a.act(acc, ctx)).content;
    }
    return { content: acc };
  },
});
