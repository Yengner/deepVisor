'use client';  // This ensures the file is treated as a client-side component

import { useEffect, useState } from 'react';
import Fbcampaigns  from '../../components/FbComponenets/fb_campaigns'
import { fetchFacebookCampaignInsights } from '@/lib/meta.insights';

interface AdAccount {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState<string | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setCode(searchParams.get('code'));
    }
  }, []);

  useEffect(() => {
    const fetchAccessTokenAndAdAccounts = async () => {
      try {
        setLoading(true);

        // Check if access token is already in sessionStorage
        let accessToken = sessionStorage.getItem('fb_access_token');

        if (!accessToken && code) {
          // Exchange code for access token
          const response = await fetch('/api/facebook/access-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'Error exchanging code for access token.');
            setLoading(false);
            return;
          }

          const data = await response.json();
          accessToken = data.accessToken;

          if (!accessToken) {
            setError('Failed to retrieve access token.');
            setLoading(false);
            return;
          }

          // Save access token to sessionStorage
          sessionStorage.setItem('fb_access_token', accessToken);
        }

        if (accessToken) {
          // Fetch ad accounts using the access token
          const adAccountsResponse = await fetch('/api/facebook/ad-accounts', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!adAccountsResponse.ok) {
            const adAccountsError = await adAccountsResponse.json();
            setError(adAccountsError.error || 'Error fetching ad accounts.');
          } else {
            const adAccountsData = await adAccountsResponse.json();
            setAdAccounts(adAccountsData.accounts || []);
          }
        }
      } catch (err) {
        setError('Error communicating with the server.');
      } finally {
        setLoading(false);
      }
    };

    if (code || sessionStorage.getItem('fb_access_token')) {
      fetchAccessTokenAndAdAccounts();
    }
  }, [code]);

  return (
    <div>
      <h2>Facebook Ad Accounts</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {adAccounts.map((account) => (
            <li key={account.id}>
              <p>{account.name}</p>
              <p>ID: {account.id}</p>
            </li>
          ))}
        </ul>      
      )}
      <div>
        <h2>Campaigns</h2>
        <Fbcampaigns adAccounts={adAccounts[0].id}/>
      </div>
    </div>
  );
};

export default DashboardPage;
