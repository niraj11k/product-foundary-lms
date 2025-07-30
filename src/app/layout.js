// src/app/layout.js

import './globals.css';

import { SupabaseProvider } from '@/components/SupabaseProvider';

export const metadata = {
  title: 'Product Foundary LMS Portal - Dev ',
  description: 'A modern AI learning management system.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
          {/* <main className="p-4 sm:p-6 md:p-8">
            {children}
          </main> */}
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
      </body>
    </html>
  );
}