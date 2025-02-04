'use client';

interface AdMetric {
  id: number;
  name: string;
  adset_id: string;
}

interface TopAdsProps {
  ads: AdMetric[];
}

const TopAdsTable = ({ ads }: TopAdsProps) => {
  return (
    <div className="pl-4 pr-4 max-h-56 overflow-y-scroll">
      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500">
            <th className="border-b py-2">Ad Name</th>
            <th className="border-b py-2 text-right">Ad Set</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id}>
              <td className="border-b py-3 pl-2 font-medium text-gray-800">{ad.name}</td>
              <td className="border-b py-3 text-right">{ad.adset_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAdsTable;
