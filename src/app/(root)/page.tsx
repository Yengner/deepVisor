'use client';

import { useEffect, useState } from 'react';
import { fetchAdAccounts, fetchAccountInfo } from '@/lib/integrations/facebook/facebook.api';
import { useRouter } from 'next/navigation';
import Fbcampaigns from '../../components/FbComponenets/FbCampaignData';
import { createBrowserClient } from '@/lib/utils/supabase/clients/browser';
import FacebookLogin from '@/components/FbComponenets/FbBusinessLogin';  // Adjust the path according to your project structure

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
  

  const supabase = createBrowserClient();  // Initialize browser client
  const handleNavigateToCallback = () => {
    router.push('/callback');  // Push to the /campaigns page
  };


  const checkFacebookIntegration = async (userId: string) => {
    const { data, error } = await supabase
      .from('access_token') 
      .select('facebook_access_token')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return null; 
    }
    const accessToken = data.facebook_access_token;
    return accessToken
  };

  
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // Get authenticated user
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user?.user) {
          throw new Error('Failed to retrieve authenticated user');
        }

        const userId = user.user.id;

        // Check if the user has the accessToken for Fb
        const accessToken = await checkFacebookIntegration(userId);
        if (!accessToken) {
          setError('Facebook is not integrated. Please integrate first.');
          setLoading(false);
          return;
        }
        
        const [fetchedAdAccounts, fetchedAccountsInfo] = await Promise.all([
          fetchAdAccounts(accessToken),
          fetchAccountInfo(accessToken),
        ]);
        
        setAdAccounts(fetchedAdAccounts);
        setAccountsInfo(fetchedAccountsInfo);
        // Store ad accounts into Supabase
        const { error: adAccountsError } = await supabase
          .from('ad_accounts')
          .upsert(
            fetchedAdAccounts.map(account => ({
              id: account.id,                 // Ad account ID
              user_id: userId,                // Link to the authenticated user
              last_updated: new Date(),       // Timestamp for when this data was updated
            })),
            { onConflict: 'id' }             // Update if the account already exists
          );

        if (adAccountsError) {
          throw new Error(`Failed to upsert ad accounts: ${adAccountsError.message}`);
        }

        // Store account info (Facebook pages) into Supabase
        const { error: accountsInfoError } = await supabase
          .from('facebook_pages')
          .upsert(
            fetchedAccountsInfo.map(info => ({
              facebook_page_id: info.id,      // Facebook page ID
              user_id: userId,                // Link to the authenticated user
              facebook_page_name: info.name,  // Facebook page name
              category: info.category || '',  // Category (optional)
              updated_at: new Date(),         // Timestamp for when this data was updated
            })),
            { onConflict: 'facebook_page_id' } // Update if the page already exists
          );

        if (accountsInfoError) {
          throw new Error(`Failed to upsert Facebook pages: ${accountsInfoError.message}`);
        }


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
        <button onClick={handleNavigateToCallback}>
          Go to Callback
        </button>
        <div>
        <FacebookLogin />
        </div>

        <h2>Facebook Dashboard</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleNavigateToCallback}>
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