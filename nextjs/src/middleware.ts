// src/middleware.ts or middleware.ts in the root
import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from './lib/database.types'

export async function middleware(request: NextRequest) {
  // Create an empty response object
  const response = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    request,
    response,
  })

  // Refresh the session token.
  // This step is important, as it ensures the session is always up-to-date
  // before the request continues to a protected route.
  // This will also automatically refresh the token in the cookies if it's expired.
  await supabase.auth.getSession()

  // If you need to protect specific routes, you can add that logic here.
  // For example, to redirect unauthenticated users from a dashboard route:
  const { data: { session } } = await supabase.auth.getSession()
  const protectedRoutes = ['/dashboard', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  
  if (isProtectedRoute && !session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Return the response object, which may now contain updated cookies
  return response
}

export const runtime = 'nodejs';

// Use a matcher to specify which paths the middleware should run on.
// This is a more performant way to handle middleware.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
}
