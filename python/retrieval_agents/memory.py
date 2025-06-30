"""Simple in-memory storage for agent context."""

from typing import Any, Dict, List


class Memory:
    """In-memory key-value store."""

    def __init__(self) -> None:
        self.storage: Dict[str, List[Any]] = {}

    def store_data(self, key: str, value: Any) -> None:
        self.storage.setdefault(key, []).append(value)

    def retrieve_data(self, key: str) -> List[Any]:
        return self.storage.get(key, [])
