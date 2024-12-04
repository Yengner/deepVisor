'use client';

import React from 'react';
import { ads } from '@/lib/staticData';

interface AdTableProps {
  platform: string;
  adAccountId: string;
  selectedAdGroups: string[];
}

const AdTable: React.FC<AdTableProps> = ({ selectedAdGroups }) => {
  const filteredAds = selectedAdGroups.length
    ? ads.filter((ad) => selectedAdGroups.includes(ad.adGroupId))
    : ads;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Ads Overview</h2>
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Name</th>
            <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Status</th>
            <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Impressions</th>
            <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {filteredAds.map((ad) => (
            <tr key={ad.id}>
              <td className="border px-4 py-2">{ad.name}</td>
              <td className="border px-4 py-2">{ad.status}</td>
              <td className="border px-4 py-2">{ad.impressions}</td>
              <td className="border px-4 py-2">{ad.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdTable;
