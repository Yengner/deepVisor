import { NextResponse } from 'next/server';
// import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';

export async function GET(request: Request) {
  try {
    const userId = 'USER_ID_FROM_SESSION'; // Replace with actual logic to get the user ID
    const platform = new URL(request.url).searchParams.get('platform');

    if (!userId || !platform) {
      return NextResponse.json({ error: 'User ID or platform is missing.' }, { status: 400 });
    }

    // const supabase = createSupabaseClient();
    // const { data, error } = await supabase
    //   .from('access_tokens')
    //   .select('access_token')
    //   .eq('user_id', userId)
    //   .eq('platform', platform)
    //   .single();

    // if (error || !data) {
    //   throw new Error('Access token not found');
    // }

    // return NextResponse.json({ accessToken: data.access_token });
    return NextResponse.json({ accessToken: 'ACCESS_TOKEN' });
  } catch (error) {
    console.error('Error fetching access token:', error);
    return NextResponse.json({ error: 'Failed to fetch access token.' }, { status: 500 });
  }
}
