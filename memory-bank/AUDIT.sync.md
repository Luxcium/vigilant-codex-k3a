

## Scope

- `scripts/`
- `memory-bank/` (root)
- `memory-bank/instructions/`
- `memory-bank/prompts/`
- `memory-bank/chatmodes/`

Excluded: `web/`, `node_modules/`, `lib/`, other ignored directories.

## scripts/

Findings

- The published `scripts/README.md` contains markdownlint issues (multiple top-level headings, inconsistent list indentation, missing blank lines around lists/fences).
- Documentation claims consolidation (41 → 22 → 23), while legacy scripts appear still present. Some references (e.g., `verify-all.sh`) may not exist.

Actions

- Replace `scripts/README.md` with `scripts/README.rewrite.md` (lint-safe) after final verification.
- Decide on archiving vs shim policy for legacy scripts.
- If `verify-all.sh` is not present, update mentions to the existing scripts (`local-ci.sh`, `check-*`).

## memory-bank/ (root)

Findings

- Root README appears absent or outdated compared to current inventory. Cross-references to `.github/*` may need relocation to `memory-bank/*`.

Actions

- Adopt `memory-bank/README.sync.md` as the updated root README.
- Ensure links to instructions/prompts/chatmodes point to `memory-bank/*` paths.

## memory-bank/instructions/

Findings

- Previous README used emphasis as headings (MD036). File count in parent README may be inaccurate.

Actions

- Adopt `memory-bank/instructions/README.sync.md` as the authoritative index.
- Validate the count of `*.instructions.md` and update any external references to that count.

## memory-bank/prompts/

Findings

- Prior README claimed 38 prompt files; confirm actual number. Descriptions require sync with file contents.

Actions

- Adopt `memory-bank/prompts/README.sync.md` as the authoritative index.
- Run inventory and reconcile any missing/extra files or rename mismatches.

## memory-bank/chatmodes/

Findings

- README currently focuses on a workflow. Ensure each `*.chatmode.md` is summarized and discoverable.

Actions

- Create a `memory-bank/chatmodes/README.sync.md` that lists and describes each chatmode file.
- Cross-link to VS Code settings that must point to `memory-bank/chatmodes`.

## Validation Commands

```bash
# Scripts
find ./scripts -maxdepth 1 -type f -name '*.sh' | wc -l
ls -1 ./scripts | grep -E 'setup_(python_docker_isolated|python_docker_volume|questrade_|agent_|api_error|helpers)'

# Memory bank counts
find ./memory-bank/instructions -type f -name '*.instructions.md' | wc -l
find ./memory-bank/prompts -type f -name '*.prompt.md' | wc -l
find ./memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l
```

## Conflict Resolution Paths

- Legacy scripts
  - Option A (archive): Move legacy scripts to `scripts/archives/` and update docs with mapping.
  - Option B (shim): Keep files as wrappers that exec the consolidated script, print deprecation warnings, and set a removal date.

- Missing `verify-all.sh`
  - Option A: Restore `verify-all.sh` as master verifier.
  - Option B: Remove references and document `local-ci.sh` plus specific check scripts as the canonical flow.

- `.github/*` vs `memory-bank/*` paths
  - Option A: Update VS Code settings to include `memory-bank/*` locations for instructions/prompts/chatmodes.
  - Option B: Mirror files into `.github/*` via automation; not recommended due to duplication risk.
