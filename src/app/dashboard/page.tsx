'use client';

import { useEffect, useState } from 'react';
import { fetchAdAccounts, fetchAccountInfo, fetchAccessToken } from '@/lib/actions/facebook.actions';
import Fbcampaigns from '../../components/FbComponenets/fb_campaigns';

interface AdAccount {
  id: string;
}

interface AccountInfo {
  id: string;
  name: string;
  category: string;
  category_list: { id: string; name: string }[];
  tasks: string[];
}

const DashboardPage = () => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [accountsInfo, setAccountsInfo] = useState<AccountInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) {
        setError('Code is required.');
        setLoading(false);
        return;
      }

      try {
        const accessToken = await fetchAccessToken(code);

        // Fetch ad accounts and account info concurrently
        const [fetchedAdAccounts, fetchedAccountsInfo] = await Promise.all([
          fetchAdAccounts(accessToken),
          fetchAccountInfo(accessToken),
        ]);

        setAdAccounts(fetchedAdAccounts);
        setAccountsInfo(fetchedAccountsInfo);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching data');
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Facebook Dashboard</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Facebook Ad Accounts</h2>
      {adAccounts.length > 0 ? (
        <ul>
          {adAccounts.map((account: AdAccount) => (
            <li key={account.id}>
              <p>ID: {account.id}</p>
              <Fbcampaigns key={account.id} accountId={account.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No ad accounts found.</p>
      )}

      <h2>Facebook Business Accounts</h2>
      {accountsInfo.length > 0 ? (
        <ul>
          {accountsInfo.map((account: AccountInfo) => (
            <li
              key={account.id}
              style={{ border: '1px solid black', padding: '10px', margin: '10px' }}
            >
              <h2>{account.id}</h2>
              <h3>{account.name}</h3>
              <p>Category: {account.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No business accounts found.</p>
      )}
    </div>
  );
};

export default DashboardPage;
