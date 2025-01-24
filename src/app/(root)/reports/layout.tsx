"use client";

import ReportsSidebar from "@/components/reports/ReportsSidebar";
import { useState } from "react";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
    const [isReportsSidebarOpen, setIsReportsSidebarOpen] = useState(true);

    // Toggle the Reports Sidebar
    const toggleReportsSidebar = () => setIsReportsSidebarOpen(!isReportsSidebarOpen);

    return (
        <div className="flex">
            {/* Reports Sidebar */}
            <ReportsSidebar isOpen={isReportsSidebarOpen} toggleSidebar={toggleReportsSidebar} />

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 ${isReportsSidebarOpen ? "ml-60" : "ml-16"} p-6`}
            >
                {children}
            </div>
        </div>
    );
};

export default ReportsLayout;
