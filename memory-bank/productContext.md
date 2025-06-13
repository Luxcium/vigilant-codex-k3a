# productContext.md
<!-- markdownlint-disable MD013 MD022 MD032 MD041 -->

## Purpose
This file explains the underlying motivation, intended outcomes, and user experience goals for any project. It provides context for why the project exists and how it should function, independent of any specific topic at initialization.

## Structure
- **Why:** The rationale for the project’s existence.
- **Problems to Solve:** General challenges or needs addressed.
- **How It Should Work:** Principles for operation and user experience.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Why

This Memory Bank is established to ensure every project begins with a clear understanding of its purpose and intended impact. It is designed to be updated as soon as a project context is defined.

## Problems to Solve

- Lack of clear, replicable documentation for new projects.
- Difficulty onboarding new agents or contributors.
- Inconsistent understanding of project goals and user needs.

## How It Should Work

- Documentation must be clear, concise, and accessible to all agents.
- User experience goals should be defined and updated as the project evolves.
- All contributors must align on the intended outcomes before proceeding with implementation.
- See [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md) for script-driven setup requirements.

### Example UX Flow

1. User selects a project template.
2. Scripts generate the directory structure and placeholder documentation.
3. User reviews generated files and updates details.

## Dependencies and Relationships

- **Depends On:** [projectbrief.md](./projectbrief.md), [systemPatterns.md](./systemPatterns.md)
- **Required By:** [activeContext.md](./activeContext.md), [progress.md](./progress.md)
- **Why This Order:** productContext.md defines purpose before architecture or progress can be tracked.
- **Impact Analysis:** If outdated, user goals may diverge from implementation, leading to rework.

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as soon as a project context is established.**  
> **Do not proceed with project-specific design or development until this file is aligned with the current project context.**  
> **Update this file immediately upon any change in project goals or user experience requirements.**

**See [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), [.clinerules/writing-protocol.md](../.clinerules/writing-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols.**

---
