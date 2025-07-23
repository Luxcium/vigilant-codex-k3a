'use client';
import { useState } from 'react';
import { likePost } from '@/lib/basic-actions';

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [likesState, setLikesState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const post of posts) {
      initial[post.id] = post.likes;
    }
    return initial;
  });

  const handleLike = async (postId: string) => {
    try {
      const updatedLikes = await likePost(postId);
      setLikesState(prev => ({ ...prev, [postId]: updatedLikes }));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No posts yet. Create your first post!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="flex items-center justify-between">
            <small className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
              <span>👍</span>
              <span>{likesState[post.id] || 0}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
