'use client';

interface CampaignMetric {
    id: number;
    name: string;
    objective: string;
    status: string;
    ad_account_id: {
        name: string;
    }
    raw_data: {
        insights: {
            data: [
                {
                    spend: number;
                    impressions: number;
                }
            ]

        }
    }
};

interface TopCampaignsProps {
    campaigns: CampaignMetric[];
}

const TopCampaignsTable = ({ campaigns }: TopCampaignsProps) => {
    return (
        <div className="pl-4 pr-4 max-h-56 overflow-y-scroll">
            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-500">
                        <th className="border-b py-2">Campaign Name</th>
                        <th className="border-b py-2">Ad Account</th>
                        <th className="border-b py-2">Objective</th>
                        <th className="border-b py-2">Campaign Status</th>
                        <th className="border-b py-2">Spend</th>
                        {/* <th className="border-b py-2">Impressions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign.id}>
                            <td className="border-b py-3 pl-2 font-medium text-gray-800 max-w-60 truncate p-2">{campaign.name}</td>
                            <td className="border-b py-3">{campaign.ad_account_id.name}</td>
                            <td className="border-b py-3 text-gray-700 font-medium">{campaign.objective}</td>
                            <td className="border-b p-5">
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
                            <td className="border-b py-3 text-green-600 font-medium">${campaign.raw_data.insights?.data[0]?.spend?.toLocaleString() ?? '0'}</td>
                            {/* <td className="border-b py-3 text-center text-gray-700 font-medium">{Number(campaign.raw_data.insights?.data[0]?.impressions)?.toLocaleString() ?? '0'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopCampaignsTable;
