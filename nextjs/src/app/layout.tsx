import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import CookieConsent from "@/components/Cookies";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PRODUCTNAME,
  description: "CRM para corredores inmobiliarios en Chile. Reserva leads exclusivos y cierra mas ventas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme = process.env.NEXT_PUBLIC_THEME
  if(!theme) {
    theme = "theme-replit"
  }
  const gaID = process.env.NEXT_PUBLIC_GOOGLE_TAG;
  return (
    <html lang="es">
    <body className={`${theme} ${inter.variable} font-sans`}>
      {children}
      <Analytics />
      <CookieConsent />
      { gaID && (
          <GoogleAnalytics gaId={gaID}/>
      )}

    </body>
    </html>
  );
}
