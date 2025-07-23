'use client';
import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/enhanced-actions';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('pending');
    setMessage('');
    try {
      const result = await subscribeNewsletter(formData);
      setStatus('success');
      setMessage(`Successfully subscribed: ${result.email}`);
      const form = document.querySelector('form[data-newsletter]') as HTMLFormElement;
      form?.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Subscription failed');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
      <p className="mb-4">Subscribe to our newsletter for the latest updates</p>
      <form
        data-newsletter
        action={subscribeNewsletter}
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className="space-y-4"
      >
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
          className="w-full bg-white text-purple-600 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'pending' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded-md ${status === 'error' ? 'bg-red-600 bg-opacity-20' : 'bg-green-600 bg-opacity-20'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
