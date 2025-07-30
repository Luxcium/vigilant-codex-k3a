## =============================================================================
#? Script Name: setup_agent_system.sh
#? Aim: Initialize hierarchical agent system in python/agent_system
#? Purpose: Set up the agent system directory with templates and modules
#? Decision Rationale: Provides a structured foundation for multi-agent retrieval systems
#? Usage: ./setup_agent_system.sh
#? Dependencies: Python, NumPy
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: python/agent_system/, memory.py, tools.py, agents.py
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
# setup_agent_system.sh: Initialize hierarchical agent system in python/agent_system
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENT_DIR="$PROJECT_ROOT/python/agent_system"

if [ ! -d "$AGENT_DIR" ]; then
  mkdir -p "$AGENT_DIR"
  log "Created directory $AGENT_DIR"
else
  log "Directory $AGENT_DIR already exists"
fi

# README
if [ ! -f "$AGENT_DIR/README.md" ]; then
  cat > "$AGENT_DIR/README.md" << 'FILE'
# Agent System

This module implements a hierarchical multi-agent retrieval system.
It provides a SupervisorAgent that coordinates WorkerAgents using
shared Memory and retrieval tools.
FILE
  log "Created $AGENT_DIR/README.md"
fi

# __init__.py
if [ ! -f "$AGENT_DIR/__init__.py" ]; then
  cat > "$AGENT_DIR/__init__.py" << 'FILE'
from .memory import Memory
from .tools import VectorSearchTool
from .agents import Agent, WorkerAgent, SupervisorAgent

__all__ = [
    "Memory",
    "VectorSearchTool",
    "Agent",
    "WorkerAgent",
    "SupervisorAgent",
]
FILE
  log "Created $AGENT_DIR/__init__.py"
fi

# memory.py
if [ ! -f "$AGENT_DIR/memory.py" ]; then
  cat > "$AGENT_DIR/memory.py" << 'FILE'
from collections import defaultdict
from typing import Any, List, DefaultDict

class Memory:
    def __init__(self) -> None:
        self.storage: DefaultDict[str, List[Any]] = defaultdict(list)

    def store(self, key: str, data: Any) -> None:
        self.storage[key].append(data)

    def retrieve(self, key: str) -> List[Any]:
        return self.storage.get(key, [])
FILE
  log "Created $AGENT_DIR/memory.py"
fi

# tools.py
if [ ! -f "$AGENT_DIR/tools.py" ]; then
  cat > "$AGENT_DIR/tools.py" << 'FILE'
from typing import List, Tuple
import numpy as np

class VectorSearchTool:
    def __init__(self, vectors: List[np.ndarray], docs: List[str]) -> None:
        self.vectors = np.vstack(vectors) if vectors else np.empty((0, 0))
        self.docs = docs

    def query(self, vector: np.ndarray, top_k: int = 3) -> List[Tuple[str, float]]:
        if not self.vectors.size:
            return []
        sims = self.vectors @ vector
        norms = np.linalg.norm(self.vectors, axis=1) * np.linalg.norm(vector)
        sims = sims / norms
        idx = sims.argsort()[::-1][:top_k]
        return [(self.docs[i], float(sims[i])) for i in idx]
FILE
  log "Created $AGENT_DIR/tools.py"
fi

# agents.py
if [ ! -f "$AGENT_DIR/agents.py" ]; then
  cat > "$AGENT_DIR/agents.py" << 'FILE'
from typing import Any, Dict, List
import numpy as np
from .memory import Memory
from .tools import VectorSearchTool

class Agent:
    def __init__(self, name: str, memory: Memory, tools: List[Any] | None = None) -> None:
        self.name = name
        self.memory = memory
        self.tools = tools or []

    def process_input(self, query: np.ndarray) -> Dict[str, Any]:
        raise NotImplementedError

class WorkerAgent(Agent):
    def process_task(self, query: np.ndarray) -> Dict[str, Any]:
        results: Dict[str, Any] = {}
        for tool in self.tools:
            if isinstance(tool, VectorSearchTool):
                results[tool.__class__.__name__] = tool.query(query)
        self.memory.store(self.name, results)
        return results

class SupervisorAgent(Agent):
    def __init__(self, name: str, memory: Memory, workers: List[WorkerAgent] | None = None) -> None:
        super().__init__(name, memory)
        self.workers = workers or []

    def delegate_task(self, query: np.ndarray) -> Dict[str, Any]:
        aggregated = [worker.process_task(query) for worker in self.workers]
        self.memory.store(self.name, aggregated)
        return self.generate_final_response(aggregated)

    def generate_final_response(self, aggregated: List[Dict[str, Any]]) -> Dict[str, Any]:
        return {"results": aggregated}
FILE
  log "Created $AGENT_DIR/agents.py"
fi

log "Agent system setup complete"
