# Git Hooks and Automation

This prompt file contains information about git hooks and automation for conventional commits.

## Commit Message Validation

### Local Git Hook (commit-msg)

Create `.git/hooks/commit-msg` to validate commit messages locally:

```bash
#!/usr/bin/env bash

# Commit message validation hook
commit_regex='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: :.+: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
  echo "❌ Invalid commit message format!"
  echo ""
  echo "Required format: <type>[(<scope>)]: <:gitmoji:> <description>"
  echo ""
  echo "Examples:"
  echo "  feat(auth): :sparkles: add OAuth2 support"
  echo "  fix(ui): :bug: correct responsive layout"
  echo "  docs: :memo: update README"
  echo ""
  echo "❗ GITMOJI IS MANDATORY - NO EXCEPTIONS"
  exit 1
fi

# Check for gitmoji presence
if ! grep -q ':.*:' "$1"; then
  echo "❌ Missing gitmoji!"
  echo "Every commit MUST include a gitmoji"
  echo "See: memory-bank/prompts/gitmoji-complete-list.prompt.md"
  exit 1
fi
```

Make it executable:

```bash
chmod +x .git/hooks/commit-msg
```

### Server-side Pre-receive Hook

For repository-wide enforcement:

```bash
#!/usr/bin/env bash

# Pre-receive hook for commit message validation
commit_msg_regex='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: :.+: .{1,100}'
gitmoji_regex=':([a-z_]+):'

zero_commit="0000000000000000000000000000000000000000"
error=""

while read oldrev newrev refname; do
  if [ "$newrev" = "$zero_commit" ]; then
    continue
  fi

  if [ "$oldrev" = "$zero_commit" ]; then
    rev_span=$(git rev-list $newrev --not --all)
  else
    rev_span=$(git rev-list $oldrev..$newrev --not --all)
  fi

  for commit in $rev_span; do
    commit_msg=$(git show -s --format=%s $commit)

    if ! [[ "$commit_msg" =~ $commit_msg_regex ]]; then
      echo "❌ Invalid commit format: $commit" >&2
      echo "Message: $commit_msg" >&2
      error="true"
    fi

    if ! [[ "$commit_msg" =~ $gitmoji_regex ]]; then
      echo "❌ Missing gitmoji: $commit" >&2
      echo "Message: $commit_msg" >&2
      error="true"
    fi
  done
done

if [ -n "$error" ]; then
  echo "" >&2
  echo "🚫 COMMIT REJECTED - Fix format and try again" >&2
  echo "Required: <type>[(<scope>)]: <:gitmoji:> <description>" >&2
  exit 1
fi
```

## Automated Tools

### Git Conventional Commits CLI

Install and configure:

```bash
npm install -g git-conventional-commits

# Create config file
echo '{
  "convention": {
    "commitTypes": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore"],
    "commitScopes": [],
    "releaseTagGlobPattern": "v[0-9]*.[0-9]*.[0-9]*"
  }
}' > .gccrc
```

Usage:

```bash
# Interactive commit
git-conventional-commits commit

# Version bump
git-conventional-commits version

# Generate changelog
git-conventional-commits changelog
```

### Commitizen

Setup for interactive commits:

```bash
npm install -g commitizen cz-conventional-changelog

# Initialize
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

Usage:

```bash
git add .
git cz # Interactive commit prompt
```

### Husky + Commitlint

Package.json setup:

```json
{
  "devDependencies": {
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "husky": "^8.0.0"
  },
  "scripts": {
    "prepare": "husky install"
  }
}
```

Commitlint config (`.commitlintrc.js`):

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 10],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
```

Husky hook:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

## GitHub Actions

### Commit Message Validation

`memory-bank/workflows/validate-commits.yml`:

```yaml
name: Validate Commits

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Validate commit messages
        run: |
          # Check each commit in the PR
          for commit in $(git rev-list origin/main..HEAD); do
            message=$(git show -s --format=%s $commit)
            
            # Check conventional format
            if ! echo "$message" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: :.+: .{1,100}'; then
              echo "❌ Invalid format: $message"
              exit 1
            fi
            
            # Check gitmoji presence
            if ! echo "$message" | grep -q ':.*:'; then
              echo "❌ Missing gitmoji: $message"
              exit 1
            fi
            
            echo "✅ Valid: $message"
          done
```

### Auto-generate Changelog

`memory-bank/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Generate changelog
        run: |
          npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
          git add CHANGELOG.md
          git commit -m "docs: :memo: update changelog" || true

      - name: Semantic Release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## IDE Integration

### VS Code Extension

Install "Conventional Commits" extension for VS Code:

1. Search for "Conventional Commits" in extensions
2. Install by "vivaxy"
3. Configure workspace settings:

```json
{
  "conventionalCommits.gitmoji": true,
  "conventionalCommits.showEditor": true,
  "conventionalCommits.emojiFormat": "code"
}
```

### Git Template

Create commit template (`.gitmessage`):

```
# <type>[(<scope>)]: <:gitmoji:> <description>
#
# Body (optional):
#
# Footer (optional):
# Closes #<issue>
# BREAKING CHANGE: <description>

# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# Gitmoji: https://gitmoji.dev/
# Max 72 chars: ##################################################-->|
```

Configure git:

```bash
git config --global commit.template ~/.gitmessage
```

## Troubleshooting

### Common Issues

**Hook not executing:**

```bash
# Check permissions
ls -la .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

**Regex not matching:**

```bash
# Test regex with actual commit message
echo "feat(auth): :sparkles: add OAuth2" | grep -E "^(feat|fix).*: :.+: "
```

**Gitmoji not detected:**

```bash
# Ensure colons around emoji code
echo "feat: :sparkles: add feature" | grep -q ':.*:'
```

### Debug Mode

Add debug output to hooks:

```bash
#!/usr/bin/env bash
set -x # Enable debug mode

commit_msg=$(cat "$1")
echo "Checking message: $commit_msg"

# ... rest of validation
```

## Best Practices

1. **Test hooks locally** before deploying to server
2. **Provide clear error messages** with examples
3. **Allow emergency commits** with `--no-verify` when needed
4. **Keep regex patterns up to date** with team conventions
5. **Document hook behavior** for team members
6. **Regular hook maintenance** and testing

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
