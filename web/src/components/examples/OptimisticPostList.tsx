'use client';
import { useTransition, useOptimistic } from 'react';
import { likePost } from '@/lib/enhanced-actions';

export default function OptimisticPostList({
  initialPosts,
}: {
  initialPosts: Array<{
    id: string;
    title: string;
    content: string;
    likes: number;
    createdAt: string;
  }>;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPosts, addOptimisticLike] = useOptimistic(
    initialPosts,
    (state, { id, likes }: { id: string; likes: number }) =>
      state.map(post => (post.id === id ? { ...post, likes } : post))
  );

  const handleLike = (id: string, currentLikes: number) => {
    startTransition(async () => {
      addOptimisticLike({ id, likes: currentLikes + 1 });
      try {
        await likePost(id);
      } catch (error) {
        console.error('Like failed:', error);
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Posts</h2>
      {optimisticPosts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-3">{post.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <button
              onClick={() => handleLike(post.id, post.likes)}
              disabled={isPending}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
            >
              <span>👍</span>
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
