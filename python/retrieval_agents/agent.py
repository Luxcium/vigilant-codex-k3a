"""Base Agent with memory and tools."""

class Agent:
    def __init__(self, memory, tools=None):
        self.memory = memory
        self.tools = tools or []

    def process_input(self, user_input):
        raise NotImplementedError()
