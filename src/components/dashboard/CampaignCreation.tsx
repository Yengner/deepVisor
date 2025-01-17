'use client';

import React from 'react';

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow space-y-6 relative">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
      <ul className="space-y-4">
        {/* Create Campaign */}
        <li className="relative group">
          <button
            className="w-full bg-blue-500 text-white text-lg px-6 py-4 rounded-lg shadow disabled-button group-hover:opacity-70 cursor-not-allowed relative"
            disabled
          >
            Create Campaign
          </button>
          <div className="coming-soon-overlay">
            <span>Coming Soon</span>
          </div>
        </li>

        {/* View Performance */}
        <li className="relative group">
          <button
            className="w-full bg-green-500 text-white text-lg px-6 py-4 rounded-lg shadow disabled-button group-hover:opacity-70 cursor-not-allowed relative"
            disabled
          >
            View Performance
          </button>
          <div className="coming-soon-overlay">
            <span>Coming Soon</span>
          </div>
        </li>

        {/* Adjust Budget */}
        <li className="relative group">
          <button
            className="w-full bg-yellow-500 text-white text-lg px-6 py-4 rounded-lg shadow disabled-button group-hover:opacity-70 cursor-not-allowed relative"
            disabled
          >
            Adjust Budget
          </button>
          <div className="coming-soon-overlay">
            <span>Coming Soon</span>
          </div>
        </li>

        {/* Add More Actions */}
        <li className="relative group">
          <button
            className="w-full bg-red-500 text-white text-lg px-6 py-4 rounded-lg shadow disabled-button group-hover:opacity-70 cursor-not-allowed relative"
            disabled
          >
            Add More Actions
          </button>
          <div className="coming-soon-overlay">
            <span>Coming Soon</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default QuickActions;
