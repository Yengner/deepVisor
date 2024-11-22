import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { adAccountId: string } }) {
  const { adAccountId } =  params;

  if (!adAccountId) return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });

  // Mocked campaign data for testing
  const campaigns = [
    { id: 'campaign_1', name: `Campaign 1 for ${adAccountId}` },
    { id: 'campaign_2', name: `Campaign 2 for ${adAccountId}` },
  ];

  return NextResponse.json(campaigns);
}
