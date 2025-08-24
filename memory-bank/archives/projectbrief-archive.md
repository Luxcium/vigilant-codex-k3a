# projectbrief-archive.md

## Purpose
Archive historical changes and deprecated narrative sections from projectbrief.md to keep the core brief concise while preserving full historical context.

## Structure
- Archived Entries
- Dependencies and Relationships
- Call to Action
- Metadata

---

## Archived Entries

### [2025-07-27] Radical Documentation Refactor: Memory Bank Migration
All instructions, prompts, and chatmodes were migrated from the legacy `.github/` location to:
- `memory-bank/instructions/`
- `memory-bank/prompts/`
- `memory-bank/chatmodes/`

The Copilot entry point intentionally remains `.github/copilot-instructions.md` for compatibility with official VS Code tooling.

#### Rationale
- Centralize stateful AI operational assets
- Improve discoverability and cross-referencing
- Reduce duplication and drift between agent contexts

#### Impact
- Updated cross-file references across Memory Bank
- Introduced formal archive and consolidation strategy
- Established authoritative root-contexts listing in `root-contexts.md`

---

## Dependencies and Relationships
- **Referenced By:** projectbrief.md (Historical Changes Archive reference)
- **Related Files:** root-contexts.md, systemPatterns.md, techContext.md
- **Impact Analysis:** Adjustments here do not affect active workflows unless explicitly re-surfaced into the core brief.

## Call to Action
> Do not modify archived entries except to append errata. New foundational shifts belong in a new dated sub-section.

---

**Last Updated:** 2025-11-08 | **Status:** Archive Initialized | **Scope:** Foundational History Preservation
