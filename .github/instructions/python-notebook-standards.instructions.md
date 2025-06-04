---
applyTo: "**/*.ipynb"
---

# Python Notebook Standards

## General Notebook Structure

### Cell Organization
- Start with a markdown cell containing notebook title and purpose
- Include import cells at the beginning, grouped logically
- Use markdown cells to separate major sections
- End with conclusion or summary markdown cell
- Limit code cells to single logical operations when possible
- Use descriptive variable names throughout

### Markdown Documentation
- Begin each section with clear explanatory text
- Document methodology and reasoning for each step
- Include data source descriptions and preprocessing rationale
- Explain model architecture choices and hyperparameters
- Document evaluation metrics and their interpretation
- Use proper markdown formatting with headers, lists, and code blocks

## Code Quality Standards

### Import Management
- Group imports by category: standard library, third-party, local
- Use consistent import aliases (np, pd, plt, sns, torch, tf)
- Import only required functions/classes to minimize namespace pollution
- Place all imports in dedicated cells at notebook beginning
- Document any unusual or specialized library requirements

### Variable Naming
- Use descriptive, semantic variable names
- Follow snake_case convention for variables and functions
- Use UPPER_CASE for constants and configuration parameters
- Prefix private variables with underscore when appropriate
- Use consistent naming patterns for similar data structures

### Function Definition
- Create reusable functions for repeated operations
- Include type hints for function parameters and return values
- Add docstrings for all custom functions
- Keep functions focused on single responsibilities
- Place utility functions in early cells for reuse

## Data Science Best Practices

### Data Loading and Exploration
- Document data sources and acquisition methods
- Include data quality checks and validation steps
- Display data shape, types, and basic statistics
- Visualize data distributions and relationships
- Handle missing values with documented strategies
- Document any data cleaning or preprocessing steps

### Visualization Standards
- Use consistent color schemes and styling throughout
- Include descriptive titles, axis labels, and legends
- Set appropriate figure sizes for readability
- Use matplotlib/seaborn styling for professional appearance
- Include interpretive text explaining each visualization
- Save important plots as files when appropriate

### Model Development
- Document model selection rationale and alternatives considered
- Include hyperparameter tuning methodology and results
- Implement reproducible training with fixed random seeds
- Document training procedures and convergence criteria
- Include model validation and testing procedures
- Save trained models with descriptive filenames

## Machine Learning Specific Guidelines

### Vision Transformer Standards
- Document input image preprocessing requirements (size, normalization)
- Explain attention mechanism configuration and layer choices
- Include architecture diagrams or visual representations when helpful
- Document patch size and embedding dimension choices
- Explain positional encoding strategy and implementation
- Include inference time benchmarks and memory requirements

### Model Documentation
- Create model cards documenting inputs, outputs, and limitations
- Include performance metrics on validation and test sets
- Document known biases or failure modes
- Explain preprocessing requirements for inference
- Include examples of successful and failed predictions
- Document computational requirements and constraints

### Evaluation and Metrics
- Use appropriate metrics for the specific problem type
- Include confidence intervals or uncertainty estimates when possible
- Compare against relevant baselines and state-of-the-art methods
- Visualize model performance across different data subsets
- Document evaluation methodology and potential limitations
- Include error analysis and failure case examination

## Code Execution Standards

### Cell Dependencies
- Ensure cells can be executed in order without errors
- Minimize dependencies between non-adjacent cells
- Include cell execution time estimates for long-running operations
- Use checkpoints or intermediate saves for expensive computations
- Document any cells that require specific execution order

### Error Handling
- Include try-catch blocks for operations that may fail
- Provide informative error messages and debugging information
- Handle missing files or network dependencies gracefully
- Include fallback options for optional operations
- Document known issues and workarounds

### Resource Management
- Monitor and document memory usage for large datasets
- Clear unnecessary variables to free memory when needed
- Use generators or batch processing for large data operations
- Include warnings about computationally expensive operations
- Document hardware requirements for successful execution

## Reproducibility Requirements

### Environment Documentation
- List all required packages with specific version numbers
- Include Python version and key system requirements
- Document any special installation requirements or dependencies
- Provide environment.yml or requirements.txt when appropriate
- Test notebooks in clean environments when possible

### Random Seed Management
- Set random seeds for all stochastic operations
- Document seed values used for reproducible results
- Include seeds for NumPy, random, torch, tensorflow as applicable
- Explain any operations that cannot be made fully deterministic
- Provide alternative approaches for non-deterministic operations

### Data Versioning
- Document data versions and sources used
- Include checksums or hashes for data files when possible
- Explain any data splits or sampling procedures
- Document any temporal aspects of data collection
- Include information about data access and permissions

## Performance and Optimization

### Computational Efficiency
- Profile code performance for bottlenecks when appropriate
- Use vectorized operations instead of loops when possible
- Document computational complexity of major operations
- Include timing information for expensive computations
- Suggest optimization opportunities for production use

### Memory Management
- Monitor memory usage throughout notebook execution
- Use appropriate data types to minimize memory footprint
- Clear large variables when no longer needed
- Use memory-efficient data loading techniques for large datasets
- Document peak memory requirements

## Quality Assurance

### Testing and Validation
- Include unit tests for custom functions when appropriate
- Validate data integrity at key processing steps
- Include sanity checks for model outputs and predictions
- Test edge cases and boundary conditions
- Document testing methodology and coverage

### Code Review Checklist
- Verify all cells execute without errors in clean environment
- Check that visualizations render correctly and are informative
- Ensure all external dependencies are documented
- Validate that conclusions are supported by presented evidence
- Confirm notebook follows project naming and organization standards

## Cross-Reference Integration

### Memory Bank Connections
- Reference relevant files in memory-bank/ directory
- Update dependencies.md when creating notebook interdependencies
- Follow reading protocol from .clinerules/reading-protocol.md
- Cross-reference related notebooks and documentation
- Maintain bidirectional links between notebooks and supporting code

### Documentation Standards
- Follow markdown-lint strict mode requirements in markdown cells
- Use consistent cross-referencing format for related materials
- Include links to data sources, papers, and external documentation
- Maintain updated notebook table of contents when appropriate
- Document notebook relationships and execution dependencies

## Memory Bank Compliance

- Update dependencies.md for new Python libraries or frameworks
- Document technical constraints in techContext.md
- Record experiment results and findings in progress.md
- Follow the project's dependency tracking protocols
- Ensure all notebook changes are properly documented
- Reference relevant memory bank files in notebook documentation

Remember to maintain consistency with the project's memory bank files and keep all documentation up-to-date.
