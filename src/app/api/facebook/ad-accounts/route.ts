import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
//   const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
//   if (!accessToken) return NextResponse.json({ error: 'Access token missing' }, { status: 400 });

  // Mocked ad account data from supabase
  const adAccounts = [
    { id: 'act_782974607026594', account_id: '782974607026594' },
    { id: 'act_1570674830419448', account_id: '1570674830419448' },
    { id: 'act_1034892224237983', account_id: '1034892224237983' },
    { id: 'act_553617767123729', account_id: '553617767123729' },
  ];

  return NextResponse.json(adAccounts);
}
