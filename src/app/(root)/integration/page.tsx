'use client';

import FbBusinessLogin from '@/components/FbComponenets/FbBusinessLogin';
import { useEffect, useState } from 'react';

interface Integration {
  platform: string;
  isIntegrated: boolean;
}

const IntegrationPage = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/integrations/status');
        if (!response.ok) {
          throw new Error('Failed to fetch integration statuses');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          // If data is already an array, set it directly
          setIntegrations(data);
        } else if (data.platform) {
          // If the response is a single object, transform it into an array
          setIntegrations([{ platform: data.platform, isIntegrated: data.isIntegrated }]);
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (error) {
        console.error('Error fetching integration status:', error);
        setError('Unable to load integrations.');
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  const staticPlatforms = [
    { platform: 'instagram', isIntegrated: false },
    { platform: 'twitter', isIntegrated: false },
    { platform: 'tiktok', isIntegrated: false },
  ];

  // Merge dynamic integrations from API with static platforms
  const mergedIntegrations = staticPlatforms.map((staticPlatform) => {
    const dynamicIntegration = integrations.find(
      (integration) => integration.platform === staticPlatform.platform
    );
    return dynamicIntegration || staticPlatform;
  });

  // Add Facebook (dynamic) to the list, ensuring it's not duplicated
  const facebookIntegration = integrations.find((i) => i.platform === 'facebook');
  if (facebookIntegration) {
    mergedIntegrations.unshift(facebookIntegration);
  }

  const renderIntegrationCard = (platform: string, isIntegrated: boolean) => (
    <div className="flex flex-col items-center justify-between bg-white p-6 shadow-md rounded-lg border border-gray-200 dark:bg-boxdark dark:border-strokedark">
      <h2 className="text-lg font-bold mb-4 capitalize">{platform}</h2>
      {isIntegrated ? (
        <p className="text-green-600 font-semibold">✅ Integrated</p>
      ) : (
        <>
          <p className="text-red-500 font-medium mb-4">❌ Not Integrated</p>
          {platform === 'facebook' ? (
            <FbBusinessLogin />
          ) : (
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Integrate {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          )}
        </>
      )}
    </div>
  );

  if (loading) {
    return <div className="text-center">Loading integrations...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Integrations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mergedIntegrations.map(({ platform, isIntegrated }) => (
          <div key={platform}>{renderIntegrationCard(platform, isIntegrated)}</div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationPage;
