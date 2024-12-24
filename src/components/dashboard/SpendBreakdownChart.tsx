'use client';

import ReactApexChart from 'react-apexcharts';

interface SpendBreakdownChartProps {
  metrics: { platform: string; spend: number }[];
}

const SpendBreakdownChart = ({ metrics }: SpendBreakdownChartProps) => {
  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false, // Hide unnecessary toolbar
      },
    },
    labels: metrics.map((m) => m.platform),
    legend: {
      position: 'bottom', // Move legend to the right for a cleaner look
      fontSize: '14px',
      markers: {
        radius: 12,
      },
      itemMargin: {
        vertical: 8, // Add spacing between legend items
      },
    },
    colors: ['#6a11cb', '#2575fc', '#e1e8ff'], // Custom gradient-inspired colors
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(2)}%`,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`, // Format tooltip values as currency
      },
    },
  };

  const chartSeries = metrics.map((m) => m.spend);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Spend Breakdown</h2>
      </div>

      {/* Chart */}
      <div>
        <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={350} />
      </div>
    </div>
  );
};

export default SpendBreakdownChart;
