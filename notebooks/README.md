# Jupyter Notebooks Directory

This directory contains all Jupyter notebooks for the project.

## Usage

- All notebooks use the Python environment defined in the `python/` directory.
- Install dependencies and activate the environment as described in `python/README.md`.
- To launch Jupyter:
  1. Activate the Python environment (e.g., `source ../python/.venv/bin/activate` from this directory).
  2. Run `jupyter notebook` or `jupyter lab`.
- All dependencies for notebooks are managed in `python/requirements.txt`.

## Standards

- Follow [python-notebook-standards.instructions.md](../.github/instructions/python-notebook-standards.instructions.md).
- Do not create a separate environment in this directory.

## Example

```bash
cd ../python
source .venv/bin/activate
cd ../notebooks
jupyter notebook
```

## See Also

- [python/README.md](../python/README.md)
- [python-environment.instructions.md](../.github/instructions/python-environment.instructions.md)
