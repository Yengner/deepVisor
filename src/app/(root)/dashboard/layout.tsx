'use client';

import { ReactNode } from 'react';
import TopBar from '@/components/TopBar';
import RightSidebar from '@/components/dashboard/RightSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* TopBar */}
      <TopBar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-6 bg-[#f8f8fa] custom-scrollbar"
        >
          {children}
        </main>

        {/* Right Sidebar */}
        <div className="w-60 h-full">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
