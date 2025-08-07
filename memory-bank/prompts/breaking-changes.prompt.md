# Breaking Changes Guide (Concise)

## Required Format

- Indicate breaking changes in two places:
  1.  Add `!` before the colon in the subject line
  2.  Add a `BREAKING CHANGE:` footer with details
- Use gitmoji to reflect the nature of the change

### Example

```
feat(api)!: :boom: remove legacy user endpoints

BREAKING CHANGE: All v1 user endpoints have been removed. Use v2 endpoints instead.
```

## Migration & Documentation

- Always provide migration instructions in the commit footer
- Update documentation and release notes
- Major version bump required

## Good Commit Example

```
feat(auth)!: :boom: update authentication method signature

BREAKING CHANGE: authenticate() now requires an options object instead of separate parameters.
Before: authenticate(username, password, remember)
After: authenticate({ username, password, rememberMe })
```

## Summary Checklist

- Document the change and why
- Provide migration path
- Major version bump
- Update docs/release notes

## Best Practice

- Be specific and helpful
- Include migration steps
- Avoid vague messages

## References

- [conventional-commits-must-be-used](../instructions/conventional-commits-must-be-used.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
