'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast'; // Import Toaster for toast notifications
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import GlobalWrapper from '@/components/GlobalWrapper';
import '../../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());


  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      {/* Application Layout */}
      <div className="flex flex-col h-screen">
        {/* Shared Components: Sidebar and TopBar */}
        <Sidebar />
        <TopBar />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col">
          <GlobalWrapper>
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </GlobalWrapper>
        </div>
      </div>

      {/* ReactQuery Devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
