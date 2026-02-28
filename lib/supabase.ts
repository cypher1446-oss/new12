import { createBrowserClient } from '@supabase/ssr'

// Client-side client (Synchronous, for use in Client Components)
export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        throw new Error('Supabase configuration is missing.')
    }

    return createBrowserClient(url, key)
}
