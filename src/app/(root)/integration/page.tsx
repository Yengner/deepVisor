import MetaIntegration from '@/components/integration/MetaIntegration';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import React from 'react';



const IntegrationPage = async () => {
  const supabase = await createSupabaseClient();

  // Simulated data for platforms (can fetch from a database or API)
  const { data: platformIntegrations, error } = await supabase
    .from('platform_integrations')
    .select('id, platform_name, is_integrated')
    .eq('user_id', '6d9a0842-3887-43a0-8909-16589f8eae2a'); // Replace with actual user ID logic

  if (error) {
    console.error('Error fetching platform integrations:', error);
    return <div>Failed to load integrations</div>;
  }

  const platforms = [
    {
      id: 'meta',
      name: 'Meta',
      description: 'Manage your Facebook and Instagram ad accounts.',
      imageUrl: '/meta.png',
      isIntegrated: platformIntegrations?.find((p) => p.platform_name === 'meta')?.is_integrated || false,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Run and analyze your TikTok ad campaigns.',
      imageUrl: '/tiktok.png',
      isIntegrated: platformIntegrations?.find((p) => p.platform_name === 'tiktok')?.is_integrated || false,
    },
    {
      id: 'google',
      name: 'Google',
      description: 'Integrate your Google Ads accounts for insights.',
      imageUrl: '/google.png',
      isIntegrated: platformIntegrations?.find((p) => p.platform_name === 'google')?.is_integrated || false,
    },
    // Add more platforms as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-emerald-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-sm mt-2">
          Connect your advertising platforms to manage and analyze your campaigns.
        </p>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4"
            >
              <img
                src={platform.imageUrl}
                alt={platform.name}
                className="w-16 h-16 object-contain"
              />
              <h2 className="text-xl font-semibold">{platform.name}</h2>
              <p className="text-sm text-gray-500 text-center">{platform.description}</p>
              {platform.id === 'meta' && (
                <MetaIntegration isIntegrated={platform.isIntegrated} />
              )}
              {/* Future components for other platforms */}
              {/* {platform.id === 'tiktok' && <TikTokIntegration isIntegrated={platform.isIntegrated} />} */}
              {/* {platform.id === 'google' && <GoogleIntegration isIntegrated={platform.isIntegrated} />} */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IntegrationPage;