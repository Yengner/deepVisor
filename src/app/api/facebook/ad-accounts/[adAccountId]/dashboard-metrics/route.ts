// src/app/api/[platform]/ad-accounts/[adAccountId]/dashboard-metrics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { platform: string; adAccountId: string } }) {
  const { platform, adAccountId } = params;

  if (!adAccountId) {
    return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
  }

  // Mocked data for testing
  const dashboardMetrics = {
    impressions: 25000,
    clicks: 1200,
    spend: 500,
    conversions: 75,
  };

  return NextResponse.json(dashboardMetrics);
}
