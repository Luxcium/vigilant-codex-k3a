import type { Agent } from '../core/Agent.js';

export const loop = (
  agent: Agent,
  max = 5,
  stopWord = 'DONE'
): Agent => ({
  id: 'Loop',
  describe: () => `Iterates until "${stopWord}" or ${max} turns`,
  async act(input, ctx) {
    let i = 0;
    let obs = { content: input };
    while (!obs.content.includes(stopWord) && ++i <= max) {
      obs = await agent.act(obs.content, ctx);
    }
    return obs;
  },
});
