import { NextRequest, NextResponse } from 'next/server';

type Metric = 'leads' | 'spend' | 'ctr';

export async function GET(req: NextRequest, { params }: { params: { platform: string; adAccountId: string } }) {
    const { platform, adAccountId } = params;
    const { searchParams } = new URL(req.url);
    const metric = searchParams.get('metric') as Metric;

    if (!adAccountId) {
        return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
    }

    // Mocked top campaigns
    const campaigns = [
        { id: 'campaign_1', name: 'Campaign A', leads: 45, spend: 300, ctr: 0.04 },
        { id: 'campaign_2', name: 'Campaign B', leads: 30, spend: 250, ctr: 0.03 },
    ];

    if (!metric || !(metric in campaigns[0])) {
        return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });
    }
    
    const sortedCampaigns = campaigns.sort((a, b) => (b[metric] as number) - (a[metric] as number));

    return NextResponse.json(sortedCampaigns);
}
