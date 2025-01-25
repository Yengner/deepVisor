"use client";

import { ReportsSidebarProvider, useReportsSidebar } from "@/components/reports/ReportSidebarContext";
import ReportsSidebar from "@/components/reports/ReportsSidebar";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReportsSidebarProvider>
      <ReportsLayoutContent>{children}</ReportsLayoutContent>
    </ReportsSidebarProvider>
  );
};

// Separate component to use the context
const ReportsLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isReportsSidebarOpen, toggleReportsSidebar } = useReportsSidebar();

  return (
    <div className="flex">
      {/* Reports Sidebar */}
      <ReportsSidebar isOpen={isReportsSidebarOpen} toggleSidebar={toggleReportsSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isReportsSidebarOpen ? "ml-52" : "ml-16"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ReportsLayout;
