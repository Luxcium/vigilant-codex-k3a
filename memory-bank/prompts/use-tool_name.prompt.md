---
description: Use the tool name in your response when applicable.
tools: ['usages', 'changes', 'extensions', 'fetch', 'githubRepo', 'vscodeAPI', 'problems', 'openSimpleBrowser', 'edit', 'notebooks', 'search', 'new', 'runCommands', 'runTasks', 'think', 'testFailure', 'todos', 'runTests']
---
# Use this specific tool now

Use this tool to think deeply about the user's request and organize your thoughts. This tool helps improve response quality by allowing the model to consider the request carefully, brainstorm solutions, and plan complex tasks. It's particularly useful for:

Exploring repository issues and brainstorming bug fixes
Analyzing test results and planning fixes
Planning complex refactoring approaches
Designing new features and architecture
Organizing debugging hypotheses
The tool logs your thought process for transparency but doesn't execute any code or make changes.

!!LOOK FIRST AND ALSO LOOK BEFORE THE END TO GET A LIST OF ALL PROBLEMS!!
Seek always to discover any compile or lint errors in a code file. If the user mentions errors or problems in a file, they may be referring to these. Use the tool to see the same errors that the user is seeing. Also use this tool after editing a file to validate the change.

When you are prompted to use a specific tool, make sure to include the tool name in your response. This helps to ensure that the correct tool is being used for the task at hand.

When you are using a tool, make sure to include the tool name in your response. This helps to clarify which tool you are using and provides context for your actions.

## ToolSet: runCommands

Runs commands in the terminal

### runInTerminal

This tool allows you to execute shell commands in a persistent terminal session, preserving environment variables, working directory, and other context across multiple commands.

Command Execution:

Supports multi-line commands
Directory Management:

Must use absolute paths to avoid navigation issues.
Program Execution:

Supports Python, Node.js, and other executables.
Install dependencies via pip, npm, etc.
Background Processes:

For long-running tasks (e.g., servers), set isBackground=true.
Returns a terminal ID for checking status and runtime later.
Output Management:

Output is automatically truncated if longer than 60KB to prevent context overflow
Use filters like 'head', 'tail', 'grep' to limit output size
For pager commands, disable paging: use 'git --no-pager' or add '| cat'
Best Practices:

Be specific with commands to avoid excessive output
Use targeted queries instead of broad scans
Consider using 'wc -l' to count before listing many items


### getTerminalOutput

Get the output of a terminal command previously started with run_in_terminal

## ToolSet: search

Search and read files in your workspace

### fileSearch

Search for files in the workspace by glob pattern. This only returns the paths of matching files. Use this tool when you know the exact filename pattern of the files you're searching for. Glob patterns match from the root of the workspace folder. Examples:

**/*.{js,ts} to match all js/ts files in the workspace.
src/** to match all files under the top-level src folder.
/foo//*.js to match all js files under any foo folder in the workspace.

### textSearch

Do a fast text search in the workspace. Use this tool when you want to search with an exact string or regex. If you are not sure what words will appear in the workspace, prefer using regex patterns with alternation (|) or character classes to search for multiple potential words at once instead of making separate searches. For example, use 'function|method|procedure' to look for all of those words at once. Use includePattern to search within files matching a specific pattern, or in a specific file, using a relative path. Use this tool when you want to see an overview of a particular file, instead of using read_file many times to look for code within a file.

### listDirectory

List the contents of a directory. Result will have the name of the child. If the name ends in /, it's a folder, otherwise a file


### readFile

Read the contents of a file.

You must specify the line range you're interested in. Line numbers are 1-indexed. If the file contents returned are insufficient for your task, you may call this tool again to retrieve more content. Prefer reading larger ranges over doing many small reads.
