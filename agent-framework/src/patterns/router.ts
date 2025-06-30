import type { Agent } from '../core/Agent.js';

export const router = (routes: Record<string, Agent>): Agent => ({
  id: 'Router',
  describe: () => `Routes by prefix word`,
  async act(input, ctx) {
    const [key, ...rest] = input.trim().split(/\s+/);
    const target = routes[key] || routes['*'];
    return target.act(rest.join(' '), ctx);
  },
});
