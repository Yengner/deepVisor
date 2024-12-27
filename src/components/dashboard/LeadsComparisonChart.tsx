'use client';

import ReactApexChart from 'react-apexcharts';

interface LeadsComparisonChartProps {
  metrics: { platform_name: string; total_leads: number }[];
}

const LeadsComparisonChart = ({ metrics }: LeadsComparisonChartProps) => {
  const chartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: metrics.map((m) => m.platform_name) },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
  };

  const chartSeries = [
    {
      name: 'Leads',
      data: metrics.map((m) => m.total_leads),
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Leads by Platform</h2>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default LeadsComparisonChart;
