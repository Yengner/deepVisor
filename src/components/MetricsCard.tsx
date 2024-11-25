'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  percentageChange?: number; // Optional for showing % increase/decrease
}

const MetricCard = ({ title, value, percentageChange }: MetricCardProps) => {
  const changeColor = percentageChange
    ? percentageChange > 0
      ? 'text-green-500'
      : 'text-red-500'
    : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-2 flex flex-col items-center">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2">{value}</p>
      {percentageChange !== undefined && (
        <p className={`text-sm font-medium mt-2 ${changeColor}`}>
          {percentageChange > 0 ? '+' : ''}
          {percentageChange}%
        </p>
      )}
    </div>
  );
};

export default MetricCard;
