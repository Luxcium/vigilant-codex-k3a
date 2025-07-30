# Python Environment - Local Virtual Environment Mode

This Python environment is configured for **Local Virtual Environment** mode, providing direct host development.

## Environment Details

- **Mode:** Local Virtual Environment
- **Python Version:** 3.13
- **Project Name:** my-python-app
- **Virtual Environment:** .venv/

## Quick Start

### Activate the virtual environment:
```bash
source .venv/bin/activate
```

### Install dependencies:
```bash
pip install -r requirements.txt
```

### Run your Python code:
```bash
python your_script.py
```

### Deactivate when done:
```bash
deactivate
```

## Development Workflow

1. **Activate environment:** `source .venv/bin/activate`
2. **Edit code** using your favorite editor/IDE
3. **Run/test** your code directly
4. **Install new packages:** `pip install package_name`
5. **Update requirements:** `pip freeze > requirements.txt`
6. **Deactivate when done:** `deactivate`

## Environment Variables

Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
# Edit .env with your settings
```

Load environment variables in your Python code:
```python
from dotenv import load_dotenv
import os

load_dotenv()
my_var = os.getenv('MY_VARIABLE')
```

## Adding Dependencies

1. **Activate environment:** `source .venv/bin/activate`
2. **Install package:** `pip install package_name`
3. **Update requirements:** `pip freeze > requirements.txt`
4. **Commit requirements.txt** to version control

## IDE Integration

### VS Code
1. Open project in VS Code
2. Select Python interpreter: `Ctrl+Shift+P` → "Python: Select Interpreter"
3. Choose: `./python/.venv/bin/python`

### PyCharm
1. Open project in PyCharm
2. Go to: File → Settings → Project → Python Interpreter
3. Add interpreter: `./python/.venv/bin/python`

## Advantages of Local Mode

- ✅ **Direct IDE integration** and debugging
- ✅ **Fast iteration** cycles
- ✅ **Native filesystem access**
- ✅ **No Docker complexity**

## Considerations

- ❌ **Host Python dependency** (requires Python 3.11+)
- ❌ **Potential system conflicts** with other projects
- ❌ **Platform differences** (Windows vs Linux/Mac)

## Switching Modes

To switch to a different environment mode:

```bash
# Switch to Docker isolated
../scripts/setup_python_env.sh --mode docker_isolated

# Switch to Docker volume-mounted
../scripts/setup_python_env.sh --mode docker_volume
```

## Troubleshooting

### Virtual Environment Issues
- Delete and recreate: `rm -rf .venv && python3 -m venv .venv`
- Check Python version: `python3 --version`
- Ensure pip is updated: `pip install --upgrade pip`

### Package Installation Issues
- Clear pip cache: `pip cache purge`
- Install with verbose output: `pip install -v package_name`
- Check for conflicting versions: `pip check`

### Environment Variable Issues
- Install python-dotenv: `pip install python-dotenv`
- Check .env file exists and has correct format
- Verify file permissions: `ls -la .env`

## File Structure

```
python/
├── .venv/                 # Virtual environment (auto-generated)
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variable template
├── .env                  # Your environment variables (create from example)
├── README.md             # This file
└── your_code.py          # Your Python application code
```

For more information, see:
- Instructions: `../memory-bank/instructions/python-environment-conditional.instructions.md`
- Prompt: `../memory-bank/prompts/python-environment-setup.prompt.md`
