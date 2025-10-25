# Progress Maintenance Protocol

## Purpose

Ensure `memory-bank/progress.md` remains accurate, concise, and synchronized with repository reality so every agent inherits a trustworthy status snapshot.

## When to Use

- Before and after any change that affects repository status, automation, or documentation metrics.
- Whenever progress entries mention counts, achievements, or blockers that might drift over time.

## Required Actions

1. **Read Context First**
   - Review `projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, and `techContext.md` for scope alignment.
   - Skim the latest archive entry referenced by `progress.md` to avoid duplicating historical narrative.

2. **Verify Repository Facts**
   - Run explicit counts before logging numbers:
     - `find scripts -maxdepth 1 -type f | wc -l`
     - `find memory-bank/instructions -maxdepth 1 -type f | wc -l`
     - `find memory-bank/prompts -maxdepth 1 -type f | wc -l`
   - Confirm automation state (e.g., `.github/workflows/`, sandbox scripts) before claiming CI coverage.
   - Record command outputs in the working notes so citations remain traceable.

3. **Update Progress Deliberately**
   - Follow the canonical section order: Purpose, Structure, What Works, What’s Left, Current Status, Known Issues, Historical Archive, Dependencies, Call to Action.
   - Keep `What Works` limited to capabilities verifiable in the current commit.
   - Move superseded content into a dated file under `memory-bank/archives/` before shortening the main document.

4. **Cross-File Synchronization**
   - Reflect shifting priorities in `memory-bank/activeContext.md` and any affected instruction files.
   - If new automation or policies are introduced, add or update the relevant instruction/prompts and cite them from `progress.md`.

5. **Self-Healing Loop**
   - After editing, re-read `progress.md` to confirm no mojibake, broken links, or outdated references remain.
   - Document unresolved blockers in `Known Issues` with actionable next steps and assign follow-up owners when possible.

## Validation Checklist

- [ ] Counts cited in `progress.md` match fresh command output.
- [ ] Historical content removed from the active file is archived with a timestamped filename.
- [ ] `activeContext.md` reflects any change in focus highlighted by the progress update.
- [ ] Citations or references in the pull request message point to the updated sections.
- [ ] No section is left empty; if nothing new exists, explicitly state "No change since <date>".

## Call to Action

Every agent modifying progress must execute this protocol end-to-end. If any checklist item cannot be satisfied, pause the change, document the blocker under `Known Issues`, and notify the human lead.
