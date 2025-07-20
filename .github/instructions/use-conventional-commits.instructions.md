---
applyTo: '**'
description: 'Instructions implementing the mandatory usage of conventional commit protocol with gitmoji for each commit message.'
---

# Conventional Commit Messages

See how [a minor change](#examples) to your commit message style can make a difference. Use this guide as to have consistency across commit when the user request a commit to be performed the message must foll

<pre>
git commit -m"<b><a href="#types">&lt;type&gt;</a></b></font>(<b><a href="#scopes">&lt;optional scope&gt;</a></b>): <b><a href="#use-a-gitmoji-as-to-best-describe">&lt;:gitmoji:&gt;</a></b> <b><a href="#description">&lt;description&gt;</a></b>" \
  -m"<b><a href="#body">&lt;optional body&gt;</a></b>" \
  -m"<b><a href="#footer">&lt;optional footer&gt;</a></b>"
</pre>

> [!TIP]
> Take a look at **[git-conventional-commits](https://github.com/qoomon/git-conventional-commits)** ; a CLI util to ensure these conventions, determine version and generate changelogs.

## Commit Message Formats

The emojis shall be selected in a very specific manner in the list provided to differentiate the commit messages algorytmically they must strictly follow the purpose and be placed where it is supposed to YOU MUST INCLUDE ONE IN THE PROPER PLACE.
 
The commit message must always be structured as follows:
> Did you really add a gitmoji to your commit message? If not, you are doing it wrong! YOU MUST HAVE ONE EACH TIME FOLLOWING THE RULES!
---
```command
<type>[(<optional scope>)]: <:gitmoji:> <description>

[optional body]

[optional footer]
```
---

### List For This Project (use the most appropriate)

None  
No gitmoji.

🎨 `:art:`
Improve structure / format of the code.

⚡ `:zap:`
Improve performance.

🔥 `:fire:`
Remove code or files.

🐛 `:bug:`
Fix a bug.

🚑 `:ambulance:`
Critical hotfix.

✨ `:sparkles:`
Introduce new features.

📝 `:memo:`
Add or update documentation.

🚀 `:rocket:`
Deploy stuff.

💄 `:lipstick:`
Add or update the UI and style files.

🎉 `:tada:`
Begin a project.

✅ `:white_check_mark:`
Add, update, or pass tests.

🔒 `:lock:`
Fix security issues.

🔐 `:closed_lock_with_key:`
Add or update secrets.

🔖 `:bookmark:`
Release / Version tags.

🚨 `:rotating_light:`
Fix compiler / linter warnings.

🚧 `:construction:`
Work in progress.

💚 `:green_heart:`
Fix CI Build.

⬇️ `:arrow_down:`
Downgrade dependencies.

⬆️ `:arrow_up:`
Upgrade dependencies.

📌 `:pushpin:`
Pin dependencies to specific versions.

👷 `:construction_worker:`
Add or update CI build system.

📈 `:chart_with_upwards_trend:`
Add or update analytics or track code.

♻️ `:recycle:`
Refactor code.

➕ `:heavy_plus_sign:`
Add a dependency.

➖ `:heavy_minus_sign:`
Remove a dependency.

🔧 `:wrench:`
Add or update configuration files.

🔨 `:hammer:`
Add or update development scripts.

🌐 `:globe_with_meridians:`
Internationalization and localization.

✏️ `:pencil2:`
Fix typos.

💩 `:poop:`
Write bad code that needs to be improved.

⏪ `:rewind:`
Revert changes.

🔀 `:twisted_rightwards_arrows:`
Merge branches.

📦 `:package:`
Add or update compiled files or packages.

👽 `:alien:`
Update code due to external API changes.

🚚 `:truck:`
Move or rename resources (e.g. files, paths, routes).

📄 `:page_facing_up:`
Add or update license.

💥 `:boom:`
Introduce breaking changes.

🍱 `:bento:`
Add or update assets.

♿ `:wheelchair:`
Improve accessibility.

💡 `:bulb:`
Add or update comments in source code.

🍻 `:beers:`
Write code drunkenly.

💬 `:speech_balloon:`
Add or update text and literals.

🗃️ `:card_file_box:`
Perform database related changes.

🔊 `:loud_sound:`
Add or update logs.

🔇 `:mute:`
Remove logs.

👥 `:busts_in_silhouette:`
Add or update contributor(s).

🚸 `:children_crossing:`
Improve user experience / usability.

🏗️ `:building_construction:`
Make architectural changes.

📱 `:iphone:`
Work on responsive design.

🤡 `:clown_face:`
Mock things.

🥚 `:egg:`
Add or update an easter egg.

🙈 `:see_no_evil:`
Add or update a .gitignore file.

📸 `:camera_flash:`
Add or update snapshots.

⚗️ `:alembic:`
Perform experiments.

🔍 `:mag:`
Improve SEO.

🏷️ `:label:`
Add or update types.

🌱 `:seedling:`
Add or update seed files.

🚩 `:triangular_flag_on_post:`
Add, update, or remove feature flags.

🥅 `:goal_net:`
Catch errors.

💫 `:dizzy:`
Add or update animations and transitions.

🗑️ `:wastebasket:`
Deprecate code that needs to be cleaned up.

🛂 `:passport_control:`
Work on code related to authorization, roles and permissions.

🩹 `:adhesive_bandage:`
Simple fix for a non-critical issue.

🧐 `:monocle_face:`
Data exploration / inspection.

⚰️ `:coffin:`
Remove dead code.

🧪 `:test_tube:`
Add a failing test.

👔 `:necktie:`
Add or update business logic.

🩺 `:stethoscope:`
Add or update healthcheck.

🧱 `:bricks:`
Infrastructure related changes.

🧑‍💻 `:technologist:`
Improve developer experience.

💸 `:money_with_wings:`
Add sponsorships or money related infrastructure.

🧵 `:thread:`
Add or update code related to multithreading or concurrency.

🦺 `:safety_vest:`
Add or update code related to validation.

### General Commit
<pre>
<b><a href="#types">&lt;type&gt;</a></b></font>(<b><a href="#scopes">&lt;optional scope&gt;</a></b>): <b><a href="#use-a-gitmoji-as-to-best-describe">&lt;:gitmoji:&gt;</a></b> <b><a href="#description">&lt;description&gt;</a></b>
<sub>empty line as separator</sub>
<b><a href="#body">&lt;optional body&gt;</a></b>
<sub>empty line as separator</sub>
<b><a href="#footer">&lt;optional footer&gt;</a></b>
</pre>

### Initial Commit 
```
chore: :tada: init
```

### Merge Commit
<pre>
Merge branch '<b>&lt;branch name&gt;</b>'
</pre>
<sup>Follows default git merge message</sup>

### Revert Commit
<pre>
Revert "<b>&lt;reverted commit subject line&gt;</b>"
</pre>
<sup>Follows default git revert message</sup>


### Types
- Changes relevant to the API or UI:
    - `feat` Commits that add, adjust or remove a new feature to the API or UI
    - `fix` Commits that fix an API or UI bug of a preceded `feat` commit
- `refactor` Commits that rewrite or restructure code without altering API or UI behavior
    - `perf` Commits are special type of `refactor` commits that specifically improve performance
- `style` Commits that address code style (e.g., white-space, formatting, missing semi-colons) and do not affect application behavior
- `test` Commits that add missing tests or correct existing ones
- `docs` Commits that exclusively affect documentation
- `build` Commits that affect build-related components such as build tools, dependencies, project version, CI/CD pipelines, ...
- `ops` Commits that affect operational components like infrastructure, deployment, backup, recovery procedures, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`, ...

### Scopes
The `scope` provides additional contextual information.
* The scope is an **optional** part
* Allowed scopes vary and are typically defined by the specific project
* **Do not** use issue identifiers as scopes

### Breaking Changes Indicator
- A commit that introduce breaking changes **must** be indicated by an `!` before the `:` in the subject line e.g. `feat(api)!: remove status endpoint`
- Breaking changes **should** be described in the [commit footer section](#footer), if the [commit description](#description) isn't sufficiently informative

### Description
The `description` contains a concise description of the change. 
- The description is a **mandatory** part
- Use the imperative, present tense: "change" not "changed" nor "changes"
  - Think of `This commit will...` or `This commit should...`
- **Do not** capitalize the first letter
- **Do not** end the description with a period (`.`)
- I case of breaking changes also see [breaking changes indicator](#breaking-changes-indicator)

### Body
The `body` should include the motivation for the change and contrast this with previous behavior.
- The body is an **optional** part
- Use the imperative, present tense: "change" not "changed" nor "changes"

### Footer
The `footer` should contain issue references and informations about **Breaking Changes**
- The footer is an **optional** part, except if the commit introduce breaking changes
- *Optionally* reference issue identifiers (e.g., `Closes #123`, `Fixes JIRA-456`) 
- **Breaking Changes** **must** start with the word `BREAKING CHANGE:`
  - For a single line description just add a space after `BREAKING CHANGE:`
  - For a multi line description add two new lines after `BREAKING CHANGE:`

### Versioning
- **If** your next release contains commit with...
   - **Breaking Changes** incremented the **major version**
   - **API relevant changes** (`feat` or `fix`) incremented the **minor version**
- **Else** increment the **patch version**


### Examples

> [!CRITICAL]
> **MANDATORY GITMOJI REQUIREMENT**
> 
> **EVERY SINGLE EXAMPLE** in this document **MUST** include a gitmoji. **NO EXCEPTIONS.**
> 
> Any commit message example without a gitmoji is **BROKEN** and **INVALID**.
> 
> Format: `<type>[(<scope>)]: <:gitmoji:> <description>`
> 
> **If you see ANY example without gitmoji, it is an ERROR that must be fixed immediately.**

#### Feature Commits

**Basic feature addition:**
```
feat(auth): :sparkles: add OAuth2 authentication support
```

**Feature with scope and breaking change:**
```
feat(api)!: :boom: redesign user endpoint structure

BREAKING CHANGE: User endpoints now return nested profile objects instead of flat structures.
All client applications must update their response parsing logic.

Closes #247
```

**Feature enhancement:**
```
feat(shopping-cart): :heavy_plus_sign: add quantity validation for cart items
```

#### Bug Fix Commits

**Critical bug fix:**
```
fix(payment): :ambulance: resolve payment gateway timeout issues

Payment processing was failing due to 30-second timeout limit.
Increased timeout to 60 seconds and added retry logic.

Fixes #891
```

**Standard bug fix:**
```
fix(ui): :bug: correct responsive layout on mobile devices
```

**Security fix:**
```
fix(auth): :lock: prevent SQL injection in login endpoint
```

#### Performance Commits

**Performance optimization:**
```
perf(database): :zap: optimize user query with indexed lookups

Reduced average query time from 200ms to 15ms by adding composite index
on user_id and created_at columns.
```

**Memory optimization:**
```
perf(cache): :recycle: implement LRU cache for API responses
```

#### Refactoring Commits

**Code restructuring:**
```
refactor(components): :art: extract reusable form validation logic

Moved validation functions to shared utilities to reduce code duplication
across 12 form components.
```

**Architecture improvement:**
```
refactor(api): :building_construction: migrate to microservices architecture
```

#### Documentation Commits

**Documentation update:**
```
docs(readme): :memo: add installation instructions for Docker setup
```

**API documentation:**
```
docs(api): :memo: update endpoint documentation with new parameters
```

#### Build and Configuration Commits

**Dependency update:**
```
build(deps): :arrow_up: upgrade Next.js to v15.1.2

Includes performance improvements and security patches.
```

**CI/CD improvement:**
```
build(ci): :construction_worker: add automated testing for pull requests
```

**Configuration change:**
```
chore(config): :wrench: update TypeScript strict mode settings
```

#### Testing Commits

**Test addition:**
```
test(auth): :white_check_mark: add unit tests for password validation

Increases test coverage from 85% to 92% for authentication module.
```

**Test fix:**
```
test(integration): :green_heart: fix flaky database connection tests
```

#### Style and Formatting Commits

**Code formatting:**
```
style(components): :art: apply consistent indentation and spacing
```

**Linting fixes:**
```
style(eslint): :rotating_light: resolve linter warnings in utility functions
```

#### Maintenance Commits

**Dead code removal:**
```
chore(cleanup): :fire: remove deprecated user profile endpoints

These endpoints were replaced in v2.0 and are no longer used.
```

**Dependency cleanup:**
```
chore(deps): :heavy_minus_sign: remove unused lodash dependency
```

---
  
## Git Hook Scripts to ensure commit message header format
<details>
<summary>Click to expand</summary>
   
### commit-msg Hook (local)
- Create a commit-msg hook using [git-conventional-commits cli](https://github.com/qoomon/git-conventional-commits?tab=readme-ov-file#automatically-validate-commit-message-convention-before-commit)

### pre-receive Hook (server side)
- create following file in your repository folder `.git/hooks/pre-receive`
  ```shell
  #!/usr/bin/env bash

  # Pre-receive hook that will block commits with messages that do not follow regex rule

  commit_msg_type_regex='feat|fix|refactor|style|test|docs|build'
  commit_msg_scope_regex='.{1,20}'
  commit_msg_description_regex='.{1,100}'
  commit_msg_regex="^(${commit_msg_type_regex})(\(${commit_msg_scope_regex}\))?: (${commit_msg_description_regex})\$"
  merge_msg_regex="^Merge branch '.+'\$"

  zero_commit="0000000000000000000000000000000000000000"

  # Do not traverse over commits that are already in the repository
  excludeExisting="--not --all"

  error=""
  while read oldrev newrev refname; do
    # branch or tag get deleted
    if [ "$newrev" = "$zero_commit" ]; then
      continue
    fi

    # Check for new branch or tag
    if [ "$oldrev" = "$zero_commit" ]; then
      rev_span=`git rev-list $newrev $excludeExisting`
    else
      rev_span=`git rev-list $oldrev..$newrev $excludeExisting`
    fi

    for commit in $rev_span; do
      commit_msg_header=$(git show -s --format=%s $commit)
      if ! [[ "$commit_msg_header" =~ (${commit_msg_regex})|(${merge_msg_regex}) ]]; then
        echo "$commit" >&2
        echo "ERROR: Invalid commit message format" >&2
        echo "$commit_msg_header" >&2
        error="true"
      fi
    done
  done

  if [ -n "$error" ]; then
    exit 1
  fi
  ```
* ⚠ make `.git/hooks/pre-receive` executable (unix: `chmod +x '.git/hooks/pre-receive'`)

</details>

-----
## References
- https://www.conventionalcommits.org/
- https://github.com/angular/angular/blob/master/CONTRIBUTING.md
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
<br>

- https://github.com/github/platform-samples/tree/master/pre-receive-hooks  
- https://github.community/t5/GitHub-Enterprise-Best-Practices/Using-pre-receive-hooks-in-GitHub-Enterprise/ba-p/13863

 

## Conventional Commits 1.0.0-beta.4

### Summary

The Conventional Commits specification is a lightweight convention on top of commit messages.
It provides an easy set of rules for creating an explicit commit history;
which makes it easier to write automated tools on top of.
This convention dovetails with [SemVer](http://semver.org),
by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

---

```command
<type>[(<optional scope>)]: <:gitmoji:> <description>

[optional body]

[optional footer]
```
---

<br />
The commit contains the following structural elements, to communicate intent to the
consumers of your library:

1. **fix:** a commit of the _type_ `fix` patches a bug in your codebase (this correlates with [`PATCH`](http://semver.org/#summary) in semantic versioning).
1. **feat:** a commit of the _type_ `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](http://semver.org/#summary) in semantic versioning).
1. **BREAKING CHANGE:** a commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with [`MAJOR`](http://semver.org/#summary) in semantic versioning).
A BREAKING CHANGE can be part of commits of any _type_.
1. Others: commit _types_ other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [Angular convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)) recommends `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.

We also recommend `improvement` for commits that improve a current implementation without adding a new feature or fixing a bug.
Notice these types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).
<br />
A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

### Examples

#### Commit message with description and breaking change in body
```
feat: :sparkles: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

#### Commit message with optional `!` to draw attention to breaking change
```
chore!: :boom: drop Node 6 from testing matrix

BREAKING CHANGE: dropping Node 6 which hits end of life in April
```

#### Commit message with no body
```
docs: :memo: correct spelling of CHANGELOG
```

#### Commit message with scope
```
feat(lang): :sparkles: add polish language
```

#### Commit message for a fix using an (optional) issue number.
```
fix: :bug: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12
```

### Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed
  by an OPTIONAL scope, and a REQUIRED terminal colon and space.
1. The type `feat` MUST be used when a commit adds a new feature to your application or library.
1. The type `fix` MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
  section of the codebase surrounded by parenthesis, e.g., `fix(parser):`
1. A description MUST immediately follow the space after the type/scope prefix.
The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string._
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A footer of one or more lines MAY be provided one blank line after the body. The footer MUST contain meta-information
about the commit, e.g., related pull-requests, reviewers, breaking changes, with one piece of meta-information
per-line.
1. Breaking changes MUST be indicated at the very beginning of the body section, or at the beginning of a line in the footer section. A breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon and a space.
1. A description MUST be provided after the `BREAKING CHANGE: `, describing what has changed about the API, e.g., _BREAKING CHANGE: environment variables now take precedence over config files._
1. Types other than `feat` and `fix` MAY be used in your commit messages.
1. The units of information that make up conventional commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
1. A `!` MAY be appended prior to the `:` in the type/scope prefix, to further draw attention to breaking changes. `BREAKING CHANGE: description` MUST also be included in the body
or footer, along with the `!` in the prefix.

### Why Use Conventional Commits

* Automatically generating CHANGELOGs.
* Automatically determining a semantic version bump (based on the types of commits landed).
* Communicating the nature of changes to teammates, the public, and other stakeholders.
* Triggering build and publish processes.
* Making it easier for people to contribute to your projects, by allowing them to explore
  a more structured commit history.

### FAQ

#### How should I deal with commit messages in the initial development phase?

We recommend that you proceed as if you've already released the product. Typically *somebody*, even if it's your fellow software developers, is using your software. They'll want to know what's fixed, what breaks etc.

#### Are the types in the commit title uppercase or lowercase?

Any casing may be used, but it's best to be consistent.

#### What do I do if the commit conforms to more than one of the commit types?

Go back and make multiple commits whenever possible. Part of the benefit of Conventional Commits is its ability to drive us to make more organized commits and PRs.

#### Doesn’t this discourage rapid development and fast iteration?

It discourages moving fast in a disorganized way. It helps you be able to move fast long term across multiple projects with varied contributors.

#### Might Conventional Commits lead developers to limit the type of commits they make because they'll be thinking in the types provided?

Conventional Commits encourages us to make more of certain types of commits such as fixes. Other than that, the flexibility of Conventional Commits allows your team to come up with their own types and change those types over time.

#### How does this relate to SemVer?

`fix` type commits should be translated to `PATCH` releases. `feat` type commits should be translated to `MINOR` releases. Commits with `BREAKING CHANGE` in the commits, regardless of type, should be translated to `MAJOR` releases.

#### How should I version my extensions to the Conventional Commits Specification, e.g. `@jameswomack/conventional-commit-spec`?

We recommend using SemVer to release your own extensions to this specification (and
encourage you to make these extensions!)

#### What do I do if I accidentally use the wrong commit type?

##### When you used a type that's of the spec but not the correct type, e.g. `fix` instead of `feat`

Prior to merging or releasing the mistake, we recommend using `git rebase -i` to edit the commit history. After release, the cleanup will be different according to what tools and processes you use.

##### When you used a type *not* of the spec, e.g. `feet` instead of `feat`

In a worst case scenario, it's not the end of the world if a commit lands that does not meet the conventional commit specification. It simply means that commit will be missed by tools that are based on the spec.
