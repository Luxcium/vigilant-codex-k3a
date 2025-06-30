from collections import defaultdict
from typing import Any, List, DefaultDict

class Memory:
    def __init__(self) -> None:
        self.storage: DefaultDict[str, List[Any]] = defaultdict(list)

    def store(self, key: str, data: Any) -> None:
        self.storage[key].append(data)

    def retrieve(self, key: str) -> List[Any]:
        return self.storage.get(key, [])
