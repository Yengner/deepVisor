import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { adAccountId: string } }) {
  const { adAccountId } = await context.params;

  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token is missing or invalid' }, { status: 401 });
  }

  const accessToken = authHeader.split(' ')[1];

  if (!adAccountId) {
    return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
  }

  try {
    const campaignsResponse = await fetch(
      `https://graph.facebook.com/v21.0/${adAccountId}/campaigns?fields=id,name,status,start_time,stop_time&access_token=${accessToken}`
    );
    const campaignsData = await campaignsResponse.json();

    if (!campaignsData.data) {
      return NextResponse.json({ error: 'No campaigns found' }, { status: 404 });
    }

    const campaignMetrics = await Promise.all(
      campaignsData.data.map(async (campaign: any) => {
        const insightsResponse = await fetch(
          `https://graph.facebook.com/v21.0/${campaign.id}/insights?fields=impressions,clicks,spend,actions&date_preset=maximum&access_token=${accessToken}`
        );

        if (!insightsResponse.ok) {
          const errorDetails = await insightsResponse.json();
          console.warn(`Failed to fetch insights for campaign ${campaign.id}:`, errorDetails);
          return {
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            start_time: campaign.start_time,
            stop_time: campaign.stop_time,
            impressions: 0,
            clicks: 0,
            spend: 0,
            leads: 0,
            messages: 0,
          };
        }
        const insightsData = await insightsResponse.json();

        const actions = insightsData.data?.[0]?.actions || [];
        const leads = actions.find((action: any) => action.action_type === 'lead')?.value || 0;
        const messages = actions.find(
          (action: any) => action.action_type === 'onsite_conversion.messaging_conversation_started_7d'
        )?.value || 0;

        return {
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          start_time: campaign.start_time,
          stop_time: campaign.stop_time,
          impressions: insightsData.data?.[0]?.impressions || 0,
          clicks: insightsData.data?.[0]?.clicks || 0,
          spend: insightsData.data?.[0]?.spend || 0,
          leads,
          messages,
        };
      })
    );

    const topCampaigns = {
      top3ByLeads: [...campaignMetrics].sort((a, b) => b.leads - a.leads).slice(0, 3),
    };

    return NextResponse.json(topCampaigns);
  } catch (error: any) {
    console.error('Error fetching campaign data:', error.message);
    return NextResponse.json(
      {
        error: 'An error occurred while fetching campaign data',
        details: error.message,
      },
      { status: 500 }
    );
  }
}