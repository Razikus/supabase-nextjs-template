// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Climate_Crisis } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const climateCrisis = Climate_Crisis({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-climate-crisis",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const americanCaptain = localFont({
  src: "../public/fonts/AmericanCaptain.ttf", // put the file here
  variable: "--font-american-captain",
  display: "swap",
})

export const metadata: Metadata = {
  title: "10x - Sports Creator Dashboard",
  description: "Desktop-first MVP dashboard for sports creators, events, and streaming",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${climateCrisis.variable} ${inter.variable} ${americanCaptain.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
