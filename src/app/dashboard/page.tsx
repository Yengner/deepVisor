'use client';

import { useEffect, useState } from 'react';

// Define the type for ad accounts
interface AdAccount {
  id: string;
  name: string;
}

const DashboardPage = () => {
  // Type the state as an array of AdAccount objects
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdAccounts = async () => {
      try {
        const accessToken = localStorage.getItem('fb_access_token'); // Fetch from local storage

        if (!accessToken) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`/api/facebook/ad-accounts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setAdAccounts(data.accounts); // TypeScript will now know this is an array of AdAccount
      } catch (err) {
        setError('Failed to fetch ad accounts');
      }
    };

    fetchAdAccounts();
  }, []);

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
