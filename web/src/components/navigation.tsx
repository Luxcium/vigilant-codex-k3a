'use client';

import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <button onClick={() => router.push('/')} className="hover:underline">
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push('/small-chat')}
            className="hover:underline">
            Small Chat
          </button>
        </li>
      </ul>
    </nav>
  );
}
