'use client';

import React from 'react';
import { campaigns } from '@/lib/staticData';

interface CampaignTableProps {
    platform: string;
    adAccountId: string;
    onSelect: (selectedIds: string[]) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ onSelect }) => {
    const handleSelect = (campaignId: string) => {
        onSelect([campaignId]);
    };

    const columns = [
        { id: 'checkbox', label: 'On/Off' },
        { id: 'name', label: 'Name' },
        { id: 'status', label: 'Status' },
        { id: 'delivery_optimization', label: 'Delivery Optimization' },
        { id: 'budget', label: 'Budget' },
        { id: 'cost', label: 'Cost' },
        { id: 'cpc', label: 'CPC (destination)' },
        { id: 'cpm', label: 'CPM' },
        { id: 'impressions', label: 'Impressions' },
        { id: 'clicks', label: 'Clicks (destination)' },
        { id: 'ctr', label: 'CTR (destination)' },
        { id: 'conversions', label: 'Conversions' },
        { id: 'cost_per_conversion', label: 'Cost per Conversion' },
        { id: 'conversion_rate', label: 'Conversion Rate (CVR)' },
        { id: 'results', label: 'Results' },
        { id: 'cost_per_result', label: 'Cost per Result' },
        { id: 'result_rate', label: 'Result Rate' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Campaign Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-max w-full table-auto border-collapse border">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="px-4 py-2 border-b text-left font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelect(campaign.id)}
                                        className="form-checkbox"
                                    />
                                </td>
                                <td className="border px-4 py-2">{campaign.name}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${campaign.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                                            }`}
                                    >
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">Campaign Paused</td>
                                <td className="border px-4 py-2">$50.00</td>
                                <td className="border px-4 py-2">$0.00</td>
                                <td className="border px-4 py-2">$0.00</td>
                                <td className="border px-4 py-2">$0.00</td>
                                <td className="border px-4 py-2">0</td>
                                <td className="border px-4 py-2">0</td>
                                <td className="border px-4 py-2">0.00%</td>
                                <td className="border px-4 py-2">0</td>
                                <td className="border px-4 py-2">$0.00</td>
                                <td className="border px-4 py-2">0.00%</td>
                                <td className="border px-4 py-2">-</td>
                                <td className="border px-4 py-2">-</td>
                                <td className="border px-4 py-2">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignTable;
