---
applyTo: 'web/src/**/*.{ts,tsx}'
description: 'Prisma ORM integration with Next.js Server Actions and database operations'
---

# Prisma with Next.js Server Actions

## Database Integration Standards

### Prisma Client Setup

- Use singleton pattern for Prisma client in production
- Implement proper connection pooling
- Configure database URL from environment variables
- Handle connection errors gracefully
- Ensure client is properly disposed in development

### Schema Definition Rules

- Use UUID for primary keys with default generation
- Implement proper timestamp fields with automatic defaults
- Define clear relationships between models
- Use appropriate field types for data validation
- Include proper indexing for performance optimization

## Server Action Implementation

### Database Operations Pattern

```typescript
// lib/actions.ts
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Validate input
    if (!title || !content) {
      throw new Error('Title and content are required');
    }

    // Create database record
    const post = await prisma.post.create({
      data: {
        title,
        content,
        likes: 0,
      },
    });

    // Revalidate cache
    revalidatePath('/posts');

    return { success: true, post };
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Failed to create post');
  }
}
```

### Query Optimization Rules

- Use select to limit returned fields
- Implement proper pagination with cursor-based pagination
- Use include/select for related data fetching
- Implement proper error handling for database operations
- Use transactions for complex multi-table operations

## Data Fetching Patterns

### Server Component Data Fetching

```typescript
// app/posts/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      title: true,
      content: true,
      likes: true,
      createdAt: true
    }
  });

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{post.likes} likes</small>
        </article>
      ))}
    </div>
  );
}
```

### Dynamic Route Data Fetching

```typescript
// app/posts/[id]/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

## Form Handling with Server Actions

### Form Component Pattern

```tsx
// components/post-form.tsx
'use client';
import { createPost } from '@/lib/actions';
import { useState } from 'react';

export default function PostForm() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      await createPost(formData);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Post title"
        required
        disabled={isPending}
      />
      <textarea
        name="content"
        placeholder="Post content"
        required
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

### Optimistic Updates Pattern

```tsx
// components/like-button.tsx
'use client';
import { useState, useOptimistic } from 'react';
import { likePost } from '@/lib/actions';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (state, increment: number) => state + increment
  );

  const handleLike = async () => {
    setOptimisticLikes(1);
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return <button onClick={handleLike}>{optimisticLikes} 👍</button>;
}
```

## Environment Configuration

### Database URL Setup

```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### Development Environment

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## Schema Migration Standards

### Migration Workflow

1. Modify schema.prisma file
2. Run `npx prisma migrate dev --name description`
3. Generate client with `npx prisma generate`
4. Update TypeScript types if needed
5. Test migration with existing data

### Schema Example

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  likes     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

## Error Handling Standards

### Server Action Error Handling

```typescript
// lib/actions.ts
'use server';
import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function updatePost(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return { success: true, post };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A post with this title already exists');
      }
      if (error.code === 'P2025') {
        throw new Error('Post not found');
      }
    }
    throw new Error('Failed to update post');
  }
}
```

### Connection Error Handling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

// Handle connection errors
prisma.$connect().catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});
```

## Performance Optimization

### Query Optimization

```typescript
// Efficient pagination
export async function getPosts(cursor?: string, take = 10) {
  const posts = await prisma.post.findMany({
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      likes: true,
      createdAt: true,
    },
  });

  return posts;
}
```

### Caching Strategy

```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

export const getCachedPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  },
  ['posts'],
  {
    tags: ['posts'],
    revalidate: 60, // Cache for 60 seconds
  }
);
```

## Testing Standards

### Database Testing Setup

```typescript
// tests/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_TEST,
    },
  },
});

beforeEach(async () => {
  await prisma.post.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

### Server Action Testing

```typescript
// tests/actions.test.ts
import { createPost } from '@/lib/actions';

describe('createPost', () => {
  it('should create a post successfully', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Post');
    formData.append('content', 'Test Content');

    const result = await createPost(formData);

    expect(result.success).toBe(true);
    expect(result.post.title).toBe('Test Post');
  });

  it('should throw error for missing title', async () => {
    const formData = new FormData();
    formData.append('content', 'Test Content');

    await expect(createPost(formData)).rejects.toThrow(
      'Title and content are required'
    );
  });
});
```

## Quality Assurance Checklist

### Database Schema Validation

- [ ] All models have proper primary keys
- [ ] Relationships are correctly defined
- [ ] Indexes are created for performance
- [ ] Field types match expected data
- [ ] Constraints are properly implemented

### Server Action Validation

- [ ] Input validation is implemented
- [ ] Error handling covers all scenarios
- [ ] Cache revalidation is called appropriately
- [ ] Return values are serializable
- [ ] Database operations are wrapped in try-catch

### Performance Validation

- [ ] Queries are optimized with proper selects
- [ ] Pagination is implemented for large datasets
- [ ] Connection pooling is configured
- [ ] Database indexes are utilized
- [ ] Caching strategy is implemented

## Documentation References

### Official Documentation

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Project-Specific Files

- [prisma/schema.prisma](../../prisma/schema.prisma) - Database schema
- [web/src/lib/prisma.ts](../../web/src/lib/prisma.ts) - Prisma client setup
- [web/src/lib/actions.ts](../../web/src/lib/actions.ts) - Server actions
- [docker-compose.yml](../../docker-compose.yml) - Database service
