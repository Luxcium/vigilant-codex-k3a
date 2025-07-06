import type { Agent, AgentContext, Observation } from '../../core/Agent.js';

export class WriterAgent implements Agent {
  id = 'WriterAgent';
  describe() {
    return 'Uses LLM to draft answer';
  }
  async act(input: string, _ctx: AgentContext): Promise<Observation> {
    return { content: `Answer: ${input}` };
  }
}
