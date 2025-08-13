"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, Send, CheckCircle, Sparkles } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4">
        <div className="w-full max-w-md">

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-green-600">Email Sent Successfully</CardTitle>
              <CardDescription className="text-slate-600">
                We've sent a password reset link to <span className="font-semibold text-slate-900">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-900">
                    Click the link in your email to reset your password. The link will expire in 1 hour for security.
                  </p>
                </div>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">Didn't receive the email? Check your spam folder</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold text-center text-violet-600">Forgot Password?</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Enter your email address and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-700 font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 bg-white border-slate-200 focus:border-violet-500 focus:ring-violet-500/20"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending reset link...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Reset Link
                  </div>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">Secure password reset powered by modern encryption</p>
        </div>
      </div>
    </div>
  )
}
