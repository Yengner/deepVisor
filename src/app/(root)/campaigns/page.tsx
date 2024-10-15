'use client';

import { useEffect, useState } from 'react';
import CreateCampaign from '@/components/FbComponenets/CreateAdCampaign';

const Campaigns = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [adAccountId, setAdAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Using useEffect to retrieve values from localStorage
  useEffect(() => {
    const token = localStorage.getItem('fb_access_token');
    const id = localStorage.getItem('fb_ad_account_id');

    if (!token || !id) {
      setError('Access token or Ad Account ID is missing.');
      setLoading(false);
      return;
    }

    setAccessToken(token);
    setAdAccountId(id);
    setLoading(false); // Stop loading once we have the tokens
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Facebook Campaigns</h1>

      {accessToken && adAccountId ? (
        <CreateCampaign accessToken={accessToken} adAccountId={adAccountId} />
      ) : (
        <p>Access token or Ad Account ID is missing.</p>
      )}
    </div>
  );
};

export default Campaigns;
