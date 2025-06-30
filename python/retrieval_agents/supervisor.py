"""SupervisorAgent coordinates worker agents."""

from .agent import Agent

class SupervisorAgent(Agent):
    def __init__(self, memory, workers=None, tools=None):
        super().__init__(memory, tools)
        self.workers = workers or []

    def delegate_task(self, task):
        results = []
        for worker in self.workers:
            results.append(worker.process_task(task))
        return self.aggregate_results(results)

    def aggregate_results(self, results):
        return "\n".join(str(r) for r in results)
