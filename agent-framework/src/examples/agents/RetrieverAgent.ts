import type { Agent, AgentContext, Observation } from '../../core/Agent.js';

export class RetrieverAgent implements Agent {
  id = 'RetrieverAgent';
  describe() {
    return 'Searches VectorStore then ToolSearch';
  }
  async act(input: string, ctx: AgentContext): Promise<Observation> {
    const hits = await ctx.tools.vector.query(input, 5);
    return { content: hits.join('\n') };
  }
}
