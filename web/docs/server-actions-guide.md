# Next.js 15+ Server Actions & Client Components Guide

## Overview

This guide covers the essential React Server Components directives (`'use server'` and `'use client'`) introduced in React 19 and fully supported in Next.js 15+. These directives enable a new paradigm of server-client communication through Server Actions and Client Components.

## 'use server' Directive

### Purpose

The `'use server'` directive marks functions or entire files to be executed on the server side. It enables Server Actions - async functions that can be called from Client Components to perform server-side operations.

### Key Features

- **Server-Side Execution**: Functions run on the server with access to databases, file systems, and server APIs
- **Form Integration**: Works seamlessly with HTML forms for progressive enhancement
- **Automatic Serialization**: Handles data serialization between client and server
- **Revalidation**: Can trigger cache invalidation and page revalidation

### Usage Patterns

#### 1. File-Level Declaration

```typescript
// actions.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await prisma.post.create({
    data: { title, content },
  });
}
```

#### 2. Inline Function Declaration

```typescript
// page.tsx (Server Component)
export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  async function updatePost(formData: FormData) {
    'use server';

    await savePost(params.id, formData);
    revalidatePath(`/posts/${params.id}`);
  }

  return <EditPost updateAction={updatePost} post={post} />;
}
```

### Best Practices

#### Security Considerations

- Always validate and sanitize inputs
- Implement proper authentication and authorization
- Treat all client data as untrusted

```typescript
'use server';

export async function deletePost(id: string) {
  // Authentication check
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // Authorization check
  const post = await prisma.post.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (post?.userId !== user.id) {
    throw new Error('Forbidden');
  }

  await prisma.post.delete({ where: { id } });
}
```

#### Error Handling

```typescript
'use server';

export async function updatePost(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get('title') as string;

    if (title.length < 5) {
      return { success: false, error: 'Title too short' };
    }

    await prisma.post.update({
      where: { id },
      data: { title },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Update failed' };
  }
}
```

### Serialization Rules

#### Supported Types

- **Primitives**: string, number, boolean, undefined, null
- **Collections**: Array, Map, Set, TypedArray
- **Objects**: Plain objects with serializable properties
- **Special**: Date, FormData, Promises, Server Functions

#### Unsupported Types

- Functions (except Server Functions)
- Classes and class instances
- Symbols (except globally registered)
- React elements/JSX
- Objects with null prototypes

## 'use client' Directive

### Purpose

The `'use client'` directive marks components and modules to be rendered on the client side. It creates a boundary between server and client code.

### Key Features

- **Client-Side Rendering**: Components hydrate and run in the browser
- **Interactivity**: Supports event handlers, state, and effects
- **Browser APIs**: Access to DOM, localStorage, and other browser APIs
- **Third-Party Libraries**: Can use client-only libraries

### Usage Patterns

#### 1. Interactive Components

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

#### 2. Browser API Usage

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function LocationDisplay() {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  }, []);

  return <p>Location: {location}</p>;
}
```

#### 3. Form Handling with Server Actions

```typescript
'use client';

import { useState } from 'react';
import { createPost } from '@/lib/actions';

export default function PostForm() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);

    try {
      await createPost(formData);
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

### When to Use Client Components

#### Required for:

- Event handlers (onClick, onChange, etc.)
- State management (useState, useReducer)
- Effects (useEffect, useLayoutEffect)
- Browser APIs (localStorage, geolocation, etc.)
- Third-party libraries that use client-only features

#### Performance Considerations

- Increases bundle size
- Requires hydration on client
- May cause layout shifts

## Architecture Patterns

### Server Component + Client Component Pattern

```typescript
// page.tsx (Server Component)
import { prisma } from '@/lib/prisma';
import PostList from '@/components/post-list';

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}

// components/post-list.tsx (Client Component)
'use client';

import { useState } from 'react';
import { likePost } from '@/lib/actions';

export default function PostList({ posts }) {
  const [optimisticPosts, setOptimisticPosts] = useState(posts);

  const handleLike = async (id: string) => {
    // Optimistic update
    setOptimisticPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );

    try {
      await likePost(id);
    } catch (error) {
      // Revert optimistic update
      setOptimisticPosts(posts);
    }
  };

  return (
    <ul>
      {optimisticPosts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>
            👍 {post.likes}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Progressive Enhancement Pattern

```typescript
// actions.ts
'use server';

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  // Server-side validation
  if (!email?.includes('@')) {
    throw new Error('Invalid email');
  }

  // Subscribe logic
  await subscribeUser(email);

  return { success: true };
}

// components/newsletter-form.tsx
'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/actions';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  return (
    <form
      action={subscribeNewsletter}
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('pending');

        try {
          const formData = new FormData(e.currentTarget);
          await subscribeNewsletter(formData);
          setStatus('success');
        } catch (error) {
          setStatus('error');
        }
      }}
    >
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit" disabled={status === 'pending'}>
        {status === 'pending' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {status === 'success' && <p>Successfully subscribed!</p>}
      {status === 'error' && <p>Subscription failed. Please try again.</p>}
    </form>
  );
}
```

## Advanced Patterns

### Optimistic Updates

```typescript
'use client';

import { useOptimistic, useTransition } from 'react';
import { likePost } from '@/lib/actions';

export default function PostCard({ post }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPost, addOptimisticLike] = useOptimistic(
    post,
    (state, increment) => ({ ...state, likes: state.likes + increment })
  );

  const handleLike = () => {
    startTransition(async () => {
      addOptimisticLike(1);
      await likePost(post.id);
    });
  };

  return (
    <div>
      <h3>{optimisticPost.title}</h3>
      <button onClick={handleLike} disabled={isPending}>
        👍 {optimisticPost.likes}
      </button>
    </div>
  );
}
```

### Server Actions with useActionState

```typescript
'use client';

import { useActionState } from 'react';
import { createPost } from '@/lib/actions';

export default function PostForm() {
  const [state, formAction] = useActionState(createPost, null);

  return (
    <form action={formAction}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>

      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">Post created!</p>}
    </form>
  );
}
```

## Common Pitfalls & Solutions

### 1. Mixing Server and Client Code

**Problem**: Importing client-only code in Server Components

```typescript
// ❌ Wrong - This will fail
import { useState } from 'react';

export default function ServerComponent() {
  const [state, setState] = useState(0); // Error!
  return <div>{state}</div>;
}
```

**Solution**: Use proper component boundaries

```typescript
// ✅ Correct - Separate concerns
import ClientComponent from '@/components/client-component';

export default function ServerComponent() {
  return (
    <div>
      <h1>Server-rendered content</h1>
      <ClientComponent />
    </div>
  );
}
```

### 2. Serialization Errors

**Problem**: Passing non-serializable data to Client Components

```typescript
// ❌ Wrong - Functions can't be serialized
const handleClick = () => console.log('clicked');
return <ClientComponent onClick={handleClick} />;
```

**Solution**: Use Server Actions or define handlers in Client Components

```typescript
// ✅ Correct - Server Action
async function handleClick() {
  'use server';
  console.log('clicked');
}

return <ClientComponent onClick={handleClick} />;
```

### 3. Incorrect Form Handling

**Problem**: Not leveraging progressive enhancement

```typescript
// ❌ Wrong - JavaScript required
'use client';

export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only works with JavaScript
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Solution**: Use Server Actions for progressive enhancement

```typescript
// ✅ Correct - Works with and without JavaScript
'use client';

import { createPost } from '@/lib/actions';

export default function Form() {
  return (
    <form
      action={createPost}
      onSubmit={(e) => {
        // Enhanced experience with JavaScript
        e.preventDefault();
        // Handle with loading states, etc.
      }}
    >
      ...
    </form>
  );
}
```

## Performance Optimization

### 1. Minimize Client Bundle Size

- Use Server Components by default
- Only mark components as client when necessary
- Consider code splitting for large client components

### 2. Efficient Data Fetching

```typescript
// Server Component - Fetch data on server
export default async function PostPage({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true }
  });

  return <PostDetail post={post} />;
}
```

### 3. Streaming and Suspense

```typescript
// Server Component with streaming
import { Suspense } from 'react';
import PostList from '@/components/post-list';

export default function Home() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}
```

## Debugging Tips

### 1. Check Component Boundaries

- Use React DevTools to identify Server vs Client Components
- Look for hydration mismatches in the console
- Verify serialization of props between boundaries

### 2. Server Action Debugging

```typescript
'use server';

export async function debugAction(formData: FormData) {
  console.log('Server action called with:', Object.fromEntries(formData));

  try {
    // Your logic here
    return { success: true };
  } catch (error) {
    console.error('Server action error:', error);
    throw error;
  }
}
```

### 3. Network Tab Analysis

- Monitor network requests for Server Actions
- Check for proper form submissions
- Verify data serialization in request/response

## Migration Guide

### From Pages Router to App Router

#### Before (Pages Router)

```typescript
// pages/api/posts.ts
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle post creation
  }
}

// pages/posts.tsx
import { useState } from 'react';

export default function Posts({ posts }) {
  const [loading, setLoading] = useState(false);

  const createPost = async (data) => {
    setLoading(true);
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setLoading(false);
  };

  return <PostForm onSubmit={createPost} />;
}
```

#### After (App Router with Server Actions)

```typescript
// lib/actions.ts
'use server';

export async function createPost(formData: FormData) {
  // Direct database access
  await prisma.post.create({
    data: {
      title: formData.get('title'),
      content: formData.get('content')
    }
  });
}

// app/posts/page.tsx
import { createPost } from '@/lib/actions';
import PostForm from '@/components/post-form';

export default async function Posts() {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <PostForm action={createPost} />
      <PostList posts={posts} />
    </div>
  );
}
```

## Summary

The `'use server'` and `'use client'` directives represent a paradigm shift in React development:

- **Server Components** are the default, providing better performance and SEO
- **Client Components** are for interactivity and browser APIs
- **Server Actions** enable seamless server-client communication
- **Progressive Enhancement** works out of the box
- **Type Safety** is maintained across server-client boundaries

This new architecture enables building full-stack applications with better performance, developer experience, and user experience compared to traditional React applications.
