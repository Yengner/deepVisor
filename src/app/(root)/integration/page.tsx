'use client';

import FbBusinessLogin from '@/components/FbComponenets/FbBusinessLogin';
import { useEffect, useState } from 'react';

const IntegrationPage = () => {
  const [integrations, setIntegrations] = useState<{ facebook: boolean }>({
    facebook: false,
  });

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        // See if there is already an exisitng integration
        const response = await fetch('/api/integrations/status');
        const data = await response.json();
        setIntegrations(data.integrations);
      } catch (error) {
        console.error('Error fetching integration status:', error);
      }
    };

    fetchIntegrations();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Integrations</h1>
      <div className="space-y-4">
        {!integrations?.facebook ? (
          <FbBusinessLogin />
        ) : (
          <p className="text-green-600 font-semibold">Facebook: ✅ Integrated</p>
        )}
      </div>
    </div>
  );
};

export default IntegrationPage;
