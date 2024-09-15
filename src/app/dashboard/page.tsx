'use client';  // Forces client-side rendering

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Force dynamic rendering to avoid server-side rendering
export const dynamic = 'force-dynamic';

interface AdAccount {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;  // Get query params from the router

    if (code) {
      const exchangeCodeForAccessToken = async () => {
        try {
          const response = await fetch('/api/facebook/access-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('fb_access_token', data.accessToken);

            const adAccountsResponse = await fetch('/api/facebook/ad-accounts', {
              headers: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            });
            const adAccountsData = await adAccountsResponse.json();
            setAdAccounts(adAccountsData.accounts);  // Update state
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Error exchanging code for access token.');
        }
      };

      exchangeCodeForAccessToken();
    }
  }, [router.query]);

  return (
    <div>
      <h2>Facebook Ad Accounts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {adAccounts.map((account) => (
          <li key={account.id}>
            <p>{account.name}</p>
            <p>ID: {account.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
