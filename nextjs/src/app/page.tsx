import React from 'react';
import Link from 'next/link';
import AuthAwareButtons from '@/components/AuthAwareButtons';

export default function Home() {
  const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;

  return (
    <div className="min-h-screen">
      {/* This is the original navigation bar from the template.
        We'll keep this as it's well-built and includes your login/logout buttons.
      */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {productName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>

              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link
                href="https://github.com/Razikus/supabase-nextjs-template"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </Link>

              <Link
                href="https://github.com/Razikus/supabase-nextjs-template"
                className="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Grab This Template
              </Link>

              <AuthAwareButtons variant="nav" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              A Platform For Rights Holders & Creators
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Securely distribute your live event streams to selected content creators for greater audience reach.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                I’m a Rights Holder
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300">
                I’m a Creator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">1. Upload Event</h3>
              <p className="mt-2 text-gray-600">Create & manage events with key details and preview clips.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">2. Select Creators</h3>
              <p className="mt-2 text-gray-600">Search and select creators from a database of partners.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">3. Distribute Stream</h3>
              <p className="mt-2 text-gray-600">Securely distribute stream access to approved creators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* This is the original footer from the template.
        You can keep this as a good starting point for your site's links.
      */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Product</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="https://github.com/Razikus/supabase-nextjs-template" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/legal/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} {productName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
