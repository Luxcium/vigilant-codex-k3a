---
applyTo: 'web/src/**/*.{ts,tsx}'
description: 'Next.js v15+ Server/Client Component decision framework and implementation patterns'
---

# Next.js Component Pattern Selection

## Trigger Recognition Rules

### When to Create Server Components (Default)

- Component fetches data from databases or APIs
- Component contains static content or SEO elements
- Component uses environment variables or secrets
- Component performs server-side computations
- Component handles initial page rendering

### When to Create Client Components (`'use client'`)

- Component uses React hooks (useState, useEffect, useContext)
- Component handles user events (onClick, onChange, onSubmit)
- Component accesses browser APIs (window, localStorage, navigator)
- Component requires third-party client-side libraries
- Component manages client-side state or effects

### When to Create Server Actions (`'use server'`)

- Performing database mutations (CREATE, UPDATE, DELETE)
- Handling form submissions with validation
- Implementing authentication and authorization
- Revalidating cached data after mutations
- Redirecting after successful operations

## Implementation Standards

### Server Component Rules

- Use async functions for data fetching
- Import server-only modules safely
- Pass only serializable props to Client Components
- Handle errors with error boundaries
- Implement proper caching strategies

### Client Component Rules

- Place `'use client'` at top of file, before imports
- Ensure all props are serializable (no functions, symbols, classes)
- Use progressive enhancement for forms
- Implement proper error handling
- Minimize client bundle size

### Server Action Rules

- Place `'use server'` at top of function or file
- Validate all input data on server
- Return serializable data only
- Use revalidatePath() or revalidateTag() for cache updates
- Handle errors gracefully with try-catch

## Decision Matrix

### Component Type Selection

```typescript
interface ComponentAnalysis {
  hasInteractivity: boolean;
  requiresState: boolean;
  accessesBrowserAPIs: boolean;
  fetchesData: boolean;
  containsSecrets: boolean;
  handlesUserEvents: boolean;
}

function determineComponentType(
  analysis: ComponentAnalysis
): 'server' | 'client' {
  // Client Component indicators
  if (
    analysis.hasInteractivity ||
    analysis.requiresState ||
    analysis.accessesBrowserAPIs ||
    analysis.handlesUserEvents
  ) {
    return 'client';
  }

  // Server Component (default)
  return 'server';
}
```

### Serialization Validation

```typescript
// ✅ Serializable props (allowed)
interface SerializableProps {
  title: string;
  count: number;
  isActive: boolean;
  items: string[];
  metadata: { [key: string]: any };
  createdAt: Date;
  optional?: string;
}

// ❌ Non-serializable props (not allowed)
interface NonSerializableProps {
  onClick: () => void; // Function
  symbol: symbol; // Symbol
  element: HTMLElement; // DOM element
  instance: SomeClass; // Class instance
}
```

## Implementation Patterns

### Pattern 1: Server Component with Client Interaction

```tsx
// app/posts/[id]/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';
import LikeButton from '@/components/like-button';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}
```

### Pattern 2: Client Component with Server Action

```tsx
// components/like-button.tsx (Client Component)
'use client';
import { useState } from 'react';
import { likePost } from '@/lib/actions';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const updatedLikes = await likePost(postId);
    setLikes(updatedLikes);
  };

  return <button onClick={handleLike}>{likes} 👍</button>;
}
```

### Pattern 3: Server Action with Form

```tsx
// lib/actions.ts (Server Actions)
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await prisma.post.create({
    data: { title, content },
  });

  revalidatePath('/posts');
}
```

### Pattern 4: Progressive Enhancement Form

```tsx
// components/post-form.tsx (Client Component)
'use client';
import { createPost } from '@/lib/actions';

export default function PostForm() {
  return (
    <form action={createPost}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

## Quality Assurance Standards

### Component Analysis Checklist

- [ ] Component type correctly determined based on requirements
- [ ] `'use client'` directive placed at top of file, before imports
- [ ] All props are serializable (no functions, symbols, classes)
- [ ] Server Actions use proper validation and error handling
- [ ] Cache revalidation implemented where appropriate
- [ ] Progressive enhancement considered for forms
- [ ] Error boundaries implemented for Client Components
- [ ] TypeScript types properly defined and exported

### Testing Requirements

- [ ] Server Components tested with proper mocking
- [ ] Client Components tested with user interaction
- [ ] Server Actions tested with form data validation
- [ ] Error scenarios covered with appropriate tests
- [ ] Integration tests for component composition
- [ ] Performance tests for client bundle size

## References and Documentation

### Official Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [use client directive](https://nextjs.org/docs/app/api-reference/directives/use-client)
- [use server directive](https://nextjs.org/docs/app/api-reference/directives/use-server)

### Project-Specific References

- [systemPatterns.md](../../memory-bank/systemPatterns.md) - Architecture patterns
- [techContext.md](../../memory-bank/techContext.md) - Technical context
- [when-to-use-what-matrix.instructions.md](./when-to-use-what-matrix.instructions.md) - Decision matrix

### Best Practices

- [Serializable Props](https://react.dev/reference/rsc/use-client#serializable-types)
- [Progressive Enhancement](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#progressive-enhancement)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Caching and Revalidation](https://nextjs.org/docs/app/building-your-application/caching)

## AI Agent Instructions

### Decision Process

1. **Analyze Requirements**: Determine if component needs interactivity, state, or browser APIs
2. **Apply Decision Matrix**: Use ComponentAnalysis interface to determine type
3. **Validate Implementation**: Ensure proper directive placement and prop serialization
4. **Update Documentation**: Record patterns and decisions in memory bank
5. **Test Integration**: Verify component works in complete application context

### Error Prevention

- Never pass functions as props from Server to Client Components
- Always validate Server Action inputs on server side
- Use proper TypeScript types for all component props
- Implement progressive enhancement for all forms
- Test both JavaScript enabled and disabled scenarios

### Memory Bank Updates

- Document new patterns in systemPatterns.md
- Update component decision matrix with new use cases
- Record architectural decisions and rationale
- Cross-reference related instruction files
- Maintain links to official documentation


## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
