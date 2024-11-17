'use client';

import { useEffect, useState } from 'react';
import CreateCampaign from '@/components/FbComponenets/CreateAdCampaign';
import { createClient } from '@/lib/utils/supabase/clients/browser';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Campaigns = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [adAccountId, setAdAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(); // Use the browser client since this will be client-side

      try {
        const user = await getLoggedInUser(); 
        const userId = user?.id;

        if (!userId) {
          throw new Error("No user is logged in.");
        }
        console.log("User ID:", userId);

        // Query Supabase for the access token from the "access_token" table
        const { data: accessTokenData, error: accessTokenError } = await supabase
          .from("access_token") 
          .select("facebook_access_token")
          .eq("user_id", userId)
          .single();

        if (accessTokenError || !accessTokenData) {
          throw new Error("Failed to retrieve the access token.");
        }

        const { data: adAccountData, error: adAccountError } = await supabase
          .from("ad_accounts") 
          .select("id")
          .eq("user_id", userId)
          .single();

          if (adAccountError || !adAccountData) {
            throw new Error("Failed to retrieve the ad account ID.");
          }
        const accessToken = accessTokenData.facebook_access_token;
        console.log("Access Token from Supabase:", accessToken);

        // Query Supabase for the ad account ID from the "ad_accounts" table


        const adAccountId = adAccountData.id;
        console.log("Ad Account ID from Supabase:", adAccountId);
        
        setAccessToken(accessToken);
        setAdAccountId(adAccountId);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
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
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Facebook Campaigns</h1>

      {accessToken && adAccountId ? (
        <CreateCampaign accessToken={accessToken} adAccountId={adAccountId} />
      ) : (
        <p>Access token or Ad Account ID is missing.</p>
      )}
    </div>
  );
};

export default Campaigns;
