---
applyTo: '**/*.ipynb'
description: 'VS Code notebook integration standards and extended capabilities'
---

# VS Code Notebook Integration Standards

## VS Code Notebook API Integration

### Cell Execution Control

- Use `NotebookController.executeHandler` for custom execution logic and workflow control
- Implement `NotebookCellExecution` tracking for performance monitoring and optimization
- Configure proper kernel management with automatic environment detection
- Handle cell execution state management and error recovery

### Notebook Extension Development

- Create custom VS Code extensions for notebook enhancement following TypeScript standards
- Implement specialized output renderers for data visualization and model results
- Use VS Code's Language Server Protocol for enhanced Python support in notebook cells
- Integrate debugging capabilities using VS Code's debugging API

### Workspace Integration

- Configure multi-folder workspace support for notebook development across project directories
- Optimize VS Code settings for notebook experience using `.vscode/settings.json`
- Integrate notebook workflows with VS Code tasks and automation pipelines
- Implement custom commands for notebook-specific operations

## Environment Configuration Standards

### Python Environment Integration

- Use the established `python/` directory environment for all notebook operations
- Configure automatic kernel selection based on project Python environment
- Implement environment validation before notebook execution
- Handle cross-environment compatibility between local, Docker, and cloud setups

### VS Code Settings Optimization

- Configure `jupyter.defaultKernel` to use project Python environment
- Set `jupyter.askForKernelRestart` to `false` for automated workflows
- Enable `jupyter.enableScrollingOutputs` for better output management
- Configure `jupyter.magicCommandsAsComments` for better syntax highlighting

### Extension Requirements

- Install and configure Jupyter extension for VS Code
- Use Python extension with proper interpreter configuration
- Configure Pylint and MyPy integration for notebook code quality
- Enable IntelliSense and code completion for notebook development

## Notebook Development Standards

### Cell Organization and Structure

- Follow markdown cell documentation standards from `python-notebook-standards.instructions.md`
- Use VS Code's outline view for notebook navigation and structure management
- Implement proper cell tagging for organization and execution control
- Use VS Code's notebook folding capabilities for complex notebook management

### Code Quality Integration

- Apply Python standards from `python-standards.instructions.md` to notebook code cells
- Use VS Code's built-in linting and formatting for notebook code
- Implement type checking with MyPy integration for notebook functions
- Configure automatic code formatting with Black integration

### Documentation Integration

- Use VS Code's markdown preview for notebook documentation cells
- Implement cross-referencing with project documentation using relative links
- Configure spell checking and grammar checking for markdown cells
- Use VS Code's table of contents generation for large notebooks

## Performance and Optimization Standards

### Execution Monitoring

- Implement cell execution time tracking using VS Code's timing capabilities
- Use VS Code's performance profiler for notebook code optimization
- Monitor memory usage and resource consumption during notebook execution
- Configure execution timeouts and resource limits for automated workflows

### Resource Management

- Implement memory monitoring and cleanup recommendations
- Use VS Code's variable explorer for notebook state management
- Configure automatic garbage collection for long-running notebooks
- Implement checkpoint and recovery mechanisms for expensive computations

### Optimization Patterns

- Use VS Code's code lens for performance insights and optimization suggestions
- Implement batch processing recommendations for large dataset operations
- Configure parallel execution strategies for independent notebook cells
- Use VS Code's task system for background processing and automation

## Integration with Extended VS Code Capabilities

### Language Model API Integration

- Use VS Code's Language Model API for notebook code generation and enhancement
- Implement AI-assisted documentation generation for notebook cells
- Configure code review and quality suggestions using Language Model capabilities
- Use AI for notebook optimization and performance improvement suggestions

### Custom Commands and Automation

- Implement custom VS Code commands for notebook-specific operations
- Create keyboard shortcuts for common notebook development tasks
- Configure task automation for notebook execution and validation
- Use VS Code's command palette for notebook workflow management

### Webview Integration

- Implement custom webview panels for notebook visualization and interaction
- Use VS Code's webview API for enhanced data exploration interfaces
- Configure interactive widgets and controls for notebook parameters
- Implement custom notebook renderers for specialized output formats

## Testing and Validation Standards

### Notebook Testing Integration

- Configure pytest integration for notebook testing using `nbval` or similar tools
- Implement notebook execution validation in CI/CD pipelines
- Use VS Code's testing framework for notebook quality assurance
- Configure automated notebook output validation and comparison

### Environment Testing

- Implement cross-environment testing for notebook compatibility
- Use VS Code's multi-root workspace for environment isolation testing
- Configure Docker integration for notebook environment validation
- Implement cloud environment testing and deployment validation

### Quality Assurance

- Use VS Code's problem matcher for notebook error detection and reporting
- Implement automated notebook quality checks and standard compliance
- Configure continuous integration for notebook validation and testing
- Use VS Code's diff viewer for notebook version comparison and review

## Memory Bank Integration Standards

### Documentation Requirements

- Update `memory-bank/activeContext.md` with notebook development focus and progress
- Maintain `memory-bank/dependencies.md` with notebook-related dependencies and rationale
- Record architectural decisions in `memory-bank/systemPatterns.md`
- Document notebook ecosystem changes in `memory-bank/progress.md`

### Cross-Reference Maintenance

- Link notebook files to related project code and documentation
- Maintain bidirectional references between notebooks and supporting modules
- Update README files to reflect notebook ecosystem changes and capabilities
- Cross-reference with VS Code configuration and extension recommendations

## Security and Compliance Standards

### Code Security

- Implement secure credential management for notebook API access
- Use VS Code's secret management for sensitive configuration
- Configure secure remote kernel connections for cloud notebooks
- Implement code scanning and vulnerability detection for notebook dependencies

### Data Protection

- Configure secure data access patterns for notebook data sources
- Implement data privacy and protection measures for sensitive datasets
- Use VS Code's workspace trust features for notebook security
- Configure secure sharing and collaboration mechanisms

### Compliance Validation

- Implement compliance checking for notebook development standards
- Use VS Code's regulatory compliance features for notebook documentation
- Configure audit trails for notebook execution and changes
- Implement data governance and lineage tracking for notebook workflows

## Advanced Integration Patterns

### Custom Notebook Controllers

- Implement custom notebook controllers for specialized execution environments
- Use VS Code's notebook controller API for advanced workflow management
- Configure custom kernel management and lifecycle control
- Implement specialized debugging and profiling capabilities

### Extension Development

- Create VS Code extensions for notebook enhancement and automation
- Implement custom notebook renderers and output formatters
- Use VS Code's contribution points for notebook feature extension
- Configure extension marketplace publishing for notebook tools

### Collaborative Development

- Configure VS Code Live Share for collaborative notebook development
- Implement notebook sharing and review workflows
- Use VS Code's version control integration for notebook collaboration
- Configure remote development capabilities for notebook access

## Troubleshooting and Support

### Common Issues Resolution

- Diagnose and resolve kernel connection and startup issues
- Handle VS Code notebook rendering and display problems
- Resolve environment and dependency conflicts
- Troubleshoot performance and memory issues

### Debugging Support

- Use VS Code's debugging capabilities for notebook code
- Implement step-by-step debugging for notebook cell execution
- Configure breakpoint management and variable inspection
- Use VS Code's call stack and variable explorer for notebook debugging

### Performance Optimization

- Identify and resolve notebook performance bottlenecks
- Implement memory optimization strategies for large notebooks
- Configure efficient data loading and processing patterns
- Use VS Code's performance monitoring tools for notebook optimization

This integration ensures that notebook development leverages VS Code's full capabilities while maintaining consistency with project standards and memory bank protocols.
