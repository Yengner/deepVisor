"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ReportsSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const ReportsSidebar = ({ isOpen, toggleSidebar }: ReportsSidebarProps) => {
  const platforms = [
    {
      name: "Meta",
      adAccounts: ["Account 1", "Account 2"],
    },
    {
      name: "Google",
      adAccounts: ["Account 1", "Account 2", "Account 3"],
    },
    {
      name: "TikTok",
      adAccounts: [],
    },
  ];

  const [expandedMain, setExpandedMain] = useState<string | null>(null);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null); 
  const pathname = usePathname(); 
  const toggleMain = (main: string) => {
    setExpandedMain(expandedMain === main ? null : main);
  };

  const togglePlatform = (platform: string) => {
    setExpandedPlatform(expandedPlatform === platform ? null : platform);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={`fixed top-16 left-16 h-[calc(100vh-4rem)] bg-gray-50 shadow-md transition-all duration-300 z-30 border-l ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <h2 className="text-lg font-semibold text-gray-900">Reports</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 rounded-md hover:bg-gray-200"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-6 h-6" />
          ) : (
            <ChevronRightIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="mt-4 space-y-1">
        <li>
          <Link
            href="/reports"
            className={`block px-4 py-2 rounded-md ${
              isActive("/reports/overview")
                ? "bg-blue-100 text-gray-900"
                : "hover:bg-gray-200 text-gray-900"
            } ${isOpen ? "" : "hidden"}`}
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            href="/reports"
            className={`block px-4 py-2 rounded-md ${
              isActive("/reports") ? "bg-blue-100 text-gray-900" : "hover:bg-gray-200 text-gray-900"
            } ${isOpen ? "" : "hidden"}`}
          >
            Snapshot
          </Link>
        </li>

        {/* Border */}
        <div
          className={`pt-4 ${
            isOpen ? "ml-4 w-[calc(100%-2rem)]" : "hidden"
          } border-b border-gray-300`}
        />

        {/* Platforms Dropdown */}
        <li>
          <div className="group pt-4">
            <div
              onClick={() => toggleMain("Platforms")}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 ${
                isOpen ? "text-gray-600" : "hidden"
              }`}
            >
              Platforms
              {isOpen && <ChevronDownIcon className="w-4 h-4" />}
            </div>
            {isOpen && expandedMain === "Platforms" && (
              <ul className="ml-4 mt-2 space-y-1">
                {platforms.map((platform) => (
                  <li key={platform.name}>
                    <div
                      onClick={() => togglePlatform(platform.name)}
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-200 ${
                        expandedPlatform === platform.name
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      {platform.name}
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                    {expandedPlatform === platform.name && (
                      <ul className="ml-6 mt-1 space-y-1">
                        <li>
                          <Link
                            href={`/reports/platforms/${platform.name.toLowerCase()}`}
                            className="block px-4 py-2 text-sm rounded-md hover:bg-gray-200"
                          >
                            Overview
                          </Link>
                        </li>
                        {platform.adAccounts.length > 0 ? (
                          platform.adAccounts.map((account, index) => (
                            <li key={index}>
                              <Link
                                href={`/reports/platforms/${platform.name.toLowerCase()}/${account
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                                className="block px-4 py-2 text-sm rounded-md hover:bg-gray-200"
                              >
                                {account}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500 italic">
                            No ad account
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>

        {/* Border */}
        <div
          className={`pt-4 ${
            isOpen ? "ml-4 w-[calc(100%-2rem)]" : "hidden"
          } border-b border-gray-300`}
        />

        <li className="pt-4">
          <Link
            href="/reports"
            className={`block px-4 py-2 rounded-md ${
              isActive("/reports/export")
                ? "bg-blue-100 text-gray-900"
                : "hover:bg-gray-200 text-gray-900"
            } ${isOpen ? "" : "hidden"}`}
          >
            Trends & Insights
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ReportsSidebar;
