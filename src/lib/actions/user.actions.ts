'use server';

import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getErrorMessage, parseStringify } from '../utils/utils';


export async function handleLogin(email: string, password: string) {

    try {
        const supabase = await createSupabaseClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            throw error;
        }

        return { errorMessage: null }

    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
}

export async function handleSignUp(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    business_name: string
) {
    try {
        const supabase = await createSupabaseClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                    business_name,
                    phone_number,
                },
            },
        });

        if (error) {
            throw error;
        }

        return { errorMessage: null }

    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
}

// Helper function for handling sign-out
export async function handleSignOut() {

    try {
        const supabase = await createSupabaseClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        return { errorMessage: null }

    } catch (error) {

        return { errorMessage: getErrorMessage(error) }

    }
}

// Helper function for updating user
// export async function updateUser(email: string) {
//   const { error } = await supabase.supabase.auth.updateUser({ email });

//   if (error) {
//     return { success: false, message: error.message };
//   }

//   return { success: true };
// }

export async function getLoggedInUser() {
    try {
        const supabase = await createSupabaseClient();

        const { data, error } = await supabase.auth.getUser();
        // Handle any errors that comes through
        if (error || !data?.user) {
            throw error || new Error('No active user found.');
        }

        const user = await getUserInfo({ userId: data.user.id });

        return parseStringify(user);
    } catch (error) {
        return { errorMessage: getErrorMessage(error) }; // Handle any errors
    }
};

export async function getUserInfo({ userId }: getUserInfoProps) {

    try {
        const supabase = await createSupabaseClient();

        const { data } = await supabase
            .from('users') // The table where user data is stored
            .select('*')
            .eq('id', userId)
            .single();

        return parseStringify(data);
    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
};

// export async function getAdAccounts({ userId }: getAdAccountsProps) {

//     try {
//         const supabase = createSupabaseClient();

//         const { data } = await supabase
//             .from('ad_accounts') // The table where social media data is stored
//             .select('ad_account_id')
//             .eq('platform', 'facebook')
//             .eq('user_id', userId);

//         return parseStringify(data);
//     } catch (error) {

//     }

// }
