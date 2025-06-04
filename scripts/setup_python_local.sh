#!/usr/bin/env bash
# Python Local Virtual Environment Setup
# Creates a local virtual environment for Python development

set -euo pipefail

# Import environment variables from main script
PYTHON_DIR="${PYTHON_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../python" && pwd)}"
PYTHON_VERSION="${PYTHON_VERSION:-3.11}"
PROJECT_NAME="${PROJECT_NAME:-my-python-app}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
  echo -e "${BLUE}[$(date -u +'%Y-%m-%dT%H:%M:%SZ')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log "Setting up local Python virtual environment..."
log "Python Directory: $PYTHON_DIR"
log "Python Version: $PYTHON_VERSION"
log "Project Name: $PROJECT_NAME"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    error "python3 is not installed or not in PATH"
    error "Please install Python 3.11+ and try again"
    exit 1
fi

# Check Python version
PYTHON_ACTUAL_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
log "Found Python version: $PYTHON_ACTUAL_VERSION"

# Create requirements.txt if it doesn't exist
REQUIREMENTS_FILE="$PYTHON_DIR/requirements.txt"
if [ ! -f "$REQUIREMENTS_FILE" ]; then
    log "Creating requirements.txt..."
    cat > "$REQUIREMENTS_FILE" << EOF
# Python dependencies for local virtual environment
# Add your project dependencies below

# Example common dependencies:
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
EOF
    success "Created requirements.txt"
else
    log "requirements.txt already exists"
fi

# Navigate to python directory
cd "$PYTHON_DIR"

# Create virtual environment if it doesn't exist
if [ ! -d .venv ]; then
    log "Creating virtual environment..."
    python3 -m venv .venv
    success "Virtual environment created"
else
    log "Virtual environment already exists"
fi

# Activate virtual environment
log "Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
log "Upgrading pip..."
pip install --upgrade pip

# Install dependencies if requirements.txt exists and has content
if [ -f requirements.txt ] && [ -s requirements.txt ]; then
    # Check if requirements.txt has actual dependencies (not just comments)
    if grep -v '^#' requirements.txt | grep -v '^$' | grep -q .; then
        log "Installing dependencies from requirements.txt..."
        pip install -r requirements.txt
        success "Dependencies installed"
    else
        log "requirements.txt contains no dependencies, skipping installation"
    fi
else
    log "No requirements.txt found or file is empty"
fi

# Update python/README.md with local instructions
README_FILE="$PYTHON_DIR/README.md"
log "Updating README.md with local environment instructions..."

cat > "$README_FILE" << EOF
# Python Environment - Local Virtual Environment Mode

This Python environment is configured for **Local Virtual Environment** mode, providing direct host development.

## Environment Details

- **Mode:** Local Virtual Environment
- **Python Version:** ${PYTHON_ACTUAL_VERSION}
- **Project Name:** ${PROJECT_NAME}
- **Virtual Environment:** .venv/

## Quick Start

### Activate the virtual environment:
\`\`\`bash
source .venv/bin/activate
\`\`\`

### Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Run your Python code:
\`\`\`bash
python your_script.py
\`\`\`

### Deactivate when done:
\`\`\`bash
deactivate
\`\`\`

## Development Workflow

1. **Activate environment:** \`source .venv/bin/activate\`
2. **Edit code** using your favorite editor/IDE
3. **Run/test** your code directly
4. **Install new packages:** \`pip install package_name\`
5. **Update requirements:** \`pip freeze > requirements.txt\`
6. **Deactivate when done:** \`deactivate\`

## Environment Variables

Copy \`.env.example\` to \`.env\` and update with your values:
\`\`\`bash
cp .env.example .env
# Edit .env with your settings
\`\`\`

Load environment variables in your Python code:
\`\`\`python
from dotenv import load_dotenv
import os

load_dotenv()
my_var = os.getenv('MY_VARIABLE')
\`\`\`

## Adding Dependencies

1. **Activate environment:** \`source .venv/bin/activate\`
2. **Install package:** \`pip install package_name\`
3. **Update requirements:** \`pip freeze > requirements.txt\`
4. **Commit requirements.txt** to version control

## IDE Integration

### VS Code
1. Open project in VS Code
2. Select Python interpreter: \`Ctrl+Shift+P\` → "Python: Select Interpreter"
3. Choose: \`./python/.venv/bin/python\`

### PyCharm
1. Open project in PyCharm
2. Go to: File → Settings → Project → Python Interpreter
3. Add interpreter: \`./python/.venv/bin/python\`

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

\`\`\`bash
# Switch to Docker isolated
../scripts/setup_python_env.sh --mode docker_isolated

# Switch to Docker volume-mounted
../scripts/setup_python_env.sh --mode docker_volume
\`\`\`

## Troubleshooting

### Virtual Environment Issues
- Delete and recreate: \`rm -rf .venv && python3 -m venv .venv\`
- Check Python version: \`python3 --version\`
- Ensure pip is updated: \`pip install --upgrade pip\`

### Package Installation Issues
- Clear pip cache: \`pip cache purge\`
- Install with verbose output: \`pip install -v package_name\`
- Check for conflicting versions: \`pip check\`

### Environment Variable Issues
- Install python-dotenv: \`pip install python-dotenv\`
- Check .env file exists and has correct format
- Verify file permissions: \`ls -la .env\`

## File Structure

\`\`\`
python/
├── .venv/                 # Virtual environment (auto-generated)
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variable template
├── .env                  # Your environment variables (create from example)
├── README.md             # This file
└── your_code.py          # Your Python application code
\`\`\`

For more information, see:
- Instructions: \`../.github/instructions/python-environment-conditional.instructions.md\`
- Prompt: \`../.github/prompts/python-environment-setup.prompt.md\`
EOF

log "Verifying Markdown compliance…"
markdownlint --config .markdownlint.yaml "$README_FILE" || {
  echo "[ERROR] $README_FILE failed markdownlint."
  exit 1
}

success "Updated README.md with local environment instructions"

# Test the environment
log "Testing Python installation..."
if python --version; then
    success "Python is working correctly in virtual environment"
else
    error "Python test failed"
    exit 1
fi

success "Local Python virtual environment setup completed!"
log ""
log "Next steps:"
log "  1. Navigate to the python/ directory: cd python/"
log "  2. Copy .env.example to .env: cp .env.example .env"
log "  3. Edit .env with your environment variables"
log "  4. Add your Python code to the python/ directory"
log "  5. Always activate before working: source .venv/bin/activate"
log "  6. Install packages as needed: pip install package_name"
log "  7. Update requirements: pip freeze > requirements.txt"
log "  8. Deactivate when done: deactivate"
log ""
log "Virtual environment is ready at: $PYTHON_DIR/.venv"
log "To activate: source $PYTHON_DIR/.venv/bin/activate"
