"""Simple in-memory storage for agents."""

class Memory:
    def __init__(self):
        self.store = {}

    def store_data(self, key, value):
        self.store[key] = value

    def retrieve_data(self, key, default=None):
        return self.store.get(key, default)
