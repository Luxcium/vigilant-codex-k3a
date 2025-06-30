"""Tool implementations for agents."""

class VectorSearchTool:
    def __init__(self, database=None):
        self.database = database or {}

    def execute(self, query):
        return self.database.get(query, [])
