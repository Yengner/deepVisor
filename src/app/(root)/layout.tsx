'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Initialize QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="relative h-screen bg-gray-100 dark:bg-gray-900">
        <QueryClientProvider client={queryClient}>
          {/* Sidebar and TopBar are shared components */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col h-full">
            <TopBar />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
          {/* ReactQuery Devtools for debugging */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
