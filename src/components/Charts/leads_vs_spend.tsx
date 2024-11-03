'use client';

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartData {
  date: string;
  spend: number;
  leads: number;
}

const ChartOne: React.FC = () => {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [chartData, setChartData] = useState<{ categories: string[]; series: { name: string; data: number[] }[] }>({
    categories: [],
    series: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/facebook/insights?view=${view}`);
      const data: ChartData[] = await response.json();

      const categories = data.map((item) => {
        const date = new Date(item.date);

        if (view === 'monthly') {
          return date.toLocaleString('en-US', { month: 'short' }); // e.g., Jan, Feb
        } else if (view === 'weekly') {
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., Jan 1, Jan 8
        } else {
          return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); // e.g., Mon, Jan 1
        }
      });

      const uniqueDates = Array.from(new Set(categories));

      setChartData({
        categories: uniqueDates,
        series: [
          { name: 'Spend', data: data.map((item) => item.spend) },
          { name: 'Leads', data: data.map((item) => item.leads) },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [view]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        max: Math.max(...chartData.series[0]?.data || [0]) * 1.5, // Adds 10% padding
      },
      {
        max: Math.max(...chartData.series[1]?.data || [0]) * 2, // Adds 5% padding
        min: 0,
        opposite: true, // Position this y-axis on the right if desired
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">SPEND</p>
              <p className="text-sm font-medium">Dynamic Date Range</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">LEADS</p>
              <p className="text-sm font-medium">Dynamic Date Range</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => setView('daily')}
              className={`rounded px-3 py-1 text-xs font-medium ${view === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Day
            </button>
            <button
              onClick={() => setView('weekly')}
              className={`rounded px-3 py-1 text-xs font-medium ${view === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Week
            </button>
            <button
              onClick={() => setView('monthly')}
              className={`rounded px-3 py-1 text-xs font-medium ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
