import { createSupabaseClient } from "../utils/supabase/clients/server";

interface PlatformOverview {
  name: string;
  totalSpend: number;
  leads: number;
  impressions: number;
  clicks: number;
  messages: number;
  conversions: number;
  ctr: number;
  cpm: number;
  cpc: number;
}


export async function fetchPlatformData(platformIntegrationId: string): Promise<PlatformOverview | null> {
  const supabase = await createSupabaseClient();


  try {
    // Fetch platform data from `platform_aggregated_metrics`
    const { data, error } = await supabase
      .from('platform_aggregated_metrics')
      .select('*')
      .eq('platform_integration_id.', platformIntegrationId)
      .single();

    if (error || !data) {
      console.error('Error fetching platform data:', error);
      return null;
    }

    // Return formatted platform overview
    return {
      name: platformIntegrationId, // Assuming the platform name is not stored in the metrics table
      totalSpend: data.total_spend || 0,
      leads: data.total_leads || 0,
      messages: data.total_messages || 0,
      clicks: data.total_clicks || 0,
      conversions: data.total_conversions || 0,
      impressions: data.total_impressions || 0,
      ctr: data.total_ctr || 0,
      cpm: data.total_cpm || 0,
      cpc: data.total_cpc || 0,
    };
  } catch (err) {
    console.error('Unexpected error fetching platform data:', err);
    return null;
  }
}
