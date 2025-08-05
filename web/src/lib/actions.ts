'use server';
import { createPost, likePost } from './enhanced-actions';

// Export each async function individually to comply with Next.js server action requirements
export async function createPost(formData: FormData) {
  return await (await import('./enhanced-actions')).createPost(formData);
}

export async function likePost(id: string) {
  return await (await import('./enhanced-actions')).likePost(id);
}

// =======
// import { prisma } from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';

// export async function createPost(formData: FormData) {
//   const title = formData.get('title') as string;
//   const content = formData.get('content') as string;

//   if (!title || !content) {
//     throw new Error('Title and content are required');
// }
//   await prisma.post.create({ data: { title, content } });
//   revalidatePath('/');
// }

// export async function likePost(id: string) {
//   const post = await prisma.post.update({
//     where: { id },
//     data: { likes: { increment: 1 } },
//   });
//   revalidatePath('/');
//   return post.likes;
// }
