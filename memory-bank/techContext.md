# techContext.md

## Purpose

This file documents the technologies, development setup, technical constraints, and dependencies for any project. It provides a clear reference for all technical aspects, independent of any specific project topic at initialization.

## Structure

- **Technologies Used:** General categories and rationale.
- **Development Setup:** Environment and tooling guidelines.
- **Technical Constraints:** Known limitations or requirements.
- **Dependencies:** How to manage and document them.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Technologies Used

- **Node.js 22** with native fetch API support
- **TypeScript 5.8+** with strict type checking and native Response types
- **Python 3.13**
- **Next.js 15+**

### HTTP Client Architecture

- **Native Fetch API**: Primary HTTP client using Node.js 22 native implementation
- **Zero External Dependencies**: Eliminated node-fetch package for cleaner dependency tree
- **TypeScript Integration**: Native Response types throughout codebase
- **Performance Optimized**: Native implementation provides better performance characteristics
- **Future Compatible**: Long-term maintenance advantages with native Node.js APIs

### Next.js v15+ Architecture

- **App Router**: `/app` directory with Server Components by default
- **Server Actions**: Use `'use server'` for mutations instead of API routes
- **Client Components**: Use `'use client'` for interactivity, state, and browser APIs
- **Prisma ORM**: Database access with PostgreSQL backend
- **Docker Integration**: Containerized PostgreSQL development environment

### Component Architecture Rules

#### Server Component Usage (Default)
- Data fetching from databases or APIs
- Static content and SEO-friendly elements
- Server-side computations and transformations
- Environment variable access and secrets
- Initial page rendering and layout

#### Client Component Usage (`'use client'`)
- Interactive UI requiring state management (`useState`, `useEffect`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser-only APIs (`window`, `localStorage`, `navigator`)
- Third-party client-side libraries
- Custom hooks and context providers

#### Server Actions Usage (`'use server'`)
- Database mutations (CREATE, UPDATE, DELETE operations)
- Form submissions and data validation
- Authentication and authorization logic
- Cache revalidation (`revalidatePath`, `revalidateTag`)
- Redirects after successful operations

### Serialization and Data Flow

#### Serializable Props (Server to Client)
- **Allowed**: Strings, numbers, booleans, arrays, plain objects, Dates, null, undefined
- **Not Allowed**: Functions, symbols, classes, DOM elements, complex objects
- **Pattern**: Pass data as props, define event handlers in Client Components
- **Alternative**: Use Server Actions for server-side function calls

#### Progressive Enhancement
- Forms work without JavaScript enabled
- Client-side validation enhances user experience
- Server-side validation always enforced
- Graceful degradation for disabled JavaScript

### Testing Infrastructure

- **Vitest 3.2.4**: Primary test runner with Istanbul coverage provider
- **Native Fetch Mocking**: vi.stubGlobal('fetch', mockFetch) for HTTP client testing
- **AuthManager Mocking**: Complete authentication system mocking for isolated testing
- **Istanbul Coverage**: Detailed branch/statement/function/line reporting with 90% thresholds
- **Zod Validation Testing**: Comprehensive schema validation testing patterns
- **CommonJS Compatibility**: Maintained throughout test infrastructure
- **Test Isolation**: No real network requests or external dependencies in test suite
- **Edge Case Coverage**: Comprehensive testing of error scenarios, NaN handling, and timeout management

### Production Test Results (2025-07-06)

- **259 tests passing** (maintained after native fetch conversion)
- **98.34% branch coverage** (exceeding 90% threshold)
- **100% branch coverage** achieved for: webStorage.ts, tokenBucket.ts
- **96.15% branch coverage** for restClient.ts, **87.5%** for QuestradeClient.ts
- **Zero regression** in test suite after dependency modernization
- **Improved performance** with native fetch implementation

## Development Setup

- The project root must be organized by language and framework as specified in [systemPatterns.md](./systemPatterns.md):
  - `src/` for TypeScript sources
  - `web/` for Next.js apps (when coexisting)
  - `scripts/` for shell scripts only
  - `python/` for Python code
  - `notebooks/` for Jupyter notebooks
  - All directory and file creation must be performed via scripts in `scripts/`, never manually.

Refer to the centralized directory structure diagram in [systemPatterns.md](./systemPatterns.md) for the latest and authoritative version.

- Document environment setup and configuration.
- Ensure instructions are clear for onboarding new agents or contributors.
- Update as tooling or setup changes.

## Technical Constraints

- Codebase organization must follow the standard described in [systemPatterns.md](./systemPatterns.md).
- All setup and file/folder creation must follow the patterns in [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md).
- List any known limitations or requirements.
- Update as new constraints are discovered or resolved.

## Dependencies

- Document all dependencies and their purposes.
- Update this section as dependencies are added, removed, or updated.

## Dependencies and Relationships

- **Depends On:** [systemPatterns.md](./systemPatterns.md), [projectbrief.md](./projectbrief.md)
- **Required By:** [activeContext.md](./activeContext.md), [progress.md](./progress.md), [docker-workflow.md](./docker-workflow.md), [dependencies.md](./dependencies.md)
- **Why This Order:** `techContext.md` establishes tools and constraints before active work or progress tracking.
- **Impact Analysis:** Outdated tooling information causes misaligned setups and wasted effort across the entire workflow.

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the technical context evolves.**  
> **Do not proceed with technical implementation until this file is aligned with the current technology stack and constraints.**  
> **Update this file immediately upon any change in technologies, setup, constraints, or dependencies.**

**See [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md), [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols and implementation patterns.**

---
