"""Example usage of the hierarchical retrieval system"""

from memory import Memory
from tools import VectorSearchTool
from supervisor import SupervisorAgent
from worker import WorkerAgent


if __name__ == "__main__":
    memory = Memory()
    search_tool = VectorSearchTool({"hello": ["world"]})
    worker = WorkerAgent(memory, search_tool)
    supervisor = SupervisorAgent(memory, [worker])
    print(supervisor.delegate_task("hello"))

