# Next.js 15+ Pragma Directives Prompt

## Context

You are working with Next.js 15+ App Router and React 19+ Server Components. The project uses two critical pragma directives that determine where code executes:

- `'use server'` - Marks functions/files for server-side execution
- `'use client'` - Marks components/files for client-side rendering

## Directive Decision Matrix

### Use `'use server'` for:

- **Database Operations**: Direct Prisma/database queries
- **Form Handling**: Processing form submissions
- **Authentication**: Server-side auth validation
- **API Calls**: Server-to-server communication
- **File Operations**: Reading/writing files
- **Sensitive Operations**: Token validation, encryption
- **Data Mutations**: Creating, updating, deleting data

### Use `'use client'` for:

- **Interactivity**: Event handlers, onClick, onChange
- **State Management**: useState, useReducer, useContext
- **Effects**: useEffect, useLayoutEffect
- **Browser APIs**: localStorage, geolocation, DOM manipulation
- **Third-party Libraries**: Client-only libraries
- **Real-time Features**: WebSockets, live updates
- **Form Validation**: Real-time input validation

## Implementation Patterns

### Server Actions Pattern

```typescript
// lib/actions.ts
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

### Client Component Pattern

```typescript
// components/post-form.tsx
'use client';

import { useState } from 'react';
import { createPost } from '@/lib/actions';

export default function PostForm() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    await createPost(formData);
    setIsPending(false);
  };

  return (
    <form action={handleSubmit}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

### Server Component Pattern (Default)

```typescript
// app/posts/page.tsx
import { prisma } from '@/lib/prisma';
import PostForm from '@/components/post-form';

export default async function PostsPage() {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <PostForm />
      <PostList posts={posts} />
    </div>
  );
}
```

## Code Generation Guidelines

### When generating Server Actions:

1. Always start with `'use server'`
2. Use FormData for form handling
3. Include proper error handling
4. Call `revalidatePath()` after mutations
5. Validate all inputs server-side
6. Handle authentication/authorization

### When generating Client Components:

1. Always start with `'use client'`
2. Use React hooks for state/effects
3. Handle loading states
4. Implement error boundaries
5. Use Server Actions for data mutations
6. Avoid server-only imports

### When generating Server Components:

1. No directive needed (default)
2. Use async/await for data fetching
3. Direct database access allowed
4. No React hooks (except use, useId)
5. No event handlers
6. Can import Server Actions

## Security Considerations

### Server Actions Security:

- Always validate inputs
- Implement authentication checks
- Use proper authorization
- Sanitize data before database operations
- Rate limit actions
- Log security events

### Client Component Security:

- Never expose sensitive data
- Validate on server, not just client
- Use Server Actions for mutations
- Implement proper error handling
- Avoid storing secrets in client code

## Performance Optimization

### Bundle Size:

- Prefer Server Components
- Use Client Components only when necessary
- Consider lazy loading for large client components
- Split client code appropriately

### Data Loading:

- Fetch data in Server Components
- Use parallel data fetching
- Implement proper caching
- Use Suspense for streaming

## Error Handling Patterns

### Server Action Errors:

```typescript
'use server';

export async function createPost(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Validation
    const title = formData.get('title') as string;
    if (!title || title.length < 3) {
      return { success: false, error: 'Title must be at least 3 characters' };
    }

    // Database operation
    await prisma.post.create({ data: { title } });

    revalidatePath('/posts');
    return { success: true };
  } catch (error) {
    console.error('Create post error:', error);
    return { success: false, error: 'Failed to create post' };
  }
}
```

### Client Component Errors:

```typescript
'use client';

export default function PostForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setIsPending(true);

    try {
      const result = await createPost(formData);
      if (!result.success) {
        setError(result.error || 'Unknown error');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input name="title" required />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}
```

## Advanced Patterns

### Optimistic Updates:

```typescript
'use client';

import { useOptimistic, useTransition } from 'react';

export default function PostList({ posts }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost]
  );

  const handleAdd = (newPost) => {
    startTransition(async () => {
      addOptimisticPost(newPost);
      await createPost(newPost);
    });
  };

  return (
    <div>
      {optimisticPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Progressive Enhancement:

```typescript
// Works without JavaScript, enhanced with JavaScript
'use client';

export default function NewsletterForm() {
  return (
    <form
      action={subscribeNewsletter} // Server Action
      onSubmit={(e) => {
        // Enhanced client-side handling
        e.preventDefault();
        // Add loading states, validation, etc.
      }}
    >
      <input name="email" type="email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

## Common Mistakes to Avoid

### ❌ Don't do this:

```typescript
// Mixing server and client code
'use client';
import { prisma } from '@/lib/prisma'; // Server-only import in client

// Using hooks in Server Components
export default function ServerComponent() {
  const [state, setState] = useState(0); // Error!
  return <div>{state}</div>;
}

// Not using Server Actions for mutations
const handleClick = () => {
  fetch('/api/posts', { method: 'POST' }); // Old pattern
};
```

### ✅ Do this instead:

```typescript
// Proper separation
'use server';
import { prisma } from '@/lib/prisma';

export async function createPost(formData: FormData) {
  return await prisma.post.create({
    data: {
      title: formData.get('title') as string
    }
  });
}

// Client Component
'use client';
import { createPost } from '@/lib/actions';

export default function PostForm() {
  const [isPending, setIsPending] = useState(false);

  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit" disabled={isPending}>
        Create Post
      </button>
    </form>
  );
}
```

## Testing Considerations

### Server Actions Testing:

```typescript
// Test server actions directly
import { createPost } from '@/lib/actions';

test('createPost creates a post', async () => {
  const formData = new FormData();
  formData.append('title', 'Test Post');

  const result = await createPost(formData);
  expect(result.success).toBe(true);
});
```

### Client Component Testing:

```typescript
// Test client components with mocked actions
jest.mock('@/lib/actions', () => ({
  createPost: jest.fn()
}));

test('PostForm calls createPost on submit', async () => {
  render(<PostForm />);

  await user.click(screen.getByRole('button', { name: 'Create Post' }));

  expect(createPost).toHaveBeenCalled();
});
```

## Migration Strategy

### From API Routes to Server Actions:

1. Move API logic to Server Actions
2. Replace fetch calls with direct action calls
3. Update form handling to use actions
4. Remove unnecessary API routes
5. Test thoroughly

### From Client-side Data Fetching to Server Components:

1. Move data fetching to Server Components
2. Pass data down as props
3. Use Client Components only for interactivity
4. Update state management patterns
5. Test rendering and hydration

## Summary

When working with Next.js 15+ and React 19+:

1. **Default to Server Components** - Better performance, SEO, and developer experience
2. **Use Client Components sparingly** - Only for interactivity and browser APIs
3. **Server Actions for mutations** - Replace API routes with Server Actions
4. **Progressive Enhancement** - Forms work without JavaScript
5. **Proper boundaries** - Keep server and client code separate
6. **Security first** - Always validate on server, authenticate actions
7. **Performance minded** - Minimize client bundle, leverage server rendering

These directives enable a new paradigm of full-stack React development with better performance, security, and developer experience.
