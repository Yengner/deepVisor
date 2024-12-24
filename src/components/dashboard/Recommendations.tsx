'use client';

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
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Recommendations</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM10 10a2 2 0 104 0 2 2 0 00-4 0zM14 10a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </button>
      </div>

      {/* Recommendations */}
      <ul className="space-y-4">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-center gap-4">
            {/* Optional Icon */}
            {rec.icon && (
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full">
                <img src={rec.icon} alt="Recommendation Icon" className="w-6 h-6" />
              </div>
            )}

            {/* Recommendation Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-700">{rec.message}</p>

              {/* Metric Value (if present) */}
              {rec.type === 'metric' && rec.value !== undefined && (
                <div
                  className={`mt-1 text-sm font-semibold ${
                    rec.value > 0 ? 'text-green-600' : 'text-red-600'
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
