import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the auth token if needed
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    // If no session is found and it's a protected route, redirect to login
    if (request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/sign-up") {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from login or signup pages
  if (session && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up")) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}
