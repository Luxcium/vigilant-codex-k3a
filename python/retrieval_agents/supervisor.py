"""Supervisor agent that coordinates worker agents."""

from __future__ import annotations

from typing import List

from .base import Agent
from .worker import WorkerAgent


class SupervisorAgent(Agent):
    """Agent that delegates tasks to workers and aggregates results."""

    def __init__(self, workers: List[WorkerAgent] | None = None) -> None:
        super().__init__()
        self.workers = workers or []

    def delegate_task(self, query: str) -> List[str]:
        outputs: List[str] = []
        for worker in self.workers:
            data = worker.process_task(query)
            outputs.extend([str(d) for d in data])
        return outputs

    def generate_final_response(self, query: str) -> str:
        results = self.delegate_task(query)
        return "\n".join(results)
