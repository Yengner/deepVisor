'use client';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>My Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
