'use client';

interface PageSpeedInsightsProps {
  data: {
    performanceScore: number | null;
    seoScore: number | null;
    accessibilityScore: number | null;
    finalScreenshot: string | null;
    audits: any;
  };
}

export default function PageSpeedInsights({ data }: PageSpeedInsightsProps) {
  const { performanceScore, seoScore, accessibilityScore, finalScreenshot, audits } = data;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#e7edf7] rounded-lg shadow">
          <h2 className="text-lg font-semibold">Performance</h2>
          <p className="text-2xl font-bold text-[#5c6bc0]">{performanceScore || 'N/A'}%</p>
        </div>
        <div className="p-4 bg-[#f8f8fa] rounded-lg shadow">
          <h2 className="text-lg font-semibold">SEO</h2>
          <p className="text-2xl font-bold text-[#5c6bc0]">{seoScore || 'N/A'}%</p>
        </div>
        <div className="p-4 bg-[#f1e9f9] rounded-lg shadow">
          <h2 className="text-lg font-semibold">Accessibility</h2>
          <p className="text-2xl font-bold text-[#5c6bc0]">{accessibilityScore || 'N/A'}%</p>
        </div>
      </div>

      {/* Screenshot */}
      {/* {finalScreenshot && (
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Visual Preview</h2>
          <img
            src={finalScreenshot}
            alt="Website screenshot"
            className="w-full h-auto rounded"
          />
        </div>
      )} */}

      {/* Key Audits */}
      <div>
        <h2 className="text-lg font-semibold">Key Insights</h2>
        <ul className="list-disc list-inside space-y-2">
          {audits &&
            Object.keys(audits)
              .slice(0, 5)
              .map((key) => (
                <li key={key} className="text-gray-600">
                  {audits[key].title}: {audits[key].description || 'N/A'}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
