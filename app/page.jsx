import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Find Perfect
                <span className="text-violet-600 block">Sports Creators</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover and connect with top sports content creators across social media platforms. 
                Search, analyze, and project engagement metrics to build winning partnerships for your team.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              <div className="bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 text-sm font-medium text-violet-700">
                🔍 Creator Search & Discovery
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 text-sm font-medium text-violet-700">
                📊 Engagement Projections
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 text-sm font-medium text-violet-700">
                📈 Reach Projections
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform cursor-pointer"
                >
                  Start Finding Creators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}