'use client';
import { useState } from 'react';
import { createPost } from '@/lib/basic-actions';

export default function PostForm() {
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      await createPost(formData);

      // Reset form
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={isPending}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          disabled={isPending}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter post content"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
