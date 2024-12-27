// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://deno.land/std@0.191.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { fetchAggregatedMetrics } from "./fetchAggregatedMetrics.ts";


Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    console.log("Starting sync-ad-metrics edge function");

    // Fetch all platform integrations
    console.log("Fetching platform integrations...");
    const { data: platforms, error: platformError } = await supabase
      .from("platform_integrations")
      .select("id, platform_name, access_token");

    if (platformError || !platforms || platforms.length === 0) {
      console.error("Error fetching platforms:", platformError);
      return new Response("No platforms found", { status: 500 });
    }
    console.log("Platforms fetched:", platforms);

    let successCount = 0;
    let failureCount = 0;

    for (const platform of platforms) {
      console.log(`Processing platform: ${platform.platform_name}`);

      // Fetch all ad accounts for the platform
      const { data: adAccounts, error: adAccountError } = await supabase
        .from("ad_accounts")
        .select("id, ad_account_id")
        .eq("platform_integration_id", platform.id);

      if (adAccountError || !adAccounts || adAccounts.length === 0) {
        console.warn(`No ad accounts found for platform: ${platform.platform_name}`);
        continue;
      }

      for (const account of adAccounts) {
        console.log(`Processing ad account: ${account.ad_account_id}`);

        try {
          const metrics = await fetchAggregatedMetrics(
            platform.platform_name,
            account.ad_account_id,
            platform.access_token
          );

          console.log("Metrics fetched:", metrics);
          const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

          // Update ad account with aggregated metrics
          const { error: updateError } = await supabase
            .from("ad_accounts")
            .update({
              aggregated_metrics: metrics,
              last_synced: date,
            })
            .eq("id", account.id);

          if (updateError) {
            console.error(`Failed to update metrics for ad account: ${account.id}`, updateError);
            failureCount++;
          } else {
            console.log(`Successfully updated metrics for ad account: ${account.id}`);
            successCount++;
          }
        } catch (fetchError) {
          console.error(`Error fetching metrics for ad account: ${account.ad_account_id}`, fetchError);
          failureCount++;
        }
      }
    }

    console.log("Sync complete: ", { successCount, failureCount });

    return new Response(
      JSON.stringify({
        message: "Ad account metrics sync complete",
        successCount,
        failureCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response("Internal server error", { status: 500 });
  }
});


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sync-ad-metrics' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
