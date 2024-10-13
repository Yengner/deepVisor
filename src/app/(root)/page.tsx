'use client';

import { useEffect, useState } from 'react';
import { fetchAdAccounts, fetchAccountInfo, fetchAccessToken } from '@/lib/actions/facebook.actions';
import { useRouter } from 'next/navigation';
import Fbcampaigns from '../../components/FbComponenets/FbCampaignData';

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
  const router = useRouter();

  const handleNavigateToCampaigns = () => {
    router.push('/campaigns');  // Push to the /campaigns page
  };
  useEffect(() => {
    const fetchData = async () => {
      const temp_accessToken = "EAAQohtuZCRFoBOx3GZAqqeivf517rruze8UZC6NEezUhhmAEuLNYWesy1wRZBgfDZBi5GfWOIevZCC5QQ3fNVBDJDLIrT7k5ivzj8ZCQ3G4eMt53KOo7NbiZCH9fW4MlUfQ6e4HiBCqjQXejT0msDFLcXHY6q6ec28EoWYNYcojs0B64QkSZBkVVyTZBa8T4iAlg1oeilAR9WzCO9MERZA73usonEpSld8esHQ2N5cc7xFNnLebx7cbEzpNR7Yd9dNB"
      localStorage.setItem('fb_access_token', temp_accessToken); // Temporary use local storage in place of subabase
      let accessToken = localStorage.getItem('fb_access_token');

      if (!accessToken) {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
          setError('Authorization code is required.');
          setLoading(false);
          return;
        }

        try {
          accessToken = await fetchAccessToken(code);
          localStorage.setItem('fb_access_token', accessToken); // Take out this line when using subabase
        } catch (err) {
          setError('Failed to fetch access token');
          setLoading(false);
          return;
        }
      }

      try {
        const [fetchedAdAccounts, fetchedAccountsInfo] = await Promise.all([
          fetchAdAccounts(accessToken),
          fetchAccountInfo(accessToken),
        ]);
        
        localStorage.setItem('fb_ad_account_id', fetchedAdAccounts[0].id); // Temporary use local storage in place of subabase
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
      <button onClick={handleNavigateToCampaigns}>
        Go to Campaigns
      </button>
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
