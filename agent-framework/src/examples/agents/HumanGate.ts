import type { Agent, AgentContext, Observation } from '../../core/Agent.js';
import readline from 'node:readline/promises';

export class HumanGate implements Agent {
  id = 'HumanGate';
  describe() {
    return 'Waits for human input';
  }
  async act(_input: string, _ctx: AgentContext): Promise<Observation> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const ans = await rl.question('> ');
    rl.close();
    return { content: ans };
  }
}
