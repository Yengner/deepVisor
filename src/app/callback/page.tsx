'use client';

import { getLoggedInUser } from '@/lib/actions/user.actions';
import { insertFbUserDataIntoSupabase } from '@/lib/integrations/facebook/facebook.actions';
import { fetchAccessToken, fetchAdAccountsAndAccountInfo } from '@/lib/integrations/facebook/facebook.api';
// import { createClient } from '@/lib/utils/supabase/clients/browser';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) {
        throw new Error('Failed to retrieve the authorization code.');
      }
      try {
        // const supabase = createClient();
        const user = await getLoggedInUser();
        const userId = user?.id;

        if (!userId) {
          throw new Error("User is not logged in.");
        }

        // Fetch the Facebook access token using the authorization code
        const accessToken = await fetchAccessToken(code);
        console.log('Access token:', accessToken);
        console.log('User ID:', userId);

        // //debugger
        // const accessToken = "EAAQohtuZCRFoBO40zDTSB8UDeBztp76TsVRLki8kaqCEzmz0ySO9wc1jYwc9Qk84u6NJvUM6hqxyOV9lLoT97DMkJkmpbHxn0fsrAqXM5LWdZA7ixWl7DegVLJvR4XwUAUpIe0nrrPZCInyrYM8p471BzqUGhUuL9sad7lTfMgUVEeDYtut9WJls9B58alJ0cf4ZCt2HShZBFhsn5ionrdQ6jHnPylhyHAuZBLzKLubr8KVVo49pFPwqcUJ2ZAY";
        // const userId = '00d47741-ba91-4540-82e8-e8039a892944'

        const { adAccounts, accountsInfo } = await fetchAdAccountsAndAccountInfo(accessToken);

        const {insertedadAccounts, insertedaccountsInfo} = await insertFbUserDataIntoSupabase( userId, accessToken, adAccounts, accountsInfo);
        // try {

        //   const { error: facebookIdsError } = await supabase
        //     .from('access_token')
        //     .insert({
        //       user_id: userId,
        //       facebook_access_token: accessToken,
        //     });

        //   if (facebookIdsError) {
        //     throw new Error(`Failed to store Facebook access token: ${facebookIdsError.message}`);
        //   }

        //   //Insert multiple Facebook pages into 'facebook_pages' table
        //   const { error: pagesError } = await supabase
        //     .from('facebook_pages')
        //     .upsert(
        //       accountsInfo.map((page) => ({
        //         user_id: userId,
        //         facebook_page_id: page.id,
        //         facebook_page_name: page.name,
        //         category: page.category || '',
        //         updated_at: new Date(),
        //       }))
        //     );

        //   if (pagesError) {
        //     throw new Error(`Failed to store Facebook pages: ${pagesError.message}`);
        //   }

        //   //Insert multiple ad accounts into 'ad_accounts' table
        //   const { error: adAccountsError } = await supabase
        //     .from('ad_accounts')
        //     .upsert(
        //       adAccounts.map((account) => ({
        //         id: account.id,
        //         user_id: userId,
        //         last_updated: new Date(),
        //       }))
        //     );

        //   if (adAccountsError) {
        //     throw new Error(`Failed to store ad accounts: ${adAccountsError.message}`);
        //   }

        // } catch (error) {
        //   console.error('Error during Facebook integration on server:', error);
        // }

        console.log('Ad Accounts:', insertedadAccounts);
        console.log('Account Info:', insertedaccountsInfo);

        setLoading(false);

      } catch (error) {
        console.error("Error fetching Facebook integration data:", error);
        setError('An error occurred while fetching Facebook integration data.');
      } finally {
        // router.push('/') // Back to dashboard
      }
    };

    fetchUserInfo();
  }, []); // Empty array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? <p>{error}</p> : <p>Integration successful, redirecting...</p>}
    </div>
  );
};

export default Page;
