'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DemographicsChartProps {
  data: { age: string; gender: string; reach: number }[];
}

const DemographicsChart = ({ data }: DemographicsChartProps) => {
  // Aggregate the data by "age-gender" key
  const aggregatedData = data.reduce((acc, curr) => {
    const key = `${curr.age} ${curr.gender}`;
    acc[key] = (acc[key] || 0) + curr.reach;
    return acc;
  }, {} as Record<string, number>);

  const chartLabels = Object.keys(aggregatedData);
  const chartValues = Object.values(aggregatedData);

  // ApexCharts configuration
  const chartOptions: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'pie',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#F36F6F', '#FFC107'],
    labels: chartLabels,
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: ['#6B7280'] },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => `${opts.w.globals.labels[opts.seriesIndex]}: ${Number(val).toLocaleString()}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} reach`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Audience Demographics</h2>
      <div className="flex justify-center">
        <Chart options={chartOptions} series={chartValues} type="pie" />
      </div>
    </div>
  );
};

export default DemographicsChart;
