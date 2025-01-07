// 'use client';

// import ReactApexChart from 'react-apexcharts';

// interface MetricsComparisonProps {
//   data: { platform: string; spend: number; leads: number; impressions: number }[];
// }

// const MetricsComparison = ({ data }: MetricsComparisonProps) => {
//   const chartOptions = {
//     chart: {
//       type: 'bar',
//     },
//     xaxis: {
//       categories: data.map((d) => d.platform),
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: '55%',
//       },
//     },
//     legend: {
//       position: 'top',
//     },
//   };

//   const chartSeries = [
//     {
//       name: 'Spend',
//       data: data.map((d) => d.spend),
//     },
//     {
//       name: 'Leads',
//       data: data.map((d) => d.leads),
//     },
//     {
//       name: 'Impressions',
//       data: data.map((d) => d.impressions),
//     },
//   ];

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-semibold mb-4">Metrics Comparison</h2>
//       <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
//     </div>
//   );
// };

// export default MetricsComparison;
