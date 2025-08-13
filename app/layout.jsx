import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

export const metadata = {
  title: "Creator CRM Dashboard",
  description: "Professional creator management dashboard with advanced analytics and insights",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable} antialiased`}>
      <body className="font-sans">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}