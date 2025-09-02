
# Consolidation Plan

- `scripts/README.md` (original, has lint errors)
- `scripts/README.sync.md`
- `scripts/README.rewrite.md`
- `scripts/README.synced.md`
- `scripts/README.final.md`
- `scripts/README.consolidated.md`

- `memory-bank/README.sync.md`
- `memory-bank/README.consolidated.md`

- Similar duplicates in `memory-bank/instructions/`, `memory-bank/prompts/`, `memory-bank/chatmodes/`

## Solution

### Step 1: Replace Main READMEs

Replace the broken originals with the consolidated, lint-clean versions:

```bash
# Backup originals
mv scripts/README.md scripts/README.old.md
mv memory-bank/instructions/README.md memory-bank/instructions/README.old.md
mv memory-bank/prompts/README.md memory-bank/prompts/README.old.md

# Install consolidated versions (add missing newline)
cp scripts/README.consolidated.md scripts/README.md
echo "" >> scripts/README.md

cp memory-bank/README.consolidated.md memory-bank/README.md
echo "" >> memory-bank/README.md

# Update subfolder READMEs (these need to be created)
# memory-bank/instructions/README.md - consolidated instructions overview
# memory-bank/prompts/README.md - consolidated prompts overview
# memory-bank/chatmodes/README.md - consolidated chatmodes overview
```

### Step 2: Remove All Sync/Variant Files

```bash
# Remove all the .sync, .rewrite, .synced, .final variants
rm scripts/README.sync.md scripts/README.rewrite.md scripts/README.synced.md scripts/README.final.md scripts/README.consolidated.md
rm memory-bank/README.sync.md memory-bank/README.consolidated.md
rm memory-bank/instructions/README.sync.md
rm memory-bank/prompts/README.sync.md
rm memory-bank/chatmodes/README.sync.md
rm memory-bank/AUDIT.sync.md
```

### Step 3: Create Missing READMEs

The subfolder READMEs need to be created from scratch, consolidating the good content from the sync versions.

## Result

- One `README.md` per directory group
- All lint-clean and properly formatted
- No duplicate or variant README files
- Clear, authoritative documentation for each section
