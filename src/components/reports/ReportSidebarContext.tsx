"use client";

import React, { createContext, useContext, useState } from "react";

type ReportsSidebarContextType = {
  isReportsSidebarOpen: boolean;
  toggleReportsSidebar: () => void;
};

// Create the context
const ReportsSidebarContext = createContext<ReportsSidebarContextType | undefined>(undefined);

// Provider component
export const ReportsSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReportsSidebarOpen, setIsReportsSidebarOpen] = useState(true);

  const toggleReportsSidebar = () => {
    setIsReportsSidebarOpen((prev) => !prev);
  };

  return (
    <ReportsSidebarContext.Provider value={{ isReportsSidebarOpen, toggleReportsSidebar }}>
      {children}
    </ReportsSidebarContext.Provider>
  );
};

// Custom hook to use the context
export const useReportsSidebar = () => {
  const context = useContext(ReportsSidebarContext);
  if (!context) {
    throw new Error("useReportsSidebar must be used within a ReportsSidebarProvider");
  }
  return context;
};
