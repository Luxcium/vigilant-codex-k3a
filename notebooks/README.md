
# Jupyter Notebooks Directory

This directory contains all Jupyter notebooks for the project.


## Notebook Index & References

- **[openai/](./openai/)**: All OpenAI API prototyping and integration notebooks are now organised in this subfolder.
  - **[openai_api_prototyping.ipynb](./openai/openai_api_prototyping.ipynb)**: Stepwise, well-documented OpenAI API prototyping using `.env` for API key management. Created as part of a guided session—see [memory-bank/activeContext.md](../memory-bank/activeContext.md) for chat context. Follows project standards for reproducibility and documentation.

---


## Usage

- All notebooks use the Python environment defined in the `python/` directory.
- Install dependencies and activate the environment as described in `python/README.md`.
- To launch Jupyter:
  1. Activate the Python environment (e.g., `source ../python/.venv/bin/activate` from this directory).
  2. Run `jupyter notebook` or `jupyter lab`.
- All dependencies for notebooks are managed in `python/requirements.txt`.

## OpenAI API Example

- See [openai_api_prototyping.ipynb](./openai_api_prototyping.ipynb) for a template on securely using the OpenAI API with `.env` and `python-dotenv`.
- This notebook references the chat session in [memory-bank/activeContext.md](../memory-bank/activeContext.md) and follows [python-notebook-standards.instructions.md](../memory-bank/instructions/python-notebook-standards.instructions.md).

---


## Standards

- Follow [python-notebook-standards.instructions.md](../memory-bank/instructions/python-notebook-standards.instructions.md).
- Do not create a separate environment in this directory.

## Memory Bank & Documentation

- For chat-driven notebook development, see [memory-bank/activeContext.md](../memory-bank/activeContext.md).

---

## Example

```bash
cd ../python
source .venv/bin/activate
cd ../notebooks
jupyter notebook
```

## See Also

- [python/README.md](../python/README.md)
- [python-environment.instructions.md](../memory-bank/instructions/python-environment.instructions.md)
