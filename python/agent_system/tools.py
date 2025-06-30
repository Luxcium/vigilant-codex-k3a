from typing import List, Tuple
import numpy as np

class VectorSearchTool:
    def __init__(self, vectors: List[np.ndarray], docs: List[str]) -> None:
        self.vectors = np.vstack(vectors) if vectors else np.empty((0, 0))
        self.docs = docs

    def query(self, vector: np.ndarray, top_k: int = 3) -> List[Tuple[str, float]]:
        if not self.vectors.size:
            return []
        vector_norm = np.linalg.norm(vector)
        if vector_norm == 0:
            return []  # Return early if the query vector has zero norm
        sims = self.vectors @ vector
        vector_norms = np.linalg.norm(self.vectors, axis=1)
        norms = vector_norms * vector_norm
        norms[norms == 0] = np.inf  # Avoid division by zero by setting zero norms to infinity
        sims = sims / norms
        idx = sims.argsort()[::-1][:top_k]
        return [(self.docs[i], float(sims[i])) for i in idx]
