import { createServerClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/** True when Supabase env vars are set. Use to skip DB calls when not configured. */
export function isSupabaseConfigured(): boolean {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !!(url && key)
}

// Server-side client (Async, for use in Server Components & Route Handlers)
// Returns null when Supabase is not configured so callers can degrade gracefully.
export async function createSessionClient(): Promise<ReturnType<typeof createServerClient> | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) return null

    const cookieStore = await cookies()

    return createServerClient(url, key, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options)
                    })
                } catch (error) {
                    // Ignored in Server Components
                }
            },
        },
    })
}

// ADMIN Client - Bypasses RLS. Returns null when Supabase is not configured.
export async function createAdminClient(): Promise<SupabaseClient | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    let key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!key || key === 'N/A_NOT_AVAILABLE_IN_MCP') {
        key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }

    if (!url || !key) return null

    return createClient(url, key, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    })
}
