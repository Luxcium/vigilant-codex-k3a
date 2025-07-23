'use client';
import { useState } from 'react';
import { BasicPostForm } from './BasicPostForm';
import { OptimisticPostList } from './OptimisticPostList';
import { SearchPosts } from './SearchPosts';
import { NewsletterForm } from './NewsletterForm';
import { FileUploadForm } from './FileUploadForm';

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
  const [activeTab, setActiveTab] = useState<'create' | 'posts' | 'search' | 'newsletter' | 'upload'>('create');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Next.js 15+ Server Actions Demo</h1>
        <div className="flex space-x-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
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
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-indigo-600 mb-2">'use server' Features</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Database operations with Prisma</li>
                <li>• Form data processing</li>
                <li>• File upload handling</li>
                <li>• Server-side validation</li>
                <li>• Cache revalidation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-600 mb-2">'use client' Features</h3>
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
