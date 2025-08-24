---
description: 'Guide for updating and reviewing README files across all project folders.'
tools: []
---
# README Update and Review Prompt

## Step-by-Step Workflow

1. **Identify All Folders**
   - List all folders in the project root and submodules that should have a README.md.

2. **Check for README.md Presence**
   - For each folder, verify if README.md exists. If missing, create one using the standard template.

3. **Review and Update Content**
   - Read the current README.md.
   - Update the Overview, Structure, Usage, and References sections as needed.
   - Add or update cross-references to related folders and their README files.

4. **Cross-Reference Validation**
   - For every link to another README, open and review the target README for accuracy and completeness.

5. **Document Review**
   - Add a “Last reviewed” line at the end of each README with the current date and reviewer.

6. **Repeat for All Folders**
   - Continue until all relevant folders are covered and all README files are coherent and up-to-date.

7. **Periodic Audit**
   - Schedule periodic audits (e.g., every release) to repeat this process.

## Self-Documentation Protocol

To ensure this process is transparent and repeatable, document every action taken during the README update and review process:

1. **Log Updates**
   - Record each README file reviewed or updated in `memory-bank/progress.md`.
   - Include details such as the folder name, changes made, and the date of the update.

2. **Track Dependencies**
   - If a README references another file or folder, update `memory-bank/dependencies.md` to reflect this relationship.

3. **Maintain Active Context**
   - Update `memory-bank/activeContext.md` with the current focus of the README review process.

4. **Periodic Review Logs**
   - Document periodic audits in `memory-bank/progress.md`, noting the date, scope, and outcomes of the review.

By following this protocol, the README update and review process remains consistent, traceable, and aligned with the project's self-managing principles.

## Output

- A project where every folder’s README is current, cross-referenced, and unambiguous.
- A main README that links to all subfolder READMEs for easy navigation.

## References

- [readme-maintenance](../instructions/readme-maintenance.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
