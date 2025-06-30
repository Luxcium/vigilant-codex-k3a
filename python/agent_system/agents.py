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
