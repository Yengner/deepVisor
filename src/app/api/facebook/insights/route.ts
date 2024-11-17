import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getLoggedInUser } from '@/lib/actions/user.actions';

interface AccessTokenData {
  facebook_access_token: string;
}

interface FacebookInsightEntry {
  date_start: string;
  spend: string;
  actions?: { action_type: string; value: string }[];
  impressions?: string;
  clicks?: string;
}

interface ProcessedEntry {
  date: string;
  spend: number;
  leads: number;
  impression: number;
  clicks: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view') || 'daily';
  const adAccountId = searchParams.get('adAccountId');
  const campaignId = searchParams.get('campaignId');
  const supabase = createSupabaseClient();
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
  }

  const userId = loggedInUser.id;

  if (!adAccountId || !campaignId) {
    return NextResponse.json({ error: 'Missing adAccountId or campaignId' }, { status: 400 });
  }

  const { data: accessTokenData, error: accessTokenError } = await supabase
    .from('access_token')
    .select('facebook_access_token')
    .eq('user_id', userId)
    .single<AccessTokenData>();

  if (accessTokenError || !accessTokenData) {
    console.error('Error fetching access token:', accessTokenError);
    return NextResponse.json({ error: 'Failed to retrieve access token' }, { status: 500 });
  }

  const accessToken = accessTokenData.facebook_access_token;

  // Set time range and time increment based on the view parameter
  let timeIncrement = '1';
  let timeRange = '{"since":"2024-05-12","until":"2024-05-18"}';

  if (view === 'weekly') {
    timeIncrement = '7';
    timeRange = '{"since":"2024-05-01","until":"2024-10-31"}';
  } else if (view === 'monthly') {
    timeIncrement = 'monthly';
    timeRange = '{"since":"2024-01-01","until":"2024-10-31"}';
  }

  // Construct the Facebook Graph API URL with the provided parameters
  const url = `https://graph.facebook.com/v20.0/${adAccountId}/insights?fields=spend,actions,clicks,impressions&level=adset&time_increment=${timeIncrement}&time_range=${timeRange}&filtering=[{"field":"campaign.id","operator":"IN","value":["${campaignId}"]}]&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data: { data: FacebookInsightEntry[]; error?: { message: string } } = await response.json();

    if (!response.ok || !data.data) {
      throw new Error(data.error?.message || 'Error fetching insights');
    }

    // Use a Map to filter out duplicates by date
    const uniqueEntries = new Map<string, ProcessedEntry>();

    data.data.forEach((entry) => {
      const date = entry.date_start;
      if (!date) return;

      const spend = parseFloat(entry.spend) || 0;
      const leadAction = entry.actions?.find((action) => action.action_type === 'lead');
      const leads = leadAction ? parseInt(leadAction.value) : 0;
      const impression = parseFloat(entry.impressions || '0') || 0;
      const clicks = parseFloat(entry.clicks || '0') || 0;

      uniqueEntries.set(date, { date, spend, leads, impression, clicks });
    });

    const processedData = Array.from(uniqueEntries.values());

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch insights' }, { status: 500 });
  }
}
