'use server';

import { createSupabaseClient } from "../utils/supabase/clients/server";

export const fetchIntegratedPlatforms = async (userId: string): Promise<
  { platform: string; isIntegrated: boolean }[]
> => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('social_media_integrations')
    .select('platform, is_integrated')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching social media integration:', error.message);
    throw new Error('Error fetching social media integration');
  }

  // Ensure the returned data is in the expected format
  if (!data) {
    return [];
  }

  // Map the data to the expected return format
  return data.map((row) => ({
    platform: row.platform,
    isIntegrated: row.is_integrated,
  }));
};
