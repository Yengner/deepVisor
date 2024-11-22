import { NextRequest, NextResponse } from 'next/server';

type TimeRange = 'daily' | 'weekly' | 'monthly';

export async function GET(req: NextRequest, { params }: { params: { platform: string; adAccountId: string } }) {
    const { platform, adAccountId } = params;
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('time_range') as TimeRange;

    if (!adAccountId) {
        return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
    }

    // Mocked time-based data
    const insights: Record<TimeRange, { [key: string]: string | number }[]> = {
        daily: [
            { date: '2024-11-01', spend: 50, leads: 10 },
            { date: '2024-11-02', spend: 60, leads: 12 },
        ],
        weekly: [
            { week: '2024-W44', spend: 350, leads: 70 },
            { week: '2024-W45', spend: 400, leads: 80 },
        ],
        monthly: [
            { month: '2024-11', spend: 1500, leads: 300 },
            { month: '2024-12', spend: 1600, leads: 320 },
        ],
    };

    if (!timeRange || !insights[timeRange]) {
        return NextResponse.json({ error: 'Invalid time range' }, { status: 400 });
    }
    return NextResponse.json(insights[timeRange]);

}
