'use client';

import { ReactNode } from 'react';
import TopBar from '@/components/TopBar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      {/* TopBar with Selector */}
      <TopBar/>
      
      {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
    </div>
  );
}
