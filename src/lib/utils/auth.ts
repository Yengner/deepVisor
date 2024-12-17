import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';

export const getAccessTokenFromDatabase = async (userId: string, platform: string) => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('access_tokens')
    .select('access_token')
    .eq('user_id', userId)
    .eq('platform', platform)
    .single();

  if (error || !data) {
    throw new Error('Access token not found for the specified user and platform.');
  }

  return data.access_token;
};
