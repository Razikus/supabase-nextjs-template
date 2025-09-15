"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Menu } from "lucide-react"

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#132945]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo as text (Climate Crisis), ~2x size */}
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <span className="font-climate text-[#E85949] leading-none tracking-tight text-4xl md:text-6xl">
              10x
            </span>
          </Link>

          {/* Desktop Links / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/case-studies">
              <Button variant="ghost" className="text-white hover:bg-white/10 text-base px-5 py-2.5">
                Case Studies
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 text-base px-5 py-2.5">
                Login
              </Button>
            </Link>
            <Link href="/get-demo">
              <Button className="bg-[#3B99D1] hover:bg-[#3B99D1]/90 text-base px-6 py-2.5">
                Get a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] sm:w-96 bg-[#0f1f36] text-white border-white/10"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="font-climate text-white leading-none text-[48px]">10x</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-2 text-base">
                  <Link href="/" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Home
                  </Link>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Dashboard
                  </Link>
                  <Link href="/events" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Events
                  </Link>
                  <Link href="/creators" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Creators
                  </Link>
                  <Link href="/streaming" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Streaming
                  </Link>
                  <Link href="/case-studies" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/10">
                    Case Studies
                  </Link>
                </div>

                <div className="mt-6 h-px bg-white/10" />

                {/* Mobile CTAs */}
                <div className="mt-6 grid gap-3">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center text-white hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                  <Link href="/get-demo" onClick={() => setOpen(false)}>
                    <Button className="w-full justify-center bg-[#3B99D1] hover:bg-[#3B99D1]/90">
                      Get a Demo
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Safe-area inset for iOS notches */}
      <div className="h-[env(safe-area-inset-top)]"></div>
    </nav>
  )
}
