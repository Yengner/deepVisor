'use server';
// Define the interfaces for ad accounts and account info

import { insertFbUserDataIntoSupabase } from "@/lib/actions/facebook/facebook.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { createSupabaseClient } from "@/lib/utils/supabase/clients/server";

interface AdAccount {
  id: string;
  account_status: number;
  account_id: string;
  name: string;
}

interface AccountInfo {
  id: string;
  name: string;
  category: string;
  category_list: { id: string; name: string }[];
  tasks: string[];
}

// Fetch access token from the server
export const fetchAccessToken = async (code: string): Promise<string> => {
  console.log('CODE REACHE FEtCH ACCESS TOKEN', code)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/accessToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error fetching access token.');
    }
    console.log('RESPONSE IT WORKED', response)
    const data: { accessToken: string } = await response.json(); 
    return data.accessToken;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching access token.');
  }
};

// Fetch ad accounts from Facebook using the access token
export async function fetchAdAccounts(accessToken: string): Promise<AdAccount[]> {
  try {
    // API call to fetch ad accounts
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/ad-accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const contentType = response.headers.get('content-type');
    console.log('Response Content-Type:', contentType);  // This will help in debugging

    if (!contentType?.includes('application/json')) {
      throw new Error(`Invalid content type. Expected application/json but got ${contentType}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error fetching ad accounts.');
    }

    const adAccountsData: { accounts: AdAccount[] } = await response.json();
    return adAccountsData.accounts || [];
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching ad accounts.');
  }
}

// Fetch detailed account information
export const fetchAccountInfo = async (accessToken: string): Promise<AccountInfo[]> => {
  try {
    // API call to fetch detailed account information
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error fetching account information.');
    }

    const accountInfoData: { accounts: AccountInfo[] } = await response.json();
    return accountInfoData.accounts || [];
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching account information.');
  }
};

// Fetch both ad accounts and account info concurrently
export const fetchAdAccountsAndAccountInfo = async (
  accessToken: string
): Promise<{ adAccounts: AdAccount[], accountsInfo: AccountInfo[] }> => {
  try {
    const [adAccounts, accountsInfo] = await Promise.all([
      fetchAdAccounts(accessToken),
      fetchAccountInfo(accessToken),
    ]);

    return { adAccounts, accountsInfo };
    
  } catch (error) {
    console.error('Error fetching ad accounts and account info:', error);
    throw new Error('Error fetching ad accounts and account information.');
  }
};

export async function handleFacebookIntegration(code: string): Promise<{ success: boolean; error?: string }> {
  try {
    const accessToken = await fetchAccessToken(code);

    const { adAccounts, accountsInfo } = await fetchAdAccountsAndAccountInfo(accessToken);

    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    await insertFbUserDataIntoSupabase(userId, accessToken, adAccounts, accountsInfo);

    const supabase = createSupabaseClient();
    const { error: integrationError } = await supabase
      .from("social_media_integrations")
      .upsert(
        {
          user_id: userId,
          platform: "facebook",
          is_integrated: true,
          updated_at: new Date(),
        },
        { onConflict: "user_id, platform" }
      );

    if (integrationError) {
      throw new Error(`Failed to update integration status: ${integrationError.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error during Facebook integration:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}