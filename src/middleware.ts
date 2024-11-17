import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/utils/supabase/clients/middleware'

export async function middleware(request: NextRequest) {
  console.log('Middleware processing:');
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next(); // Skip middleware for API routes
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)',
    // '/dashboard',
    // '/',
  ],
};
