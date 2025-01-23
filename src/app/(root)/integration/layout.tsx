import { ReactNode } from 'react';
import TopBar from '@/components/layout/topBar/TopBar';
import LeftSidebar from '@/components/dashboard/LeftSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* TopBar */}
      <TopBar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Right Sidebar */}
        <div className="max-w-52 h-full">
          <LeftSidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f8fa] custom-scrollbar">
          {children}
        </main>

      </div>
    </div>
  );
}
