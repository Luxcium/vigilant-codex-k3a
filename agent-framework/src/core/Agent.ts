export interface Observation {
  content: string;
  meta?: Record<string, any>;
}

export interface AgentContext {
  memory: Memory;
  tools: Record<string, Tool>;
}

export interface Agent {
  id: string;
  describe(): string;
  act(input: string, ctx: AgentContext): Promise<Observation>;
}

import type { Memory } from './Memory.js';
import type { Tool } from './Tool.js';
