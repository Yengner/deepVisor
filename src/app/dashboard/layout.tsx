'use client';  

import { Suspense } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <header>
          <h1>My Dashboard</h1>
        </header>
        <main>{children}</main>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
