import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;

    const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
    const response = await fetch(tokenUrl);

    const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.error?.message || 'Failed to fetch access token');
    }

    const tokenData = await response.json();

    if (!tokenData.access_token) {
      throw new Error('Access token is missing in the response');
    }

    // Extract additional token details
    const integrationDetails = {
        access_token: tokenData.access_token,
        token_type: tokenData.token_type || null,
        issued_at: date,
      };

    // Get the Supabase client
    const supabase = await createSupabaseClient();

    // Simulate getting user_id from session or authenticated context
    const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a'; 

    // Upsert into the platform_integration table
    const upsertData = {
      user_id: userId,
      platform_name: 'meta',
      access_token: tokenData.access_token,
      is_integrated: true,
      integration_details: integrationDetails,
      created_at: date,
      updated_at: date,
    };

    const { data, error } = await supabase
        .from('platform_integrations')
        .upsert(upsertData)
        .select('id')
        .single();

    if (error || !data) throw new Error('Failed to save platform integration');

    const platformIntegrationId = data.id; // Dynamically use this

    const adAccountsUrl = `https://graph.facebook.com/v21.0/me/adaccounts?fields=id,name,account_status,amount_spent,users`;
    const adAccountsResponse = await fetch(adAccountsUrl, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!adAccountsResponse.ok) {
      const errorDetails = await adAccountsResponse.json();
      throw new Error(errorDetails.error?.message || 'Failed to fetch ad accounts');
    }

    const adAccountsData = await adAccountsResponse.json();

    // Save ad accounts in the database
    const adAccounts = adAccountsData.data.map((account: any) => ({
      user_id: userId,
      platform_integration_id: platformIntegrationId, // Assuming 1 integration per user for simplicity
      ad_account_id: account.id,
      platform_name: 'meta',
      name: account.name,
      account_status: account.account_status,
      spend_amount: account.amount_spent,
      created_at: date,
      updated_at: date,
    }));

    const { error: adAccountsError } = await supabase
        .from('ad_accounts')
        .upsert(adAccounts);

    if (adAccountsError) {
        console.error('Supabase ad account upsert error:', adAccountsError);
        throw new Error('Failed to save ad accounts to Supabase');
      }
      
    // Redirect to the success page with a query parameter for the ad accounts
    const adAccountsEncoded = encodeURIComponent(JSON.stringify(adAccountsData.data));
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/integration/meta/success?adAccounts=${adAccountsEncoded}`
    );

  } catch (error) {
    console.error('Error during Meta OAuth callback:', error);
    return NextResponse.json({ error: 'Failed to handle Meta OAuth callback' }, { status: 500 });
  }
}
