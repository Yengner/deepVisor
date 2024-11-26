import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { adAccountId: string } }
) {
    const { adAccountId } = params;

    if (!adAccountId) {
        return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Access token is missing or invalid' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
        const today = new Date().toISOString().split('T')[0];
        // Facebook API URLs for balance and today's spend
        const balanceUrl = `https://graph.facebook.com/v21.0/${adAccountId}?fields=balance`;
        const spendUrl = `https://graph.facebook.com/v21.0/${adAccountId}/insights?fields=spend&time_range[since]=${today}&time_range[until]=${today}`;
        const [balanceResponse, spendResponse] = await Promise.all([
            fetch(balanceUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }),
            fetch(spendUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }),
        ]);

        if (!balanceResponse.ok) {
            throw new Error(`Error fetching balance: ${balanceResponse.statusText}`);
        }
        if (!spendResponse.ok) {
            throw new Error(`Error fetching today's spend: ${spendResponse.statusText}`);
        }

        const balanceData = await balanceResponse.json();
        const spendData = await spendResponse.json();

        // Return combined data
        return NextResponse.json({
            balance: balanceData.balance,
            todaySpend: spendData.data?.[0]?.spend || 0, // Fallback to 0 if no spend data
        });
    } catch (error: any) {
        console.error('Error fetching and processing data:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
