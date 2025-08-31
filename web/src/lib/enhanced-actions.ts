'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Types and interfaces
export interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  archived?: boolean;
}

export interface PostSummary {
  id: string;
  title: string;
  excerpt: string;
  likes: number;
  createdAt: string;
}

export interface UploadResult {
  filename: string;
  size: number;
}

export interface NewsletterResult {
  success: boolean;
  email: string;
}

export interface BatchUpdateResult {
  updatedCount: number;
}

// Example 1: Basic Server Action with form handling
export async function createPost(formData: FormData): Promise<Post> {
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
export async function likePost(id: string): Promise<number> {
  const post = await prisma.post.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });

  // Revalidate to update cached data
  revalidatePath('/');

  return post.likes;
}

// Example 3: Server Action with authentication check
export async function deletePost(id: string): Promise<void> {
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
export async function createAndRedirect(formData: FormData): Promise<never> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await prisma.post.create({
    data: { title, content },
  });

  // Redirect to the new post
  redirect(`/posts/${post.id}`);
}

// Example 5: Server Action with custom validation and error handling
export interface UpdatePostResult {
  success: boolean;
  error?: string;
}

export async function updatePost(
  id: string,
  formData: FormData
): Promise<UpdatePostResult> {
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
export async function searchPosts(query: string): Promise<PostSummary[]> {
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
  return posts.map(
    (post): PostSummary => ({
      id: post.id,
      title: post.title,
      excerpt: post.content.substring(0, 100) + '...',
      likes: post.likes,
      createdAt: post.createdAt.toISOString(),
    })
  );
}

// Mock function for authentication example
async function getCurrentUserId(): Promise<string | null> {
  // In a real app, this would check cookies, JWT tokens, etc.
  return 'user-123';
}

// Example 7: Server Action with file upload handling
export async function uploadImage(formData: FormData): Promise<UploadResult> {
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

// Example 8 removed: inline server action factory pattern was unused and
// triggered Next.js rule about exported server actions. If needed later,
// prefer exporting a direct `export async function toggleLike(postId: string)`.

// Example 9: Server Action with progressive enhancement
export async function subscribeToNewsletter(
  formData: FormData
): Promise<NewsletterResult> {
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
export type BatchAction = 'delete' | 'archive';

export async function batchUpdatePosts(
  ids: string[],
  action: BatchAction
): Promise<BatchUpdateResult> {
  const updates = ids.map(id => {
    if (action === 'delete') {
      return prisma.post.delete({ where: { id } });
    } else {
      // Archive by prefixing the title to avoid schema changes
      return prisma.post.update({
        where: { id },
        data: { title: { set: '[archived] ' } },
      });
    }
  });

  await Promise.all(updates);

  revalidatePath('/');

  return { updatedCount: ids.length };
}
