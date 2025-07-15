'use client';

import { useState, useTransition, useOptimistic } from 'react';
import {
  createPost,
  likePost,
  subscribeToNewsletter,
} from '@/lib/enhanced-actions';

// Example 1: Ba      {/* This form works without JavaScript (progressive enhancement) */}
      <form
        data-newsletter
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className="space-y-4"
      >th Server Action
export function BasicPostForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setMessage('');

    try {
      await createPost(formData);
      setMessage('Post created successfully!');

      // Reset form
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
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700">
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
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700">
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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Example 2: Optimistic updates with useOptimistic
export function OptimisticPostList({
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
      // Optimistic update
      addOptimisticLike({ id, likes: currentLikes + 1 });

      try {
        await likePost(id);
      } catch (error) {
        // Revert on error (optimistic update will be reverted automatically)
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
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md transition-colors disabled:opacity-50">
              <span>👍</span>
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Example 3: Progressive Enhancement Newsletter Form
export function NewsletterForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('pending');
    setMessage('');

    try {
      const result = await subscribeToNewsletter(formData);
      setStatus('success');
      setMessage(`Successfully subscribed: ${result.email}`);

      // Reset form
      const form = document.querySelector(
        'form[data-newsletter]'
      ) as HTMLFormElement;
      form?.reset();
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Subscription failed'
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
      <p className="mb-4">Subscribe to our newsletter for the latest updates</p>

      {/* This form works without JavaScript (progressive enhancement) */}
      <form
        data-newsletter
        action={subscribeToNewsletter}
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            disabled={status === 'pending'}
            className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'pending'}
          className="w-full bg-white text-purple-600 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'pending' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            status === 'error'
              ? 'bg-red-600 bg-opacity-20'
              : 'bg-green-600 bg-opacity-20'
          }`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Example 4: Search with real-time updates
export function SearchPosts() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<
    Array<{
      id: string;
      title: string;
      excerpt: string;
      likes: number;
      createdAt: string;
    }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      // Import and use the search action
      const { searchPosts } = await import('@/lib/enhanced-actions');
      const posts = await searchPosts(searchQuery);
      setResults(posts);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useState(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Search Posts</h2>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

        <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>

        {isSearching && (
          <div className="absolute right-3 top-2.5 text-gray-400">⏳</div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          {results.map(post => (
            <div key={post.id} className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">👍 {post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {query && !isSearching && results.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No posts found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

// Example 5: File Upload with Server Action
export function FileUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    filename: string;
    size: number;
  } | null>(null);

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    setUploadResult(null);

    try {
      const { uploadImage } = await import('@/lib/enhanced-actions');
      const result = await uploadImage(formData);
      setUploadResult(result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>

      <form action={handleUpload} className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700">
            Choose Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            disabled={isUploading}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {uploadResult && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          <p>
            <strong>Upload successful!</strong>
          </p>
          <p>Filename: {uploadResult.filename}</p>
          <p>Size: {(uploadResult.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}

// Example 6: Combined Dashboard Component
export function Dashboard({
  posts,
}: {
  posts: Array<{
    id: string;
    title: string;
    content: string;
    likes: number;
    createdAt: string;
  }>;
}) {
  const [activeTab, setActiveTab] = useState<
    'create' | 'posts' | 'search' | 'newsletter' | 'upload'
  >('create');

  const tabs = [
    { id: 'create', label: 'Create Post', icon: '✏️' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'newsletter', label: 'Newsletter', icon: '📧' },
    { id: 'upload', label: 'Upload', icon: '📁' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Next.js 15+ Server Actions Demo
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'create' && (
            <div className="lg:col-span-2">
              <BasicPostForm />
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="lg:col-span-2">
              <OptimisticPostList initialPosts={posts} />
            </div>
          )}

          {activeTab === 'search' && (
            <div className="lg:col-span-2">
              <SearchPosts />
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="lg:col-span-1">
              <NewsletterForm />
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="lg:col-span-1">
              <FileUploadForm />
            </div>
          )}
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-indigo-600 mb-2">
                &apos;use server&apos; Features
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Database operations with Prisma</li>
                <li>• Form data processing</li>
                <li>• File upload handling</li>
                <li>• Server-side validation</li>
                <li>• Cache revalidation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-600 mb-2">
                &apos;use client&apos; Features
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Interactive forms and buttons</li>
                <li>• Real-time search</li>
                <li>• Optimistic updates</li>
                <li>• Loading states</li>
                <li>• Client-side validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
