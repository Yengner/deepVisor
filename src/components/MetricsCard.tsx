'use client';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  percentageChange?: number;
  tooltip?: string;
}

const MetricCard = ({ title, value, percentageChange, tooltip }: MetricCardProps) => {
  const changeColor = percentageChange
    ? percentageChange > 0
      ? 'text-green-500'
      : 'text-red-500'
    : 'text-gray-500';

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-2 flex flex-col items-center"
      data-tooltip-id={`${title}-tooltip`}
    >
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2">{value}</p>
      {percentageChange !== undefined && (
        <p className={`text-sm font-medium mt-2 ${changeColor}`}>
          {percentageChange > 0 ? '+' : ''}
          {percentageChange}%
        </p>
      )}
      {tooltip && (
        <Tooltip
          id={`${title}-tooltip`}
          content={tooltip}
          place="top"
          delayShow={500}
          style={{
            backgroundColor: '#e3e3e3', // Light gray background
            color: '#3e4040', // Muted dark text
            borderRadius: '4px', // Rounded corners
            padding: '4px 6px', // Compact padding
            fontSize: '12px', // Smaller font size
            border: '1px solid #d1d5db', // Subtle border
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Minimal shadow
            maxWidth: '150px', // Limit width for compactness
            textAlign: 'center', // Center text for clarity
            whiteSpace: 'normal', // Allow wrapping of text
          }}
        />
      )}
    </div>
  );
};

export default MetricCard;
