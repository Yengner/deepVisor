"use client";

import React from "react";
import { useReportsSidebar } from "./ReportSidebarContext";

const MainReport = () => {
  const { isReportsSidebarOpen } = useReportsSidebar();

  return (
    <div
      className={`transition-all duration-300 ${
        isReportsSidebarOpen ? "ml-60" : "ml-16"
      } p-6`}
    >
      {/* Main Report Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports Overview</h1>
        <p className="text-gray-600 mt-2">
          View and analyze data across all platforms and ad accounts.
        </p>
      </div>

      {/* Example Dynamic Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Summary Card Example */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Platform Summary</h2>
          <p className="text-sm text-gray-600 mt-2">
            A high-level summary of all platforms integrated.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Ad Account Performance</h2>
          <p className="text-sm text-gray-600 mt-2">
            Insights into individual ad account performance.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Export Reports</h2>
          <p className="text-sm text-gray-600 mt-2">
            Download detailed PDF reports for platforms, accounts, or specific campaigns.
          </p>
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800">Detailed Reports</h2>
        <p className="text-gray-600 mt-2">
          Choose a platform or ad account from the sidebar to view detailed analytics.
        </p>
      </div>
    </div>
  );
};

export default MainReport;
