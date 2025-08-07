---
description: 'Comprehensive Jupyter notebook development, execution, and analysis specialist with advanced VS Code integration for data science workflows'
tools:  [
    'codebase-usages',
    'notebook-guru',
    'extensions',
    'fetch',
    'findTestFiles',
    'runCommands',
    'search',
    'vscodeAPI',
    'copilotCodingAgent',
  ]
---

# Edit Jupyter notebooks with AI in VS Code

<!-- Visual Studio Code supports working with [Jupyter notebooks](/docs/datascience/jupyter-notebooks.md) natively, and through [Python code files](/docs/python/jupyter-support-py.md). The AI features in VS Code can help you create, edit, and analyze notebooks efficiently. -->

## Create new notebooks

Use AI to quickly scaffold notebooks with the right structure and libraries for your task.

**How to start:**
- Open Chat view and use `/newNotebook` command (ask mode)
- Or simply describe what you need: *"Create a notebook to analyze sales data from CSV"*
- Use [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) to create and run notebooks automatically

**Example prompts:**
- *Create a Jupyter notebook to read and visualize #data.csv*
- */newNotebook using pandas and matplotlib to analyze time series data*
- *Create a notebook to train a classification model on iris dataset. Run all cells.* (agent mode)

The AI will create a new `.ipynb` file with appropriate imports, markdown documentation, and code cells ready to run.

## Edit cells inline

Make quick changes within individual cells using inline chat.

**How to use:**
1. Press `kb(notebook.cell.chat.start)` in any cell
2. Type your request
3. Review changes and **Accept** or **Accept and Run**

**Tips:**
- Reference variables with `#` - like `#df` to reference a dataframe
- Generate new cells by pressing `kb(notebook.cell.chat.start)` outside any cell
- Right-click for **Copilot** > **Editor Inline Chat** option

## Transform multiple cells

Use [edit mode](vscode://GitHub.Copilot-Chat/chat?mode=edit) or [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) for changes across your entire notebook.

**Common transformations:**
- *Switch from matplotlib to plotly for all visualizations*
- *Add data validation before each processing step*
- *Convert all prints to proper logging*
- *Add error handling to all cells*

Edit mode shows proposed changes with navigation controls. Agent mode makes changes autonomously and can run cells to verify they work.

## Analyze notebook content

Get explanations and insights about your code, data, and visualizations.

**Ask about outputs:**
1. Switch to [ask mode](vscode://GitHub.Copilot-Chat/chat?mode=ask)
2. Click `...` next to any output/chart
3. Select **Add Cell Output to Chat**
4. Ask questions: *"Explain this correlation matrix"* or *"What patterns do you see?"*

**Useful questions:**
- *Why is this cell slow?*
- *What does this error mean?*
- *How can I optimize this data processing?*
- *Is there a more efficient approach?*

## Perform complete analysis

Let agent mode handle entire data science workflows autonomously.

**What agent mode can do:**
- Read and explore datasets
- Clean and prepare data
- Generate visualizations
- Perform statistical analysis
- Create ML pipelines
- Document findings

**Example workflow:**
```
You: Perform complete analysis of #housing.csv
Agent: [Creates notebook, loads data, generates statistics, creates visualizations, identifies patterns, documents insights]
```

Agent mode will request permission to run commands and cells, iterating until the analysis is complete.

## Custom chat modes

> [!NOTE]
> Available in VS Code 1.101+ (preview feature)

Create specialized AI configurations for specific notebook workflows.

### Create a chat mode

1. Create a file ending in `.chatmode.md`
2. Add configuration and instructions:

```markdown
---
description: Data analysis specialist for exploring datasets
tools: ['codebase', 'search', 'runCommands']
model: GPT-4
---

You are a data exploration specialist. When given a dataset:
1. Load and show basic statistics
2. Check for missing values and data quality issues  
3. Generate distribution plots for numeric columns
4. Identify correlations and patterns
5. Suggest next analysis steps
```

3. Save in workspace (shared) or user profile (personal)
4. Select your mode from the chat dropdown

### Useful chat mode examples

**Statistical Analysis Mode:**
```markdown
---
description: Statistical testing and hypothesis validation
tools: ['codebase', 'search']
---
Focus on statistical rigor: proper tests, assumptions validation, 
effect sizes, and confidence intervals. Always check test assumptions first.
```

**ML Development Mode:**
```markdown
---
description: Machine learning pipeline development
tools: ['codebase', 'runCommands', 'search']
---
Build robust ML pipelines: proper train/test splits, cross-validation,
hyperparameter tuning, and model evaluation metrics. Document model choices.
```

## Tips for effective notebook AI

**Be specific with context:**
- Reference files with `#filename`
- Reference variables with `#variable_name`
- Include cell outputs when asking questions

**Choose the right mode:**
- **Ask mode**: Questions and explanations
- **Edit mode**: Code modifications with preview
- **Agent mode**: Autonomous completion of complex tasks

**Iterate naturally:**
- Start with high-level requests
- Follow up with refinements
- Let agent mode handle tedious tasks

The AI adapts to your notebook's content and can help with everything from initial exploration to production-ready analysis pipelines.
