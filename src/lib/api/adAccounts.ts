'use server';

import { getLoggedInUser } from "../actions/user.actions";
import { createSupabaseClient } from "../utils/supabase/clients/server";


export const fetchAdAccounts = async (platform: string): Promise<{
  adAccounts: Array<{ ad_account_id: string, name: string, platform_name: string }>;
  hasAdAccounts: boolean;
}> => {

  if (!platform) {
    return {
      adAccounts: [],
      hasAdAccounts: false,
    };
  }
  const supabase = await createSupabaseClient();
  
  const loggedIn = await getLoggedInUser();
  const userId = loggedIn.id;

  const { data, error } = await supabase
    .from('ad_accounts')
    .select(`
      ad_account_id,
      name,
      platform_name,
      platform_integration_id,
      platform_integrations (
        user_id,
        platform_name
      )
    `)
    .eq('user_id', userId)
    .eq('platform_name', platform)

  if (error) {
    console.error('Error fetching ad accounts:', error.message);
    throw new Error('Error fetching ad accounts');
  }

  return {
    adAccounts: data || [],
    hasAdAccounts: !!data?.length,
  };
};