'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// Define the type for ad accounts
interface AdAccount {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();  // Client-side hook to get URL parameters

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // Handle exchanging the code for access token
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
            // Optionally, you can remove the 'code' from the URL
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Error exchanging code for access token.');
        }
      };

      exchangeCodeForAccessToken();
    }
  }, [searchParams]);

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

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
