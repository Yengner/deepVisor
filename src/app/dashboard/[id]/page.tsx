'use client';  // This ensures the file is treated as a client-side component

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AdAccount {
  id: string;
  name: string;
}

const DashboardPage = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { code } = router.query;  // Capture the 'code' dynamic route parameter

  useEffect(() => {
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
            setAdAccounts(adAccountsData.accounts);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Error exchanging code for access token.');
        }
      };

      exchangeCodeForAccessToken();
    }
  }, [code]);

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
