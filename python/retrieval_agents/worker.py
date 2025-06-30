"""Worker agent specialized for specific tasks."""

from __future__ import annotations

from typing import Any, List

from .base import Agent


class WorkerAgent(Agent):
    """Agent responsible for retrieval tasks."""

    def process_task(self, query: str) -> List[Any]:
        results: List[Any] = []
        for tool in self.tools:
            if hasattr(tool, "execute"):
                results.extend(tool.execute(query))
        return results
