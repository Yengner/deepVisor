// /app/api/auth/google/route.ts
import { NextResponse } from 'next/server';
import { getGoogleAuthUrl } from '@/lib/api/auth/google';

export async function GET() {
  try {
    const url = getGoogleAuthUrl();
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating Google Auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate Google Auth URL' }, { status: 500 });
  }
}
