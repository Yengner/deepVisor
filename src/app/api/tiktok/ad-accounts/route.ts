import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
//   const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
//   if (!accessToken) return NextResponse.json({ error: 'Access token missing' }, { status: 400 });

  // Mocked ad account data
  const adAccounts = [
    { id: 'act_800880', account_id: '800880' },
    { id: 'act_102938', account_id: '102938' },
  ];

  return NextResponse.json(adAccounts);
}
