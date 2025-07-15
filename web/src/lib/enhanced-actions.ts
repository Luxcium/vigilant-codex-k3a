'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Example 1: Basic Server Action with form handling
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Validation
  if (!title || !content) {
    throw new Error('Title and content are required');
  }

  // Database operation
  const post = await prisma.post.create({
    data: { title, content },
  });

  // Revalidate the page to show new post
  revalidatePath('/');

  return post;
}

// Example 2: Server Action with return value for optimistic updates
export async function likePost(id: string) {
  const post = await prisma.post.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });

  // Revalidate to update cached data
  revalidatePath('/');

  return post.likes;
}

// Example 3: Server Action with authentication check
export async function deletePost(id: string) {
  // In a real app, you'd check authentication
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath('/');
}

// Example 4: Server Action with redirect
export async function createAndRedirect(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await prisma.post.create({
    data: { title, content },
  });

  // Redirect to the new post
  redirect(`/posts/${post.id}`);
}

// Example 5: Server Action with custom validation and error handling
export async function updatePost(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Custom validation
    if (title.length < 5) {
      return { success: false, error: 'Title must be at least 5 characters' };
    }

    await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Update error:', err);
    return { success: false, error: 'Failed to update post' };
  }
}

// Example 6: Server Action with complex data transformation
export async function searchPosts(query: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  // Transform data for client
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.substring(0, 100) + '...',
    likes: post.likes,
    createdAt: post.createdAt.toISOString(),
  }));
}

// Mock function for authentication example
async function getCurrentUserId(): Promise<string | null> {
  // In a real app, this would check cookies, JWT tokens, etc.
  return 'user-123';
}

// Example 7: Server Action with file upload handling
export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File;

  if (!file) {
    throw new Error('No file uploaded');
  }

  // In a real app, you'd save to cloud storage
  const buffer = await file.arrayBuffer();
  const filename = `uploads/${Date.now()}-${file.name}`;

  // Mock saving file
  console.log(`Saving file: ${filename}, size: ${buffer.byteLength} bytes`);

  return { filename, size: buffer.byteLength };
}

// Example 8: Inline Server Action pattern (for use in Server Components)
export function createInlineAction(postId: string) {
  async function toggleLike() {
    'use server';

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { likes: true },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });

    revalidatePath('/');
  }

  return toggleLike;
}

// Example 9: Server Action with progressive enhancement
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    throw new Error('Valid email required');
  }

  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`Subscribed: ${email}`);

  // Return data for client-side updates
  return { success: true, email };
}

// Example 10: Server Action with batch operations
export async function batchUpdatePosts(
  ids: string[],
  action: 'delete' | 'archive'
) {
  const updates = ids.map(id => {
    if (action === 'delete') {
      return prisma.post.delete({ where: { id } });
    } else {
      return prisma.post.update({
        where: { id },
        data: { archived: true },
      });
    }
  });

  await Promise.all(updates);

  revalidatePath('/');

  return { updatedCount: ids.length };
}
