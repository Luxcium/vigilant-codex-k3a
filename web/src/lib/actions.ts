'use server';
export { createPost, likePost } from './enhanced-actions';

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
