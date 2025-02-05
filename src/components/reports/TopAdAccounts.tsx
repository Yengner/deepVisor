'use client';

import Image from 'next/image';

interface AdAccountMetric {
  id: string;
  name: string;
  account_status: string;
  platform_name: string
  aggregated_metrics: {
    spend: number;
    impressions: number;
    clicks: number;
    link_clicks: number;
    leads: number;
    messages: number;
    ctr: number;
    cpc: number;
    cpm: number;
  } | null;
}

interface TopAdAccountsProps {
  adAccounts: AdAccountMetric[];
}

const getStatusLabel = (status: string): string => {
  switch (status) {
    case '1':
      return 'Active';
    case '2':
      return 'Disabled';
    case '3':
      return 'Pending Review';
    case '4':
      return 'Inactive';
    default:
      return 'Unknown';
  }
};

const TopAdAccountsTable = ({ adAccounts }: TopAdAccountsProps) => {
  return (
    <div className="pl-4 pr-4 max-h-56 overflow-y-scroll">
      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500">
            <th className="border-b py-2">Ad Account</th>
            <th className="border-b py-2">Platform</th>
            <th className="border-b py-2">Status</th>
            <th className="border-b py-2 text-right">Spend</th>
            <th className="border-b py-2 text-right">Impressions</th>
            <th className="border-b py-2 text-right">Clicks</th>
            <th className="border-b py-2 text-right">Link Clicks</th>
            <th className="border-b py-2 text-right">Leads</th>
            <th className="border-b py-2 text-right">Messages</th>
            <th className="border-b py-2 text-right">CTR</th>
          </tr>
        </thead>
        <tbody>
          {adAccounts.map((account) => (
            <tr key={account.id}>
              {/* Account Name */}
              <td className="border-b py-3">
                <span className="font-medium text-gray-700 capitalize">
                  {account.name}
                </span>
              </td>

              {/* Platform */}
              <td className="border-b py-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={`/images/platforms/logo/${account.platform_name.toLowerCase()}.png`}
                    alt={`${account.platform_name} logo`}
                    className="fill"
                    width={32}
                    height={32}
                  />
                </div>
              </td>

              {/* Status */}
              <td className="border-b py-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${account.account_status === '1'
                    ? 'bg-green-100 text-green-600'
                    : account.account_status === '2'
                      ? 'bg-red-100 text-red-600'
                      : account.account_status === '3'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {getStatusLabel(account.account_status)}
                </span>
              </td>

              {/* Spend */}
              <td className="border-b py-3 text-right text-green-600 font-medium">
                ${account.aggregated_metrics?.spend?.toLocaleString() ?? '0'}
              </td>
              {/* Impressions */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.impressions?.toLocaleString() ?? '0'}
              </td>
              {/* Clicks */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.clicks?.toLocaleString() ?? '0'}
              </td>
              {/* Link Clicks */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.link_clicks?.toLocaleString() ?? '0'}
              </td>
              {/* Leads */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.leads?.toLocaleString() ?? '0'}
              </td>
              {/* Messages */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.messages?.toLocaleString() ?? '0'}
              </td>
              {/* CTR */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {account.aggregated_metrics?.ctr?.toLocaleString() ?? '0'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAdAccountsTable;
