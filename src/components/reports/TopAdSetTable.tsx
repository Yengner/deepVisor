'use client';

interface AdSetMetric {
  id: number;
  name: string;
  campaign_id: string;
}

interface TopAdSetsProps {
  adSets: AdSetMetric[];
}

const TopAdSetsTable = ({ adSets }: TopAdSetsProps) => {
  return (
    <div className="pl-4 pr-4 max-h-56 overflow-y-scroll">
      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500">
            <th className="border-b py-2">Ad Set Name</th>
            <th className="border-b py-2 text-right">Campaign</th>
          </tr>
        </thead>
        <tbody>
          {adSets.map((adSet) => (
            <tr key={adSet.id}>
              <td className="border-b py-3 pl-2 font-medium text-gray-800">{adSet.name}</td>
              <td className="border-b py-3 text-right">{adSet.campaign_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAdSetsTable;
