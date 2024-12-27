import { fetchMetaCampaignMetrics, fetchMetaAdSetMetrics, fetchMetaAdMetrics } from "/Users/yb/Desktop/deepvisor/supabase/functions/sync_ad_data/platforms/meta.ts";
// import { fetchGoogleCampaignMetrics, fetchGoogleAdSetMetrics, fetchGoogleAdMetrics } from "./platforms/google.ts";

export async function fetchCampaignMetricsByPlatform(adAccount, ad_account_id, accessToken) {

  switch (adAccount.toLowerCase()) {
    case "meta":
      return await fetchMetaCampaignMetrics(adAccount, ad_account_id, accessToken);
    // case "google":
    //   return await fetchGoogleCampaignMetrics(adAccount, supabase, accessToken);
    default:
      throw new Error(`Unsupported platform: ${platform_name}`);
  }
}

export async function fetchAdSetMetricsByPlatform(platform_name, campaignId, accessToken) {
  switch (platform_name.toLowerCase()) {
    case "meta":
      console.log('started fetching meta ad set metrics')
      return await fetchMetaAdSetMetrics(campaignId, accessToken);
    // case "google":
    //   return await fetchGoogleAdSetMetrics(adAccount, campaign, supabase, accessToken);
    default:
      throw new Error(`Unsupported platform: ${platform_name}`);
  }
}

export async function fetchAdMetricsByPlatform(platform_name, adSetId, accessToken) {
  switch (platform_name.toLowerCase()) {
    case "meta":
      return await fetchMetaAdMetrics(adSetId, accessToken);
    // case "google":
    //   return await fetchGoogleAdMetrics(adAccount, campaign, adSet, supabase, accessToken);
    default:
      throw new Error(`Unsupported platform: ${platform_name}`);
  }
}
