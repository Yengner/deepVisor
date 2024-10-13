import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options) // Only set cookies in the response
          )
        },
      },
    }
  )

  // Refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect logged-in users away from login or signup pages
  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up")) {
    const homeUrl = new URL('/', request.url); // Redirect to home or dashboard
    return NextResponse.redirect(homeUrl);
  }

  // Redirect unauthenticated users to the login page if they try to access protected routes
  if (!user && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/sign-up") {
    const loginUrl = new URL('/login', request.url); // Redirect to login if not authenticated
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}