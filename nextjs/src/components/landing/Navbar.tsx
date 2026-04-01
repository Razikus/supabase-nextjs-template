"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthAwareButtons from "@/components/AuthAwareButtons";
import BetaLogo from "./BetaLogo";

const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#precios", label: "Precios" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-secondary-100 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0">
            <BetaLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary-600 hover:text-secondary-900 transition-colors duration-200 cursor-pointer text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <AuthAwareButtons variant="nav" />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors duration-200 cursor-pointer"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-secondary-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-secondary-600 hover:text-secondary-900 transition-colors duration-200 py-2 text-base font-medium cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-secondary-100">
              <AuthAwareButtons variant="nav" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
