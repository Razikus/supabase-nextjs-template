// nextjs/src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// These are likely aliases used throughout your code
export const createSPASassClient = createClient;
export const createSPAClient = createClient;
export const createSPASassClientAuthenticated = createClient;
