"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SPORTS, ROLES } from "@/lib/constants"

export default function GetDemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    sport: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock submission
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 900)
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#0f1f2e] px-4">
        {/* soft radial accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-[48rem] w-[48rem] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side, #3B99D1 0%, transparent 60%)" }}
          />
          <div
            className="absolute bottom-[-14rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25"
            style={{ background: "radial-gradient(closest-side, #E2383A 0%, transparent 60%)" }}
          />
        </div>

        <div className="w-full max-w-md">
          {/* brand / back */}
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm">Back</span>
            </Link>
            <Link href="/" className="flex items-center gap-3" aria-label="Home">
              <span className="font-climate text-[#E85949] leading-none text-4xl sm:text-5xl">10x</span>
            </Link>
          </div>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardContent className="pt-8">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 mx-auto text-[#3B99D1]" />
                <h2 className="font-captain text-3xl text-white leading-none">Thank you!</h2>
                <p className="text-white/70">
                  We&apos;ve received your demo request. Our team will reach out within 24 hours to schedule your
                  personalized demo.
                </p>

                <div className="pt-4 grid gap-3">
                  <Link href="/">
                    <Button className="w-full h-11 bg-[#3B99D1] hover:bg-[#3B99D1]/90 text-white">
                      Back to homepage
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full h-11 border-white/30 text-white hover:text-[#3B99D1] hover:border-[#3B99D1] bg-transparent"
                    >
                      Already have an account? Sign in
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#0f1f2e] px-4">
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

      <div className="w-full max-w-3xl">
        {/* brand / back */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Back</span>
          </Link>
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <span className="font-climate text-[#E85949] leading-none text-4xl sm:text-5xl">10x</span>
          </Link>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="font-captain text-3xl text-white leading-none">Request a Demo</CardTitle>
            <CardDescription className="text-white/70">
              Tell us about your needs and we&apos;ll show you how 10x can transform your sports content strategy.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/80">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40
                               focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/80">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40
                               focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40
                             focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white/80">Company/Organization *</Label>
                <Input
                  id="company"
                  placeholder="Sports Media Inc."
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40
                             focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
                />
              </div>

              {/* Role + Sport */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Your Role *</Label>
                  <Select value={formData.role} onValueChange={(v) => handleInputChange("role", v)} required>
                    <SelectTrigger
                      className="h-12 bg-white/10 border-white/20 text-white
                                 focus:ring-2 focus:ring-[#3B99D1] focus:ring-offset-2 focus:ring-offset-[#0f1f2e]"
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1f2e] border-white/10 text-white">
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role} className="focus:bg-white/10">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Primary Sport</Label>
                  <Select value={formData.sport} onValueChange={(v) => handleInputChange("sport", v)}>
                    <SelectTrigger
                      className="h-12 bg-white/10 border-white/20 text-white
                                 focus:ring-2 focus:ring-[#3B99D1] focus:ring-offset-2 focus:ring-offset-[#0f1f2e]"
                    >
                      <SelectValue placeholder="Select primary sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1f2e] border-white/10 text-white">
                      {SPORTS.map((sport) => (
                        <SelectItem key={sport} value={sport} className="focus:bg-white/10">
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">Tell us about your needs</Label>
                <Textarea
                  id="message"
                  placeholder="What challenges are you facing with sports content creation and distribution? What features are most important to you?"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40
                             focus-visible:ring-2 focus-visible:ring-[#3B99D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium
                           bg-[#3B99D1] hover:bg-[#3B99D1]/90 text-white
                           focus-visible:ring-2 focus-visible:ring-[#E2383A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]"
              >
                {isLoading ? "Submitting…" : "Request Demo"}
              </Button>
            </form>

            {/* Secondary link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
