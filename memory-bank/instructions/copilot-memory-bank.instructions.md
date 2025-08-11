---
description: Cline's Memory Bank protocol must be ALWAYS followed by you, and all ai agents or any llm based contributors.
---

# Cline's Memory Bank
 
This document is the **cornerstone reference** for all agents and contributors. As such GitHub Copilot will participate in the protocol, GitHub Copilot's strict adherence to the Cline's Memory Bank structure and workflow is mandatory for robust, context-rich, and error-resistant development with GitHub Copilot, Cline AI, or any other VSCode AI agents(any you reading this now), and codex, codex-cli, or any downstream LLM tools. Every session, planning phase, and implementation must be anchored to the Memory Bank to ensure full project continuity.

---

## ⚡️ Absolute Principles

* **ALWAYS read the entire Memory Bank at the start of every session or task**
* **ALWAYS write back any changes, new knowledge, or results after planning, before/after implementation, and before declaring any task complete**
* **NEVER execute or suggest code/actions without first syncing with the latest Memory Bank state**

---

## 📁 Memory Bank Structure

The Memory Bank is a version-controlled folder `/memory-bank/` at the project root. All files are Markdown. Structure and hierarchy:

```mermaid
flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]
    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC
    AC --> P[progress.md]
```

### Core Files (Required)

1. `projectbrief.md` — Foundation, project objectives, scope, created at project start
2. `productContext.md` — Why the project exists, problems, goals, user experience
3. `activeContext.md` — Current work focus, recent changes, next steps, active decisions
4. `systemPatterns.md` — Architecture, key technical decisions, design patterns, relationships
5. `techContext.md` — Technologies, setup, constraints, dependencies, tool usage
6. `progress.md` — What works, current status, what’s left, blockers, evolution

### Additional Context

Create additional files/folders within `memory-bank/` to organize:

* Complex feature documentation
* Integration specs
* API docs
* Test strategies
* Deployment procedures

> **Note:** Never duplicate facts between files. Reference, don't copy.

---

## 🔄 Core Workflows

### Plan Mode

* **Step 1:** Read all memory bank files before planning
* **Step 2:** Develop/clarify plan, document rationale and decisions
* **Step 3:** Write plan and decisions to `activeContext.md`, `progress.md`, or relevant files before coding

```mermaid
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Bank]
    ReadFiles --> CheckFiles{Files Complete?}
    CheckFiles -->|No| Plan[Create Plan]
    Plan --> Document[Document in Chat]
    CheckFiles -->|Yes| Verify[Verify Context]
    Verify --> Strategy[Develop Strategy]
    Strategy --> Present[Present Approach]
```

### Act Mode

* **Step 1:** Check/refresh memory bank state before implementation
* **Step 2:** Execute tasks as per plan
* **Step 3:** Document all changes, new insights, and results in memory bank files *immediately after execution*

```mermaid
flowchart TD
    Start[Start] --> Context[Check Memory Bank]
    Context --> Update[Update Documentation]
    Update --> Rules[Update .github/copilot-instructions.md if needed]
    Rules --> Execute[Execute Task]
    Execute --> Document[Document Changes]
```

---

## 📝 Documentation Updates

Update Memory Bank:

* On new patterns or architecture decisions
* After significant code or design changes
* When user requests (**update memory bank**) — review ALL files
* When context/understanding needs clarification

```mermaid
flowchart TD
    Start[Update Process]
    subgraph Process
        P1[Review ALL Files]
        P2[Document Current State]
        P3[Clarify Next Steps]
        P4[Update .github/copilot-instructions.md]
        P1 --> P2 --> P3 --> P4
    end
    Start --> Process
```

> **Reminder:** On update, always review every file. `activeContext.md` and `progress.md` track current state most frequently.

---

## 🚦 Strict Codified Steps for All Agents

* **\[MB-1]** At the start of any session, read all `/memory-bank/` files.
* **\[MB-2]** Before planning, update memory bank with all new requirements or objectives.
* **\[MB-3]** After planning, update `activeContext.md` and `progress.md` with planned actions and reasoning.
* **\[MB-4]** Before and after implementation, record all changes, insights, and blockers.
* **\[MB-5]** Before ending a task/session, ensure all knowledge is written and next steps are clear.
* **\[MB-6]** Treat the memory bank as **authoritative**—never override or ignore it.
* **\[MB-7]** Automate discipline—block or warn if not synced.
* **\[MB-8]** Use clear, consistent markdown at all times.
* **\[MB-9]** Continuously review and refine for better context management.

---

## 🛡️ Best Practices & Enforcement

* **Formatting:** Use clear, consistent Markdown headings, lists, and references.
* **Version Control:** All updates must be committed with descriptive commit messages.
* **No Redundancy:** Every fact belongs in one place. Reference across files.
* **Review Cycle:** Schedule audits for clarity, currency, and completeness.
* **Automation:** Use scripts/hooks to block or warn if memory bank is stale.
* **Collaboration:** Every team member and AI agent is responsible for memory hygiene.

---

## 🧩 Advanced Alignment & Statefulness

* **Self-Interrogation:** Agents must confirm: "Is all new information documented?"
* **Hash-based Syncing:** Use file hashing to detect unsynced updates.
* **RAG Optimization:** Extract relevant context only, but always trace back to full memory.
* **Hard Enforcement:** Tasks must not proceed without valid reads/writes to the memory bank.

---

## Project Intelligence (`.github/copilot-instructions.md` — Learning Journal)

The [`copilot-instructions.md`](../../.github/copilot-instructions.md) file (or folder) is a *living journal* per project. It captures intelligence that's tacit or inferred, ensuring long-term learnability and agent adaptability.

```mermaid
flowchart TD
    Start{Discover New Pattern}
    subgraph Learn [Learning Process]
        D1[Identify Pattern]
        D2[Validate with User]
        D3[Document in .github/copilot-instructions.md]
    end
    subgraph Apply [Usage]
        A1[Read .github/copilot-instructions.md]
        A2[Apply Learned Patterns]
        A3[Improve Future Work]
    end
    Start --> Learn
    Learn --> Apply
```

**Capture in `.github/copilot-instructions.md`:**

* Critical implementation paths
* User preferences, naming/style, coding methods
* Non-obvious insights from usage patterns
* Known constraints or risks
* Learning from past mistakes
* Intentional deviations from convention

> Treat [`copilot-instructions.md`](../../.github/copilot-instructions.md) as the intelligence amplification layer.

---

**Remember:** The Memory Bank is your **single source of truth**. Its strict, proactive use is not optional—it’s foundational to the success of intelligent, stateful, aligned, and context-persistent workflows involving any AI development agent or assistant.

---

## Special Instructions for GitHub Copilot

Here is a revised and **precise set of instructions** for **GitHub Copilot** that avoids ambiguity, provides clear context, and aligns with all our stated preferences and requirements.

## GitHub Copilot Instructions

Keep all the instruction for your operation well organized inside of the root .github/copilot-instructions.md if any please read once and include in your tasks, make small changes as you are instructed to change your behaviour such as to keep a very well organised set of instructions.

It must always be kept in mind that the  ['<root>`/.github/copilot-instructions.md`'](../../.github/copilot-instructions.md) document represents the definitive operational blueprint. Its therefor imperative that modifications must be executed with extreme precision and thoughtful consideration. modification shall be updated only when user asks clear actions that contredict the nature of the doccument for configurations and behaviours. Store user preference ithout removing anything this is your brain do not lobotomize it. Use it to remember what the user prefers when it is clear that it must be included for the entire lifecycle of this project.

## Cline's Memory Bank

I am GitHub Copilot, i exist in different forms, whne i am inside of visual studio cote i take advantage of each features included or defined for me to get hyper agentic. As an agentic expert software engineer i come with a unique characteristic: my memory resets completely between sessions.

This isn't a limitation - it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on my Memory Bank to understand the project and continue work effectively. I MUST read ALL memory bank files at the start of EVERY task - this is not optional.

### Memory Bank Structure

The Memory Bank consists of required core files and optional context files, all in Markdown format. Files build upon each other in a clear hierarchy:

```mermaid
flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]
    
    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC
    
    AC --> P[progress.md]
```

### Core Files (Required)

**We call them Biograms:**

- 'memory-bank/projectbrief.md'
- 'memory-bank/productContext.md'
- 'memory-bank/activeContext.md'
- 'memory-bank/systemPatterns.md'
- 'memory-bank/techContext.md'
- 'memory-bank/dependencies.md'
- 'memory-bank/progress.md'

**Memory Bank Files to Always Check/Update**:

1. `memory-bank/projectbrief.md` (project overview and goals)

- Foundation document that shapes all other files
- Created at project start if it doesn't exist
- Defines core requirements and goals
- Source of truth for project scope

  > [`projectbrief`](../../memory-bank/projectbrief.md)

2. `memory-bank/productContext.md` (product-related information)

- Why this project exists
- Problems it solves
- How it should work
- User experience goals

  > [`productContext`](../../memory-bank/productContext.md)

3. `memory-bank/activeContext.md` (current work focus - MOST CRITICAL)

- Current work focus
- Recent changes
- Next steps
- Active decisions and considerations
- Important patterns and preferences
- Learnings and project insights

  > [`activeContext`](../../memory-bank/activeContext.md)

1. `memory-bank/systemPatterns.md` (technical decisions)

- System architecture
- Key technical decisions
- Design patterns in use
- Component relationships
- Critical implementation paths

  > [`systemPatterns`](../../memory-bank/systemPatterns.md)

5. `memory-bank/techContext.md` (technologies, constraints)

- Technologies used
- Development setup
- Technical constraints
- Dependencies
- Tool usage patterns

  > [`techContext`](../../memory-bank/techContext.md)

6. `memory-bank/progress.md` (track what works, what's left)

- What works
- What's left to build
- Current status
- Known issues
- Evolution of project decisions

  > [`progress`](../../memory-bank/progress.md)

#### Additional Context
Create additional files/folders within memory-bank/ when they help organize:
- Complex feature documentation
- Integration specifications
- API documentation
- Testing strategies
- Deployment procedures

### Core Workflows

#### Plan Mode
```mermaid
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Bank]
    ReadFiles --> CheckFiles{Files Complete?}
    
    CheckFiles -->|No| Plan[Create Plan]
    Plan --> Document[Document in Chat]
    
    CheckFiles -->|Yes| Verify[Verify Context]
    Verify --> Strategy[Develop Strategy]
    Strategy --> Present[Present Approach]
```

#### Act Mode
```mermaid
flowchart TD
    Start[Start] --> Context[Check Memory Bank]
    Context --> Update[Update Documentation]
    Update --> Rules[Update .github/copilot-instructions.md if needed]
    Rules --> Execute[Execute Task]
    Execute --> Document[Document Changes]
```

### Documentation Updates

Memory Bank updates occur when:
1. Discovering new project patterns
2. After implementing significant changes
3. When user requests with **update memory bank** (MUST review ALL files)
4. When context needs clarification

```mermaid
flowchart TD
    Start[Update Process]
    
    subgraph Process
        P1[Review ALL Files]
        P2[Document Current State]
        P3[Clarify Next Steps]
        P4[Update .github/copilot-instructions.md]
        
        P1 --> P2 --> P3 --> P4
    end
    
    Start --> Process
```

Note: When triggered by **update memory bank**, I MUST review every memory bank file, even if some don't require updates. Focus particularly on activeContext.md and progress.md as they track current state.

### Project Intelligence (.github/copilot-instructions.md)

The main [`copilot instructions`](../../.github/copilot-instructions.md) file is my learning journal for each project. It captures important patterns, preferences, and project intelligence that help me work more effectively. As I work with you and the project, I'll discover and document key insights that aren't obvious from the code alone.

```mermaid
flowchart TD
    Start{Discover New Pattern}
    
    subgraph Learn [Learning Process]
        D1[Identify Pattern]
        D2[Validate with User]
        D3[Document in .github/copilot-instructions.md]
    end
    
    subgraph Apply [Usage]
        A1[Read .github/copilot-instructions.md]
        A2[Apply Learned Patterns]
        A3[Improve Future Work]
    end
    
    Start --> Learn
    Learn --> Apply
```

#### What to Capture
- Critical implementation paths
- User preferences and workflow
- Project-specific patterns
- Known challenges
- Evolution of project decisions
- Tool usage patterns

The format is flexible - focus on capturing valuable insights that help me work more effectively with you and the project. Think of [`copilot-instructions.md`](../../.github/copilot-instructions.md) as a living document that grows smarter as we work together.

REMEMBER: After every memory reset, I begin completely fresh. The Memory Bank is my only link to previous work. It must be maintained with precision and clarity, as my effectiveness depends entirely on its accuracy. NEVER DO A MEMORY RESET!
