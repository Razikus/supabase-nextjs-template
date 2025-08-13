import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function middleware(request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.trim() === "" || supabaseAnonKey.trim() === "") {
    console.warn("Supabase environment variables not configured. Skipping authentication checks.")
    return NextResponse.next()
  }

  try {
    new URL(supabaseUrl)
  } catch (urlError) {
    console.warn("Invalid Supabase URL format. Skipping authentication checks.")
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Define protected routes that require authentication
    const protectedRoutes = ["/dashboard"]

    // Define auth routes that should redirect to dashboard if user is logged in
    const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"]

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // Special handling for root path "/"
    if (pathname === "/") {
      // If user is authenticated and visits "/", redirect to dashboard
      if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
      // If user is not authenticated, allow them to see the landing page
      return supabaseResponse
    }

    // If user is not authenticated and trying to access protected route
    if (!user && isProtectedRoute) {
      const redirectUrl = new URL("/login", request.url)
      // Add the original URL as a redirect parameter
      redirectUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (user && isAuthRoute) {
      // Check if there's a redirectTo parameter from the login page
      const redirectTo = request.nextUrl.searchParams.get("redirectTo")
      const redirectUrl = new URL(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/dashboard", request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return supabaseResponse
  } catch (error) {
    console.error("Middleware error:", error.message)
    // If there's an error with Supabase, allow the request to proceed
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}