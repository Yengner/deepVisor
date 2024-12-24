'use client';

import ReactApexChart from 'react-apexcharts';

interface LeadsComparisonChartProps {
  metrics: { platform: string; leads: number }[];
}

const LeadsComparisonChart = ({ metrics }: LeadsComparisonChartProps) => {
  const chartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: metrics.map((m) => m.platform) },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
  };

  const chartSeries = [
    {
      name: 'Leads',
      data: metrics.map((m) => m.leads),
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
