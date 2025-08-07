// src/middleware.ts

import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from './lib/database.types'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const supabase = createMiddlewareClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    request,
    response,
  })

  // This is the correct way to get and refresh the session
  await supabase.auth.getSession()

  return response
}

export const runtime = 'nodejs';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
}
