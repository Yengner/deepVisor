import { createClient } from "../utils/supabase/clients/browser";
import { createSupabaseClient } from "../utils/supabase/clients/server";

export async function demoLogin() {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: "test@gmail.com", 
        password: "Test123$", 
    });

    if (error) {
        throw new Error(`Demo login failed: ${error.message}`);
    }
    return { success: true }
};


