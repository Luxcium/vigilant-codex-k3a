---
applyTo: '**/README.md'
description: 'Standards for maintaining, updating, and cross-referencing README files in all project folders.'
---

# README Maintenance and Cross-Referencing Standards

## General Principles

- Ensure every folder with project logic, scripts, or data has a README.md describing its purpose and contents.
- Use the folder name as a prefix when referencing or listing README files to avoid ambiguity.

## Update Workflow

- When a folder’s contents or purpose changes, update its README.md immediately.
- Cross-reference related folders and their README files using relative links.
- If a README references another, ensure the referenced README is up-to-date and accurate.

## Periodic Review

- Review all README.md files at least once per release cycle.
- Check for outdated information, broken links, and missing cross-references.
- Document the review date and reviewer in each README (e.g., “Last reviewed: YYYY-MM-DD by @username”).

## Documentation Consistency

- Use consistent section headings: Overview, Structure, Usage, Related Folders, and References.
- For folders like scripts/, src/, web/, python/, etc., outline the main responsibilities and entry points.
- For data or template folders, describe the template structure and intended usage.

## Quality Assurance

- Validate that every README.md is discoverable and referenced from the main project README.
- Ensure all README.md files are included in documentation audits and CI checks.
