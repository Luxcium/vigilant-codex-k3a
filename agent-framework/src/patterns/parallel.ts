import type { Agent } from '../core/Agent.js';

export const parallel = (agents: Agent[]): Agent => ({
  id: 'Parallel',
  describe: () => 'Runs agents in parallel & merges output',
  async act(input, ctx) {
    const pLimit = (await import('p-limit')).default;
    const limit = pLimit(agents.length);
    const outs = await Promise.all(
      agents.map((a) => limit(() => a.act(input, ctx)))
    );
    return { content: outs.map((o) => o.content).join('\n') };
  },
});
