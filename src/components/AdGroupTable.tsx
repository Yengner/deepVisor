'use client';

import React from 'react';
import { adGroups } from '@/lib/staticData';

interface AdGroupTableProps {
    platform: string;
    adAccountId: string;
    selectedCampaigns: string[];
    onSelect: (selectedIds: string[]) => void;
}

const AdGroupTable: React.FC<AdGroupTableProps> = ({ selectedCampaigns, onSelect }) => {
    const filteredAdGroups = selectedCampaigns.length
        ? adGroups.filter((group) => selectedCampaigns.includes(group.campaignId))
        : adGroups;

    const handleSelect = (adGroupId: string) => {
        onSelect([adGroupId]);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 overflow-x-auto">
            <h2 className="text-lg font-bold mb-4">Ad Groups Overview</h2>
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Name</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Status</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdGroups.map((group) => (
                        <tr key={group.id}>
                            <td className="border px-4 py-2">{group.name}</td>
                            <td className="border px-4 py-2">{group.status}</td>
                            <td className="border px-4 py-2">{group.budget}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleSelect(group.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Select
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdGroupTable;
