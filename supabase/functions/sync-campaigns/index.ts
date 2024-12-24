// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://deno.land/std@0.191.0/dotenv/load.ts";
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js";

console.log("Starting Edge Function: sync-campaigns");

// Initialize Supabase Client
Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Fetch all users
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id");

  if (userError) {
    console.error("Error fetching users:", userError);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }

  // Process each user's campaigns
  for (const user of users) {
    const { data: campaigns, error: fetchError } = await supabase
      .from("campaign_source_table")
      .select("*")
      .eq("user_id", user.id);

    if (fetchError) {
      console.error(`Error fetching campaigns for user ${user.id}:`, fetchError);
      continue;
    }

    const { error: upsertError } = await supabase
      .from("ad_campaigns")
      .upsert(campaigns);

    if (upsertError) {
      console.error(
        `Error upserting campaigns for user ${user.id}:`,
        upsertError
      );
    }
  }

  return new Response(
    JSON.stringify({ message: "All campaigns processed successfully!" }),
    { status: 200 }
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sync-campaigns' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
