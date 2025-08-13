"use client"

import { createClient } from "@/lib/supabase-client"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  const displayName = user?.user_metadata?.name || user?.email || "User"

  // Only show header on "/" and "/dashboard" pages
  if (pathname !== "/" && pathname !== "/dashboard") {
    return null
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-[1550px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* App Name */}
          <div className="flex flex-col">
            <Link href={user ? "/dashboard" : "/"} className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-extrabold text-violet-600">
                Creator CRM
              </h1>
            </Link>
            {/* Show welcome message only on dashboard */}
            {pathname === "/dashboard" && user && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>Welcome, <span className="font-medium text-gray-900">{displayName}</span></span>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {pathname === "/" && !user ? (
              /* Public page - show Get Started / Sign In */
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : pathname === "/dashboard" && user ? (
              /* Dashboard page - show user info and sign out */
              <div className="flex items-center gap-4">
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {loading ? "Signing out..." : "Sign Out"}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}