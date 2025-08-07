import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';
import { Database } from '@/lib/database.types';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({
    request,
    response,
  });
  await supabase.auth.getSession();
  return response;
}
