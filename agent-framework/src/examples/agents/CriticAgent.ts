import type { Agent, AgentContext, Observation } from '../../core/Agent.js';

export class CriticAgent implements Agent {
  id = 'CriticAgent';
  describe() { return 'Rates output'; }
  async act(input: string, _ctx: AgentContext): Promise<Observation> {
    const score = input.length % 5;
    return { content: `${input}\nScore:${score}` };
  }
}
