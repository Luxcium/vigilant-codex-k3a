import { prisma } from '@/lib/prisma';
import PostForm from '@/components/post-form';
import PostList from '@/components/post-list';

export default async function Home() {
  // Fetch posts on server
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      title: true,
      content: true,
      likes: true,
      createdAt: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Next.js v15 + Prisma + PostgreSQL
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Post</h2>
          <PostForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
