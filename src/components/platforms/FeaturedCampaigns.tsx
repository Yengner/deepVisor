'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Campaign {
    campaign_id: string;
    campaign_name: string;
    status: string;
    spend: number;
    conversion: number;
    conversion_rate: number;
}

interface AdAccount {
    ad_account_id: string;
    ad_account_name: string;
}

interface CampaignMetrics {
    [adAccountId: string]: Campaign[];
}

interface FeaturedCampaignsProps {
    data: {
        topAdAccounts: AdAccount[];
        campaignMetrics: CampaignMetrics;
    };
    isReportsSidebarOpen: boolean;
}



const FeaturedCampaigns = ({ data, isReportsSidebarOpen }: FeaturedCampaignsProps) => {
    const { topAdAccounts = [], campaignMetrics = {} } = data || {};
    const slicedAdAccounts = topAdAccounts.slice(0, 3)

    const [activeAdAccountId, setActiveAdAccountId] = useState(
        slicedAdAccounts.length > 0 ? slicedAdAccounts[0].ad_account_id : ''
    );

    // Filter campaigns for the active ad account
    const filteredCampaigns = campaignMetrics[activeAdAccountId] || [];

    return (
        <div
            className={`transition-all duration-300 bg-white shadow-lg p-6 rounded-lg ${isReportsSidebarOpen ? 'w-[calc(90%-4rem)]' : 'w-[calc(100%-4rem)]'
                }`}

        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Featured Campaigns</h2>
                    <p className="text-sm text-gray-500">Highlighting top ad accounts and campaigns</p>
                </div>
            </div>

            {/* Ad Account Tabs */}
            <div className="flex space-x-4 mb-4">
                {slicedAdAccounts.map((account) => (
                    <button
                        key={account.ad_account_id}
                        onClick={() => setActiveAdAccountId(account.ad_account_id)}
                        className={`px-4 py-2 rounded ${activeAdAccountId === account.ad_account_id
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {account.ad_account_name}
                    </button>
                ))}
            </div>

            {/* Campaigns Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">Campaign Name</th>
                        <th className="border-b p-2">Status</th>
                        <th className="border-b p-2">Spend</th>
                        <th className="border-b p-2">Conversion</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCampaigns.length > 0 ? (
                        filteredCampaigns.map((campaign) => (
                            <tr key={campaign.campaign_id}>
                                <td className="border-b p-2 max-w-60 truncate overflow-hidden text-ellipsis">
                                    <Link
                                        href={`/analytics/${campaign.campaign_id}`}
                                        className="text-gray-700 hover:underline"
                                    >
                                        {campaign.campaign_name}
                                    </Link>
                                </td>
                                <td className="border-b p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${campaign.status === 'ACTIVE'
                                            ? 'bg-green-100 text-green-600'
                                            : campaign.status === 'PAUSED'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}
                                    >
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="border-b p-2">${campaign.spend.toFixed(2)}</td>
                                <td className="border-b p-2">
                                    {`${campaign.conversion_rate.toFixed(2)}% (${formatNumber(campaign.conversion)})`}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center p-4 text-gray-500">
                                No campaigns available for this ad account.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FeaturedCampaigns;

function formatNumber(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`; // Format millions
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}k`; // Format thousands
    } else {
        return value.toString(); // Return as is for smaller numbers
    }
}
