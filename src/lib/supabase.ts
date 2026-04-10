// src/lib/supabase.ts
// Lazy Supabase client. Environment variables are read on first use so that
// `next build` (which imports API routes during page data collection) does
// not crash when variables are temporarily absent.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

let _client: SupabaseClient<Database> | null = null

export const getSupabase = (): SupabaseClient<Database> => {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)'
    )
  }
  _client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  })
  return _client
}

// Proxy that forwards all property access to the lazily-initialized client.
// Keeps existing `supabase.from(...)` call sites working without changes.
export const supabase = new Proxy(
  {} as SupabaseClient<Database>,
  {
    get(_target, prop, receiver) {
      const client = getSupabase()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (client as any)[prop]
      return typeof value === 'function' ? value.bind(client) : value
    },
  }
)

// Admin client for server-side operations that need the service role key.
export const createAdminClient = (): SupabaseClient<Database> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin credentials (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)'
    )
  }
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
