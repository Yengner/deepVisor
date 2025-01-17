import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";


interface Metric {
  date_start: string; 
  spend: number;
}

interface TimeIncrementMetrics {
  [key: string]: Metric[]; // "1", "7", "30"
}

interface AccountData {
  name: string;
  time_increment_metrics: TimeIncrementMetrics;
}

interface SpendTrendsGraphProps {
  data: AccountData[];
}


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SpendTrendsGraph = ({ data }: SpendTrendsGraphProps) => {
  const [timeframe, setTimeframe] = useState<"1" | "7" | "30">("7");
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [xCategories, setXCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const allDates = Array.from(
      new Set(
        data.flatMap((account) =>
          account.time_increment_metrics[timeframe]?.map(
            (metric) => metric.date_start.split("T")[0]
          ) || []
        )
      )
    ).sort(); 

    const updatedSeries = data.map((account) => {
      const accountMetrics = account.time_increment_metrics[timeframe] || [];
      const metricsMap = new Map(
        accountMetrics.map((metric) => [
          metric.date_start.split("T")[0],
          metric.spend,
        ])
      );

      const filledData = allDates.map(
        (date) => metricsMap.get(date) || 0 
      );

      return {
        name: account.name,
        data: filledData,
      };
    });

    setSeries(updatedSeries);
    setXCategories(allDates);
  }, [timeframe, data]);
  

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      stacked: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: xCategories,
    },
    yaxis: {
      title: { text: "Spend ($)" },
    },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    markers: {
      size: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      {/* Dropdown for Timeframe Selection */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold dark:text-white">Timeframe Selection</h3>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as "1" | "7" | "30")}
          className="border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="1">Daily (Last 7 Days)</option>
          <option value="7">Weekly (Last 8 Weeks)</option>
          <option value="30">Monthly (Last 12 Months)</option>
        </select>
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default SpendTrendsGraph;
