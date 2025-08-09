---
description: 'Comprehensive notebook development workflow automation with VS Code integration'
tools: ['codebase', 'editFiles', 'runCommands', 'search', 'usages', 'vscodeAPI', 'extensions', 'copilotCodingAgent']
---
# Notebook Development Workflow Automation

I will help you create, optimize, and manage Jupyter notebooks with full VS Code integration, following your established project standards and leveraging extended VS Code capabilities.

## Context Assessment

### Project Integration

- **Environment**: Python environment in `python/` directory with requirements.txt management
- **Standards**: Following `python-notebook-standards.instructions.md` and `vscode-notebook-integration.instructions.md`
- **Structure**: Notebooks in `notebooks/` directory with proper cross-referencing
- **Memory Bank**: Integration with activeContext.md, dependencies.md, and systemPatterns.md

### VS Code Configuration

- **Extension Setup**: Jupyter, Python, and related extensions configured
- **Kernel Management**: Automatic environment detection and kernel selection
- **Settings Optimization**: Notebook-specific VS Code settings for optimal experience
- **Custom Commands**: Notebook-specific commands and automation

## Workflow Categories

### 1. Notebook Creation & Setup

**New Notebook Creation**

- Create structured notebook following project standards
- Configure proper markdown documentation sections
- Set up imports and environment validation
- Initialize VS Code notebook settings and kernel selection

**Template Implementation**

- Apply notebook templates for common patterns (data analysis, ML experiments, research)
- Configure cell organization and documentation structure
- Set up reproducibility requirements (seeds, environment specs)
- Implement proper error handling and logging

**Environment Integration**

- Validate Python environment compatibility
- Configure kernel selection and management
- Set up dependency tracking and requirements
- Implement environment-specific configurations

### 2. Development & Execution

**Code Quality Enforcement**

- Apply Python standards and type hints to notebook code
- Implement proper function documentation and docstrings
- Configure linting and formatting for notebook cells
- Validate code quality and standard compliance

**Execution Optimization**

- Monitor cell execution times and resource usage
- Implement memory management and optimization
- Configure parallel execution for independent cells
- Set up checkpointing for expensive computations

**Debugging & Troubleshooting**

- Configure VS Code debugging for notebook cells
- Implement error handling and recovery mechanisms
- Set up performance profiling and optimization
- Handle kernel connection and execution issues

### 3. Analysis & Validation

**Quality Assurance**

- Validate notebook structure and organization
- Check reproducibility across different environments
- Verify compliance with project standards
- Generate quality reports and metrics

**Performance Analysis**

- Profile computational bottlenecks and optimization opportunities
- Analyze memory usage patterns and optimization strategies
- Monitor execution efficiency and resource consumption
- Generate performance reports and recommendations

**Integration Testing**

- Test notebook execution in different environments (local, Docker, cloud)
- Validate cross-environment compatibility and consistency
- Test integration with project codebase and dependencies
- Verify notebook output consistency and reproducibility

### 4. Documentation & Sharing

**Documentation Generation**

- Create comprehensive notebook documentation
- Generate README files and cross-references
- Implement proper markdown formatting and structure
- Link to related project documentation and code

**Export & Sharing**

- Export notebooks to multiple formats (HTML, PDF, slides)
- Configure sharing with complete environment specifications
- Generate standalone packages for collaboration
- Implement version control optimization for notebooks

**Publication Preparation**

- Format notebooks for publication and presentation
- Generate high-quality visualizations and figures
- Create comprehensive methodology documentation
- Prepare supplementary materials and data

## Advanced Features

### VS Code Integration Enhancement

**Custom Commands Implementation**

- Create VS Code commands for notebook-specific operations
- Implement keyboard shortcuts for common development tasks
- Configure task automation and workflow management
- Set up custom notebook execution pipelines

**Extension Development**

- Create custom VS Code extensions for notebook enhancement
- Implement specialized output renderers and visualizations
- Configure custom debugging and profiling capabilities
- Develop notebook-specific development tools

**API Integration**

- Use VS Code's Language Model API for notebook enhancement
- Implement AI-assisted code generation and documentation
- Configure automated code review and quality suggestions
- Use VS Code's notebook API for advanced cell manipulation

### Machine Learning Workflows

**Model Development**

- Structure ML experiments with proper validation and documentation
- Implement hyperparameter tuning and optimization workflows
- Configure model evaluation and comparison frameworks
- Set up model deployment preparation and documentation

**Vision Transformer Workflows**

- Implement ViT model development with proper documentation
- Configure architecture experimentation and comparison
- Set up inference pipeline development and optimization
- Create model cards and performance documentation

**Reproducible Research**

- Implement systematic experiment tracking and documentation
- Configure data versioning and lineage tracking
- Set up collaborative research workflows and sharing
- Create publication-ready research documentation

### Data Science Patterns

**Data Exploration**

- Implement systematic data exploration and quality assessment
- Configure automated data profiling and visualization
- Set up statistical analysis and hypothesis testing
- Create comprehensive data documentation and metadata

**Visualization & Reporting**

- Generate publication-quality visualizations and figures
- Implement interactive dashboards and exploration tools
- Configure automated report generation and updates
- Create comprehensive analysis documentation

**Collaboration & Workflow**

- Set up collaborative notebook development workflows
- Configure version control and review processes
- Implement notebook sharing and presentation workflows
- Create team development standards and guidelines

## Implementation Process

### Step 1: Environment Validation

```bash
# Validate Python environment
cd python && source .venv/bin/activate
python -c "import sys; print(f'Python {sys.version}')"

# Check notebook dependencies
pip list | grep -E "(jupyter|notebook|ipykernel)"

# Validate VS Code configuration
code --list-extensions | grep -E "(jupyter|python)"
```

### Step 2: Notebook Creation

1. **Create notebook structure** following project standards
2. **Configure VS Code settings** for optimal notebook experience
3. **Set up kernel selection** and environment integration
4. **Initialize documentation** and cross-references

### Step 3: Development Workflow

1. **Implement code quality checks** and standards compliance
2. **Configure execution monitoring** and optimization
3. **Set up debugging and profiling** capabilities
4. **Implement testing and validation** procedures

### Step 4: Integration & Documentation

1. **Update memory bank files** with notebook development progress
2. **Generate comprehensive documentation** and cross-references
3. **Test cross-environment compatibility** and reproducibility
4. **Prepare for sharing and collaboration**

## Quality Assurance Checklist

### Standard Compliance

- [ ] Follows `python-notebook-standards.instructions.md` requirements
- [ ] Implements proper cell organization and documentation
- [ ] Uses appropriate import management and code quality standards
- [ ] Includes proper error handling and resource management

### VS Code Integration

- [ ] Configured with optimal VS Code settings and extensions
- [ ] Uses proper kernel management and environment integration
- [ ] Implements custom commands and automation where appropriate
- [ ] Leverages VS Code's debugging and profiling capabilities

### Memory Bank Integration

- [ ] Updates activeContext.md with notebook development focus
- [ ] Maintains dependencies.md with notebook-related dependencies
- [ ] Records architectural decisions in systemPatterns.md
- [ ] Documents progress in progress.md

### Reproducibility & Quality

- [ ] Implements proper random seed management
- [ ] Includes comprehensive environment documentation
- [ ] Tests execution in clean environments
- [ ] Validates cross-environment compatibility

## Success Metrics

### Development Efficiency

- Notebook creation time reduction through templates and automation
- Code quality improvement through integrated linting and formatting
- Debugging efficiency through VS Code integration
- Documentation completeness and consistency

### Reproducibility & Reliability

- Consistent execution across different environments
- Proper dependency management and version control
- Comprehensive error handling and recovery
- Validated cross-environment compatibility

### Integration & Collaboration

- Seamless integration with project codebase and documentation
- Effective collaboration workflows and sharing mechanisms
- Comprehensive documentation and cross-references
- Maintained memory bank synchronization

This workflow automation ensures comprehensive notebook development with full VS Code integration while maintaining project standards and leveraging extended capabilities for optimal development experience.

## References

- [python-notebook-standards](../instructions/python-notebook-standards.instructions.md)
- [vscode-notebook-integration](../instructions/vscode-notebook-integration.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
