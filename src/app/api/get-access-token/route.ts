import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseClient();
    const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a'; // Replace with actual logic to get the user ID
    const platform = new URL(request.url).searchParams.get('platform');

    if (!userId || !platform) {
      return NextResponse.json({ error: 'User ID or platform is missing.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('access_tokens')
      .select('access_token')
      .eq('user_id', userId)
      .eq('platform', platform)
      .single();

    if (error || !data) {
      throw new Error('Access token not found');
    }

    return NextResponse.json({ accessToken: data.access_token });
  } catch (error) {
    console.error('Error fetching access token:', error);
    return NextResponse.json({ error: 'Failed to fetch access token.' }, { status: 500 });
  }
}
