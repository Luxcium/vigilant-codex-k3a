import type { Agent } from '../core/Agent.js';

export const hierarchical = (
  supervisor: Agent,
  subordinates: Agent[]
): Agent => ({
  id: 'Hierarchical',
  describe: () => 'Supervisor with subordinate agents',
  async act(input, ctx) {
    let msg = input;
    for (const sub of subordinates) {
      const out = await sub.act(msg, ctx);
      msg = out.content;
    }
    return supervisor.act(msg, ctx);
  },
});
