'use server';
import { prisma } from '@/lib/prisma';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  await prisma.post.create({ data: { title, content } });
}

export async function likePost(id: string) {
  const post = await prisma.post.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });
  return post.likes;
}
