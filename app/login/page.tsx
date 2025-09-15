"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication
    setTimeout(() => {
      localStorage.setItem("10x_auth", "true")
      localStorage.setItem(
        "10x_user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
          role: "Creator",
        }),
      )
      setIsLoading(false)
      router.push("/dashboard")
    }, 900)
  }

  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#0f1f2e]">
      {/* soft radial accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-[52rem] w-[52rem] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(closest-side, #3B99D1 0%, transparent 60%)" }}
        />
        <div
          className="absolute bottom-[-14rem] right-[-10rem] h-[40rem] w-[40rem] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, #E2383A 0%, transparent 60%)" }}
        />
      </div>

      <div className="w-full max-w-md px-4">
        {/* brand / back link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Back</span>
          </Link>

          {/* Text logo (Climate) in header brand color */}
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <span className="font-climate text-[#E85949] leading-none text-4xl sm:text-5xl">
              10x
            </span>
          </Link>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            {/* Titles use American Captain */}
            <CardTitle className="font-captain text-3xl text-white leading-none">
              Welcome back
            </CardTitle>
            <CardDescription className="text-white/70">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40
                    focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]
                  "
                />
              </div>

              {/* Password with toggle */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="
                      h-12 bg-white/10 border-white/20 pr-12 text-white placeholder:text-white/40
                      focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 grid place-items-center px-2 text-white/70 hover:text-white transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-sm">
                  <Link href="/reset" className="text-white/70 hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="
                  w-full h-12 text-base font-medium
                  bg-[#3B99D1] hover:bg-[#3B99D1]/90 text-white
                  focus-visible:ring-2 focus-visible:ring-[#E2383A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]
                "
              >
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="h-px bg-white/10" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#0f1f2e] px-3 text-xs text-white/50">
                or
              </span>
            </div>

            {/* Secondary CTA */}
            <div className="text-center">
              <p className="text-sm text-white/60">
                Don&apos;t have an account?{" "}
                <Link
                  href="/get-demo"
                  className="
                    font-medium text-white underline underline-offset-4 decoration-white/30
                    hover:decoration-white
                  "
                >
                  Get a demo
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* tiny disclaimer / footer link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
