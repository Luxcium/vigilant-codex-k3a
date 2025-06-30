"""Base agent class with common behavior."""

from __future__ import annotations

from typing import List, Any

from .memory import Memory
from .tools import VectorSearchTool


class Agent:
    """Base agent supporting memory and tools."""

    def __init__(self, memory: Memory | None = None, tools: List[Any] | None = None) -> None:
        self.memory = memory or Memory()
        self.tools = tools or []

    def process_input(self, text: str) -> str:
        self.memory.store_data("conversation", text)
        return text

    def use_tool(self, tool: VectorSearchTool, query: str) -> List[Any]:
        return tool.execute(query)

    def get_response(self) -> str:
        return ""
