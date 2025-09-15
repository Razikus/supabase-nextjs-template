"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  Video,
  TrendingUp,
  Plus,
  ArrowRight,
  Activity,
  Clock,
  Star,
  Zap,
  Search,
} from "lucide-react"
import Link from "next/link"

// ===== Top Stats =====
const stats = [
  {
    title: "Total Creators",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Active creators in network",
  },
  {
    title: "Upcoming Events", // was Live Events
    value: "23",
    change: "+15%",
    changeType: "positive" as const,
    icon: Calendar, // calendar for upcoming
    description: "Scheduled and coming up",
  },
  {
    title: "Total Engagement",
    value: "94.2M",
    change: "+8.3%",
    changeType: "positive" as const,
    icon: Activity,
    description: "Interactions this month",
  },
  {
    title: "Sponsor Media Value (£)", // was Revenue
    value: "£1.2M",
    change: "+23%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Estimated media value this month",
  },
  // New card
  {
    title: "Ticket Sales CTR",
    value: "8,763",
    change: "+32%",
    changeType: "positive" as const,
    icon: Zap,
    description: "Clicks from ticket promotions",
  },
]

// ===== Recent Activity =====
const recentActivity = [
  // New win item at top
  {
    id: 0,
    type: "milestone",
    title: "Ticket CTR up 32% vs last month",
    description: "Strong uplift from new placements and copy",
    time: "Just now",
    status: "win",
    avatar: null,
    metric: "CTR +32%",
  },
  {
    id: 1,
    type: "creator",
    title: "New creator joined",
    description: "Sarah Johnson (Basketball) added to network",
    time: "2 hours ago",
    status: "new",
    avatar: "/basketball-player.png",
    metric: "+52K followers",
  },
  {
    id: 2,
    type: "event",
    title: "Event went live",
    description: "NBA Finals Game 7 - Live Coverage",
    time: "4 hours ago",
    status: "live",
    avatar: "/sports-stadium-with-athletes-training-dynamic-acti.png",
    metric: "2.1M viewers",
  },
  {
    id: 3,
    type: "milestone",
    title: "Engagement milestone",
    description: "Network reached 100M total interactions",
    time: "6 hours ago",
    status: "achievement",
    avatar: null,
    metric: "100M interactions",
  },
  {
    id: 4,
    type: "stream",
    title: "Stream completed",
    description: "College Football Championship",
    time: "8 hours ago",
    status: "completed",
    avatar: "/tom-brady-football-player.png",
    metric: "1.8M peak viewers",
  },
]

// ===== Dummy Creators (clear placeholders) =====
const topCreators = [
  {
    id: 1,
    name: "Alex Carter",
    sport: "Basketball",
    followers: "1.2M",
    engagement: "8.4%",
    avatar: "https://i.pravatar.cc/100?img=5",
    verified: true,
    recentGrowth: "+2.1%",
    totalViews: "45M",
  },
  {
    id: 2,
    name: "Jordan Lee",
    sport: "Tennis",
    followers: "890K",
    engagement: "12.1%",
    avatar: "https://i.pravatar.cc/100?img=12",
    verified: true,
    recentGrowth: "+5.3%",
    totalViews: "32M",
  },
  {
    id: 3,
    name: "Taylor Brooks",
    sport: "Football",
    followers: "2.4M",
    engagement: "9.7%",
    avatar: "https://i.pravatar.cc/100?img=31",
    verified: true,
    recentGrowth: "+1.8%",
    totalViews: "78M",
  },
  {
    id: 4,
    name: "Sam Nguyen",
    sport: "Basketball",
    followers: "1.8M",
    engagement: "11.3%",
    avatar: "https://i.pravatar.cc/100?img=22",
    verified: true,
    recentGrowth: "+3.2%",
    totalViews: "54M",
  },
  {
    id: 5,
    name: "Morgan Diaz",
    sport: "Soccer",
    followers: "640K",
    engagement: "14.2%",
    avatar: "https://i.pravatar.cc/100?img=15",
    verified: true,
    recentGrowth: "+4.1%",
    totalViews: "21M",
  },
]

// ===== Asset Valuation (Previous Event) =====
const BRAND_ASSETS = [
  {
    name: "Pirelli",
    logo: "/brands/Pirelli_logo.png",
    exposure: "167:56 (h:s)",
    audience: "1.3m",
    ctr: "4,367",
    value: "£56,678",
  },
  {
    name: "Peroni",
    logo: "/brands/Peroni_Historic_Logo.png", 
    exposure: "98:45 (h:s)",
    audience: "1.3m",
    ctr: "65",
    value: "£12,463",
  },
  {
    name: "Etihad-Airways",
    logo: "/brands/Logo-Etihad-Airways-600x600.jpg", 
    exposure: "187:47 (h:s)",
    audience: "1.3m",
    ctr: "564",
    value: "£88,876",
  },
  {
    name: "American Express",
    logo: "/brands/American_Express_logo.png", 
    exposure: "121:44 (h:s)",
    audience: "1.3m",
    ctr: "874",
    value: "£187,008",
  },
]

// ===== Quick Actions =====
const quickActions = [
  {
    title: "Create Event",
    description: "Set up a new sports event",
    icon: Calendar,
    href: "/dashboard/events",
    color: "bg-blue-500",
  },
  {
    title: "Search Creators", // was Add Creator
    description: "Find & explore creators",
    icon: Search,
    href: "/dashboard/creators",
    color: "bg-green-500",
  },
  {
    title: "Go Live",
    description: "Start streaming immediately",
    icon: Video,
    href: "/dashboard/streaming",
    color: "bg-red-500",
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: TrendingUp,
    href: "/dashboard/analytics",
    color: "bg-purple-500",
  },
]

function TopCreatorsWidget() {
  const [creators, setCreators] = useState(topCreators)
  const [isLoading, setIsLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"supabase" | "demo">("demo")

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const hasSupabase = false // swap when wired
        if (hasSupabase) {
          setDataSource("supabase")
          // fetch live data here
        } else {
          setDataSource("demo")
          setCreators(topCreators)
        }
      } catch (error) {
        console.log("[v0] Falling back to demo data:", error)
        setDataSource("demo")
        setCreators(topCreators)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCreators()
  }, [])

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="font-captain h-5 w-5 mr-2 text-yellow-500" />
            Top 10 Creators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Top 10 Creators
            {dataSource === "demo" && (
              <Badge variant="outline" className="ml-2 text-xs">
                Demo Mode
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {dataSource === "supabase"
              ? "Live data from your Supabase database"
              : "Highest performing creators in your network (demo data)"}
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/creators">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {creators.map((creator, index) => (
            <div
              key={creator.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                  <AvatarFallback className="bg-brand-blue text-white">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    {creator.verified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{creator.sport}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-gray-900">{creator.followers}</p>
                    <p className="text-xs text-gray-500">followers</p>
                  </div>
                  <div>
                    <p className="font-medium text-green-600">{creator.engagement}</p>
                    <p className="text-xs text-gray-500">engagement</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-600">{creator.recentGrowth}</p>
                    <p className="text-xs text-gray-500">growth</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-captain text-3xl text-gray-900">Dashboard</h1>
          <p className="font-captain text-gray-600 mt-1">
            Welcome back! Here's what's happening with your sports network.
          </p>
        </div>
        <div className="vflex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/analytics">
              <Activity className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
          <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
            <Link href="/dashboard/events">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="font-captain font-bold flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <div className="flex items-center p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer group">
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Creators Widget */}
        <TopCreatorsWidget />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-captain font-normal flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="" />
                        <AvatarFallback className="bg-brand-blue text-white text-xs">
                          {activity.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <Badge
                        variant={
                          activity.status === "new"
                            ? "default"
                            : activity.status === "live"
                              ? "destructive"
                              : activity.status === "achievement" || activity.status === "win"
                                ? "secondary"
                                : "outline"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">{activity.time}</p>
                      <p className="text-xs font-medium text-brand-blue">{activity.metric}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Valuation (Previous Event) */}
      <section>
        <div className="mb-2">
          <h2 className="font-captain text-2xl text-gray-900">Asset Valuation (Previous Event)</h2>
          <p className="text-sm text-gray-500">
            Brand exposure, reach and value from the most recent event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_ASSETS.map((b) => (
            <Card key={b.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-0 pt-6">
                {/* Logo or fallback brand name */}
                <div className="w-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    className="h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                      const fallback = (e.currentTarget.nextSibling as HTMLElement)
                      if (fallback) fallback.style.display = "block"
                    }}
                  />
                  <div style={{ display: "none" }} className="font-medium text-gray-700">
                    {b.name}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-2 py-6 min-h-[220px]">
                <div className="text-sm text-gray-600">Brand Exposure</div>
                <div className="text-xl font-semibold text-gray-900">{b.exposure}</div>

                <div className="text-sm text-gray-600 pt-2">Audience reached</div>
                <div className="text-xl font-semibold text-gray-900">{b.audience}</div>

                <div className="text-sm text-gray-600 pt-2">CTR Promotion</div>
                <div className="text-xl font-semibold text-gray-900">{b.ctr}</div>

                <div className="text-sm text-gray-600 pt-2">Sponsor Value</div>
                <div className="text-2xl font-bold text-gray-900">{b.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
