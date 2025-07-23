'use client';
import { useState } from 'react';

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

  useEffect(() => {
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
        {isSearching && <div className="absolute right-3 top-2.5 text-gray-400">⏳</div>}
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
        <div className="mt-4 text-center text-gray-500">No posts found for &quot;{query}&quot;</div>
      )}
    </div>
  );
}
