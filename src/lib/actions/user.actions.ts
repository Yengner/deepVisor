'use server'

import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getErrorMessage, parseStringify } from '../utils/utils';

// Create a helper function to initialize Supabase server-side

// Helper function for handling login
export async function handleLogin(email: string, password: string) {
    
    try{
    const { auth } = createSupabaseClient();
    const { error } = await auth.signInWithPassword({ email, password });
  
    if (error) {
        throw error;
    }

    return { errorMessage: null}
    
    } catch(error) {
        return { errorMessage: getErrorMessage(error)}
    }
}

// Helper function for handling sign-up
export async function handleSignUp(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  business_name: string
) {
    try{
        const { auth } = createSupabaseClient();

        const { error } = await auth.signUp({
            email,
            password,
            options: {
            data: {
                first_name,
                last_name,
                phone_number,
                business_name,
            },
        },
    });

        if (error) {
            throw error;
        }

        return { errorMessage: null}

    } catch(error) {
        return { errorMessage: getErrorMessage(error)}
    }
}

// Helper function for handling sign-out
export async function handleSignOut() {

    try{
        const { auth } = createSupabaseClient();
        const { error } = await auth.signOut();

        if (error) {
            throw error;
        }

        return { errorMessage: null}

    } catch(error) {

        return { errorMessage: getErrorMessage(error)}

    }
}

// Helper function for updating user
// export async function updateUser(email: string) {
//   const { error } = await supabase.auth.updateUser({ email });

//   if (error) {
//     return { success: false, message: error.message };
//   }

//   return { success: true };
// }

export async function getLoggedInUser() {
    try {
      const { auth } = createSupabaseClient();
      
      const { data, error } = await auth.getUser();
      // Handle any user errors
      if (error || !data?.user) {
        throw error || new Error('No active user found.');
      }
  
      const user = data?.user;
      
      return parseStringify(user)
      
    } catch (error) {
      return { errorMessage: getErrorMessage(error) }; // Handle any errors
    }
  }