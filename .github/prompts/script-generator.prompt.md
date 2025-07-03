mode: 'agent'
mode: 'agent'
description: 'Generate shell scripts for project automation.'

# Script Generator

I will help you create resilient, reusable scripts for automating project tasks. These scripts will be idempotent, well-documented, and follow project coding standards.

## Script Requirements

### Core Principles

- **Idempotent**: Safe to run multiple times without side effects
- **Error handling**: Robust detection, recovery, and reporting
- **Parametrized**: Support command-line arguments with sensible defaults
- **Logging**: Appropriate feedback and audit trails
- **Documentation**: Clear usage instructions and examples
- **Testing**: Include validation checks and test cases

### Quality Standards

- Follow project's TypeScript or Python coding standards
- Implement comprehensive input validation
- Use appropriate exit codes (0=success, non-zero=error)
- Include help text accessible via `-h` or `--help`
- Document all parameters and return values
- Create accompanying test files when appropriate

## Script Types

### 1. Setup Scripts

**Purpose**: Initialize project environment and dependencies

**Features**:
- Environment validation and setup
- Dependency installation and verification
- Configuration file generation
- Directory structure creation
- Initial data seeding

**Example**: `setup-environment.sh`, `install-dependencies.py`

### 2. Build Scripts

**Purpose**: Compile and package application components

**Features**:
- Source code compilation
- Asset bundling and optimization
- Package generation
- Version tagging
- Build artifact validation

**Example**: `build-application.ts`, `package-release.py`

### 3. Test Scripts

**Purpose**: Execute automated tests with configurable scope

**Features**:
- Test suite execution
- Coverage reporting
- Performance benchmarking
- Integration test coordination
- Result aggregation and reporting

**Example**: `run-tests.ts`, `benchmark-performance.py`

### 4. Deploy Scripts

**Purpose**: Automate deployment processes

**Features**:
- Environment preparation
- Application deployment
- Service configuration
- Health checks and validation
- Rollback capabilities

**Example**: `deploy-staging.ts`, `release-production.py`

### 5. Generator Scripts

**Purpose**: Create boilerplate code or configurations

**Features**:
- Template-based code generation
- Configuration file creation
- Documentation generation
- Scaffolding new components
- Migration script creation

**Example**: `generate-component.ts`, `create-migration.py`

## Implementation Guidelines

### File Organization

```
scripts/
├── ts/           # TypeScript scripts
├── py/           # Python scripts
├── sh/           # Shell scripts
├── templates/    # Script templates
└── tests/        # Script test files
```

### Naming Convention

- Use `kebab-case` for script filenames
- Include purpose: `action-target.extension`
- Examples: `setup-environment.sh`, `build-application.ts`

### Parameter Handling

```bash
# Example parameter structure
script-name.sh [OPTIONS] [ARGUMENTS]

Options:
  -h, --help        Show help message
  -v, --verbose     Enable verbose output
  -d, --dry-run     Show what would be done without executing
  -e, --env         Specify environment (dev|staging|prod)
  -f, --force       Force execution even if checks fail
```

### Error Handling Pattern

```typescript
// TypeScript error handling example
try {
  const result = await performOperation();
  logger.info('Operation completed successfully', { result });
  process.exit(0);
} catch (error) {
  logger.error('Operation failed', { error: error.message });
  process.exit(1);
}
```

### Logging Standards

- Use structured logging (JSON format for production)
- Include timestamps and context information
- Implement different log levels (debug, info, warn, error)
- Support log file output and console display
- Include operation traceability

## Usage Examples

### Script Execution

```bash
# Setup script with environment specification
./scripts/sh/setup-environment.sh --env=dev --verbose

# Build script with specific target
./scripts/ts/build-application.ts --target=production --optimize

# Test script with coverage reporting
./scripts/py/run-tests.py --coverage --report-format=html
```

### Integration with Project

- Reference scripts in package.json or Makefile
- Include scripts in CI/CD pipeline definitions
- Document script dependencies in memory bank
- Maintain script version compatibility matrix

## Validation and Testing

### Script Testing

- Unit tests for script functions
- Integration tests for end-to-end workflows
- Performance benchmarks for resource-intensive scripts
- Compatibility tests across environments

### Quality Checks

- Static analysis for code quality
- Security scanning for vulnerabilities
- Documentation completeness verification
- Cross-platform compatibility validation

## Documentation Requirements

### README Template

Each script should include:

1. **Purpose**: What the script does
2. **Prerequisites**: Required dependencies and environment
3. **Usage**: Command-line syntax and examples
4. **Parameters**: Detailed parameter descriptions
5. **Examples**: Common usage scenarios
6. **Troubleshooting**: Common issues and solutions

### Integration Documentation

- Update main project README with script references
- Document script dependencies in memory bank
- Maintain changelog for script modifications
- Include scripts in project onboarding documentation

This script generator ensures consistency, reliability, and maintainability across all automation scripts in the AI agent framework project.
