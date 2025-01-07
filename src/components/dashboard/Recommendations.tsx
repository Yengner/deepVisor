import Image from 'next/image';


interface Recommendation {
  type: 'text' | 'metric';
  message: string;
  value?: number; // Used for metrics (e.g., percentage, increase/decrease)
  icon?: string; // Optional icon for emphasis
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[412px]">
      {/* Header */}
      <div className="flex flex-col space-y-1 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Recommendations</h2>
        <p className="text-sm text-gray-500">Actionable insights tailored to your campaign performance</p>
      </div>

      {/* Recommendations */}
      <ul className="space-y-4">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-center gap-4">
            {/* Optional Icon */}
            {rec.icon && (
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full">
                <Image
                  src={rec.icon}
                  alt="Recommendation Icon"
                  width={24} // Adjust based on your requirements
                  height={24} // Adjust based on your requirements
                  className="w-6 h-6"
                />
              </div>
            )}

            {/* Recommendation Content */}
            <div className="flex-1">
              <p className="text-[12px] text-gray-700">
                {rec.message.length > 150
                  ? `${rec.message.substring(0, 150)}...` // Truncate long messages
                  : rec.message}
              </p>

              {/* Metric Value (if present) */}
              {rec.type === 'metric' && rec.value !== undefined && (
                <div
                  className={`mt-1 text-xs font-semibold ${rec.value > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {rec.value > 0 ? `▲ Up by ${rec.value}%` : `▼ Down by ${Math.abs(rec.value)}%`}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;