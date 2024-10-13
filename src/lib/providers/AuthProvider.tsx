import { createContext, useState, useEffect, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/utils/supabase/clients/browser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    handleSignOut: () => Promise<void>;
    handleLogin: (email: string, password: string) => Promise<{ success: boolean }>;
    handleSignUp: (
        email: string, 
        password: string,
        first_name: string, 
        last_name: string, 
        phone_number: string, 
        business_name: string
    ) => Promise<{ success: boolean }>;
    updateUser: (
        email: string,
        // Add password, phone_number, etc. when needed
    ) => Promise<{ success: boolean }>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const supabase = createBrowserClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (
                event === 'SIGNED_IN' || 
                event === 'INITIAL_SESSION' || 
                event === 'USER_UPDATED'
            ) {
                setUser(session?.user ?? null);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            data?.subscription.unsubscribe();
        };
    }, [supabase]);

    async function handleSignOut() {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error(error?.message || "Sign out failed");
        } else {
            router.refresh();
        }
        setLoading(false);
    }

    async function handleLogin(email: string, password: string) {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            toast.error(error?.message || "Login failed");
            return { success: false };
        } else {
            router.refresh();
            return { success: true };
        }
    }

    async function handleSignUp(email: string, password: string, first_name: string, last_name: string, phone_number: string, business_name: string) {
        setLoading(true);

        // Sign up with Supabase Auth and pass metadata (raw_user_meta_data)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    user_metadata: {
                        first_name,
                        last_name,
                        phone_number,
                        business_name
                    }
                }
            }
        });
        
        setLoading(false);
        if (error) {
            toast.error(error?.message || "Sign up failed");
            return { success: false };
        } else {
            // Automatically refresh to sync session
            router.refresh();
            return { success: true };

        }
    }

    async function updateUser(email: string) {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ email });
        setLoading(false);
        if (error) {
            if (error.message === "Database error saving new user") {
                toast.error("User already exists");
            } else {
                toast.error(error?.message || "Update failed");
            }
            return { success: false };
        } else {
            router.refresh();
            return { success: true };
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                handleSignOut,
                handleLogin,
                handleSignUp,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
