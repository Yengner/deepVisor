import { createServerClient} from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function getUser() {
  const { auth } = createSupabaseClient(); // Use the server-side client here
  const { data, error } = await auth.getUser();

  if (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }

  return data.user;
}

export async function protectRoute() {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
}