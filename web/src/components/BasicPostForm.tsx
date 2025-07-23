'use client';
import { useState } from 'react';
import { createPost } from '@/lib/enhanced-actions';

export function BasicPostForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setMessage('');
    try {
      await createPost(formData);
      setMessage('Post created successfully!');
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    } catch (err) {
      console.error('Post creation error:', err);
      setMessage('Error creating post');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            disabled={isPending}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            disabled={isPending}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            placeholder="Enter post content"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
