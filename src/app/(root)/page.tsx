'use client';

import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { fetchAdAccountsAndAccountInfo } from "@/lib/integrations/facebook/facebook.api";
import { createClient } from "@/lib/utils/supabase/clients/browser";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adAccounts, setAdAccounts] = useState<any[]>([]); 
  const [accountsInfo, setAccountsInfo] = useState<any[]>([]); 
  
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(); // Use the browser client since this will be client side until i add this as a function
      try {
        const user = await getLoggedInUser(); // Fetch the logged-in user
        const userId = user?.id;

        if (!userId) {
          throw new Error("No user is logged in.");
        }

        console.log("User ID:", userId);

        // Query Supabase for the Facebook access token tied to the logged-in user
        const { data, error } = await supabase
          .from("access_token") // Assuming the access token is stored in this table
          .select("facebook_access_token")
          .eq("user_id", userId)
          .single();

        if (error || !data) {
          throw new Error("Failed to retrieve the access token.");
        }

        const accessToken = data.facebook_access_token;
        console.log("Access Token from Supabase:", accessToken);

        // Fetch ad accounts using the access token
        const {adAccounts, accountsInfo} = await fetchAdAccountsAndAccountInfo(accessToken);
        console.log("Ad Accounts:", adAccounts);
        console.log("Account Info:", accountsInfo);

        setAdAccounts(adAccounts); // Store fetched ad accounts in state
        setAccountsInfo(accountsInfo); // Store fetched account info in state
      } catch (err: any) {
        console.error("Error fetching ad accounts:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading once the data is fetched or an error occurs
      }
    };

    fetchData(); // Invoke the async function within useEffect
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading Facebook ad accounts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Facebook Ad Accounts</h1>
      <ul>
        {adAccounts.map((account) => (
          <li key={account.id}>{account.name || account.id}</li>
        ))}
      </ul>
      <ul>
        {accountsInfo.map((account) => (
          <li key={account.id}>{account.name} {account.id} {account.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;