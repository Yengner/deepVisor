'use client';

interface TopAccountsProps {
  accounts: { accountName: string; platform: string; spend: number; leads: number }[];
}

const TopAccounts = ({ accounts }: TopAccountsProps) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-4">Top Accounts</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">Account</th>
          <th className="border-b p-2">Platform</th>
          <th className="border-b p-2">Spend</th>
          <th className="border-b p-2">Leads</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, index) => (
          <tr key={index}>
            <td className="border-b p-2">{account.accountName}</td>
            <td className="border-b p-2 capitalize">{account.platform}</td>
            <td className="border-b p-2">${account.spend.toLocaleString()}</td>
            <td className="border-b p-2">{account.leads}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TopAccounts;
