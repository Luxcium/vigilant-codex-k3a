"""WorkerAgent specialized for a single tool."""

from .agent import Agent

class WorkerAgent(Agent):
    def __init__(self, memory, tool):
        super().__init__(memory, [tool])
        self.tool = tool

    def process_task(self, task):
        result = self.tool.execute(task)
        self.memory.store_data(task, result)
        return result
