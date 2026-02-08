import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url') {
        console.warn('Supabase URL and Anon Key are missing or placeholders. Using mock client.');
        // Return a mock client that prevents crashes but logs errors on use
        return {
            auth: {
                signInWithPassword: async () => ({ error: { message: 'Supabase credentials missing. Check console.' } }),
                signInWithOAuth: async () => ({ error: { message: 'Supabase credentials missing. Check console.' } }),
                signUp: async () => ({ error: { message: 'Supabase credentials missing. Check console.' } }),
                getUser: async () => ({ data: { user: null }, error: null }),
                getSession: async () => ({ data: { session: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            },
            from: () => ({
                select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }),
                insert: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                update: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                upload: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                download: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                getPublicUrl: () => ({ data: { publicUrl: '' } }),
            }),
            storage: {
                from: () => ({
                    upload: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                    download: async () => ({ error: { message: 'Supabase credentials missing.' } }),
                    getPublicUrl: () => ({ data: { publicUrl: '' } }),
                })
            }
        } as any;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
