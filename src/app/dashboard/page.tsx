'use client';  // This ensures the file is treated as a client-side component

import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 14 router
import { useEffect, useState } from 'react';

interface AdAccount {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ensure the code only runs on the client
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setCode(searchParams.get('code'));
    }
  }, []);

  useEffect(() => {
    const exchangeCodeForAccessToken = async () => {
      if (!code) return;

      try {
        setLoading(true);
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
        localStorage.setItem('fb_access_token', data.accessToken);

        // Fetch ad accounts using the access token
        const adAccountsResponse = await fetch('/api/facebook/ad-accounts', {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        });

        if (!adAccountsResponse.ok) {
          const adAccountsError = await adAccountsResponse.json();
          setError(adAccountsError.error || 'Error fetching ad accounts.');
        } else {
          const adAccountsData = await adAccountsResponse.json();
          setAdAccounts(adAccountsData.accounts || []);
        }
      } catch (err) {
        setError('Error communicating with the server.');
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      exchangeCodeForAccessToken();
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
    </div>
  );
};

export default DashboardPage;
