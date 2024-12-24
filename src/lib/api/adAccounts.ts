'use server';

import { createSupabaseClient } from "../utils/supabase/clients/server";


export const fetchAdAccounts = async (platform: string): Promise<{
  adAccounts: Array<{ ad_account_id: string, platform: string, name: string }>;
  hasAdAccounts: boolean;
}> => {

  if (!platform) {
    return {
      adAccounts: [],
      hasAdAccounts: false,
    };
  }
  const supabase = await createSupabaseClient();
  const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a'; // Replace with actual logic to get the user ID

  const { data, error } = await supabase
    .from('ad_accounts')
    .select('ad_account_id, platform, name')
    .eq('user_id', userId)
    .eq('platform', platform);

  if (error) {
    console.error('Error fetching ad accounts:', error.message);
    throw new Error('Error fetching ad accounts');
  }

  return {
    adAccounts: data || [],
    hasAdAccounts: !!data?.length,
  };
};