from typing import List, Tuple
import numpy as np

class VectorSearchTool:
    def __init__(self, vectors: List[np.ndarray], docs: List[str]) -> None:
        self.vectors = np.vstack(vectors) if vectors else np.empty((0, 0))
        self.docs = docs

    def query(self, vector: np.ndarray, top_k: int = 3) -> List[Tuple[str, float]]:
        if not self.vectors.size:
            return []
        sims = self.vectors @ vector
        vector_norm = np.linalg.norm(vector)
        if vector_norm == 0:
            return []
        norms = np.linalg.norm(self.vectors, axis=1) * vector_norm
        sims = sims / norms
        idx = sims.argsort()[::-1][:top_k]
        return [(self.docs[i], float(sims[i])) for i in idx]
