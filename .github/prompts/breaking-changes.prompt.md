# Breaking Changes Guide

This prompt file contains detailed guidance on handling breaking changes in conventional commits.

## Breaking Change Format

Breaking changes MUST be indicated in two places:

1. **Subject line**: Add `!` before the colon
2. **Footer**: Include `BREAKING CHANGE:` description

## Basic Breaking Change Structure

```
<type>(<scope>)!: <:gitmoji:> <description>

[optional body]

BREAKING CHANGE: <detailed description>

[optional footer]
```

## Examples

### API Changes

**Remove endpoint:**

```
feat(api)!: :boom: remove legacy user endpoints

BREAKING CHANGE: All v1 user endpoints have been removed.
Use v2 endpoints with /api/v2/users/ prefix instead.

Closes #234
```

**Change response format:**

```
feat(api)!: :boom: restructure user profile response

The user profile endpoint now returns nested objects for better organization.

BREAKING CHANGE: User endpoints now return nested profile objects instead of flat structures.
All client applications must update their response parsing logic.

Migration guide: https://docs.example.com/migration/v2

Closes #247
```

### Configuration Changes

**Environment variables:**

```
chore(config)!: :boom: update environment variable names

BREAKING CHANGE: Environment variables have been renamed for consistency.
- DATABASE_URL -> DB_CONNECTION_STRING
- API_KEY -> SERVICE_API_TOKEN
- DEBUG_MODE -> LOG_LEVEL

Update your .env files accordingly.
```

**Configuration file format:**

```
feat(config)!: :boom: migrate to YAML configuration

BREAKING CHANGE: Configuration files must now be in YAML format.
JSON config files are no longer supported.

Run `npm run migrate-config` to convert existing config.json files.
```

### Dependency Changes

**Node.js version requirement:**

```
chore!: :boom: require Node.js 18 or higher

BREAKING CHANGE: Node.js 16 is no longer supported.
Upgrade to Node.js 18 or higher before updating.

This change improves performance and security.
```

**Remove package support:**

```
build(deps)!: :boom: remove jQuery dependency

BREAKING CHANGE: jQuery is no longer included in the bundle.
Use vanilla JavaScript or import jQuery separately if needed.
```

### Function/Method Changes

**Parameter changes:**

```
feat(auth)!: :boom: update authentication method signature

BREAKING CHANGE: The authenticate() method now requires an options object
instead of separate parameters.

Before: authenticate(username, password, remember)
After: authenticate({ username, password, rememberMe })
```

**Return type changes:**

```
feat(utils)!: :boom: change parseDate return type

BREAKING CHANGE: parseDate() now returns a Date object instead of timestamp.
Update code that expects numeric timestamps.
```

### Database Schema Changes

**Table structure:**

```
feat(db)!: :boom: restructure user table schema

BREAKING CHANGE: User table schema has changed:
- 'name' column split into 'first_name' and 'last_name'
- 'settings' column moved to separate 'user_settings' table

Run migration: npm run db:migrate
```

## Breaking Change Checklist

Before implementing breaking changes:

1. **Document the change**: Explain what's changing and why
2. **Provide migration path**: Include step-by-step migration instructions
3. **Version appropriately**: Ensure major version bump in semantic versioning
4. **Communicate early**: Notify users well in advance if possible
5. **Support transition**: Consider deprecation warnings before removal

## Versioning Impact

Breaking changes trigger:

- **Major version bump** (1.0.0 → 2.0.0)
- **Release notes** with migration guide
- **Documentation updates**
- **Communication to users/developers**

## Best Practices

### Good Breaking Change Messages

✅ **Detailed and helpful:**

```
feat(api)!: :boom: redesign authentication flow

BREAKING CHANGE: Authentication now uses JWT tokens instead of sessions.
- Remove session middleware
- Update login endpoints to use /auth/token
- Store JWT in localStorage instead of cookies

Migration guide: https://docs.example.com/auth-migration
```

✅ **Includes migration steps:**

```
chore(deps)!: :boom: upgrade to React 18

BREAKING CHANGE: React 18 introduces new breaking changes.
- Replace ReactDOM.render with createRoot
- Update testing utilities imports
- Review concurrent features impact

See React 18 upgrade guide: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
```

### Poor Breaking Change Messages

❌ **Too vague:**

```
feat!: :boom: update API

BREAKING CHANGE: API changed.
```

❌ **Missing migration info:**

```
refactor!: :boom: rewrite authentication

BREAKING CHANGE: Auth system completely rewritten.
```

❌ **No explanation:**

```
chore!: :boom: remove old code

BREAKING CHANGE: Removed deprecated functions.
```

## Gradual Migration Strategy

For large breaking changes, consider:

1. **Deprecation warnings** first
2. **Dual support** during transition
3. **Clear timeline** for removal
4. **Comprehensive documentation**

Example deprecation commit:

```
feat(auth): :warning: deprecate old login method

Add deprecation warning to authenticate() method.
Use authenticateWithToken() instead.

The old method will be removed in v3.0.0.
```

Followed later by:

```
feat(auth)!: :boom: remove deprecated authenticate method

BREAKING CHANGE: The deprecated authenticate() method has been removed.
Use authenticateWithToken() instead as documented in v2.5.0.
```
