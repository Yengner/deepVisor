'use client';

interface MetricsTableProps {
  metrics: { platform: string; spend: number; leads: number }[];
}

const MetricsTable = ({ metrics }: MetricsTableProps) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-4">Platform Metrics</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">Platform</th>
          <th className="border-b p-2">Spend ($)</th>
          <th className="border-b p-2">Leads</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric) => (
          <tr key={metric.platform}>
            <td className="border-b p-2 capitalize">{metric.platform}</td>
            <td className="border-b p-2">${metric.spend.toLocaleString()}</td>
            <td className="border-b p-2">{metric.leads.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MetricsTable;
