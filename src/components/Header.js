import Link from 'next/link';
import { IconBookOpen, IconGift } from './Icons';
import SignOutButton from './SignOutButton';

export default function Header({ user }) {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <IconBookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Product Foundary LMS Portal</h1>
          </Link>
          <Link href="/free-content" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <IconGift className="w-5 h-5" />
            <span>Free Content</span>
          </Link>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        )}
      </div>
    </header>
  );
}