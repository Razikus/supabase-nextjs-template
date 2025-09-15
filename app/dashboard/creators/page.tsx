"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Grid3X3, List, Download, ExternalLink, Users, TrendingUp, CheckCircle2 } from "lucide-react"
import { SPORTS } from "@/lib/constants"

// Mock creator data
// /public/creators/* -> add avatars/logos matching these filenames
const mockCreators = [
  {
    id: 1,
    name: "The Race",
    username: "@WeAreTheRace",
    sport: "Motorsport",
    role: "Media/Publisher",
    followers: "1.2M",
    followersNum: 1200000,
    engagement: "6.2%",
    engagementNum: 6.2,
    verified: true,
    location: "London, UK",
    bio: "In-depth F1 news and analysis.",
    avatar: "/creators/therace-avatar.png",
    logo: "/creators/therace-logo.png",
    recentPosts: 120,
    avgViews: "350K",
  },
  {
    id: 2,
    name: "Driver61",
    username: "@Driver61",
    sport: "Motorsport",
    role: "Creator",
    followers: "1.5M",
    followersNum: 1500000,
    engagement: "7.8%",
    engagementNum: 7.8,
    verified: true,
    location: "UK",
    bio: "The technical side of racing.",
    avatar: "/creators/driver61-avatar.png",
    logo: "/creators/driver61-logo.png",
    recentPosts: 95,
    avgViews: "420K",
  },
  {
    id: 3,
    name: "Fight Hub TV",
    username: "@fighthub",
    sport: "Boxing & MMA",
    role: "Media/Publisher",
    followers: "1.1M",
    followersNum: 1100000,
    engagement: "5.3%",
    engagementNum: 5.3,
    verified: true,
    location: "Los Angeles, CA",
    bio: "Daily interviews with fighters.",
    avatar: "/creators/fighthubtv-avatar.png",
    logo: "/creators/fighthubtv-logo.png",
    recentPosts: 180,
    avgViews: "300K",
  },
  {
    id: 4,
    name: "iFL TV",
    username: "@iFLTV",
    sport: "Boxing",
    role: "Media/Publisher",
    followers: "950K",
    followersNum: 950000,
    engagement: "4.9%",
    engagementNum: 4.9,
    verified: true,
    location: "London, UK",
    bio: "Prolific interviews, fight week content.",
    avatar: "https://yt3.googleusercontent.com/54lOeYFVTPAPqyGGxxjIRco4My4ZqgPmi132mnUkz951GoMjj6HZyyCQxQ6_ErHAZaCPYhEgxQ=s160-c-k-c0x00ffffff-no-rj",
    logo: "/creators/ifltv-logo.png",
    recentPosts: 220,
    avgViews: "250K",
  },
  {
    id: 5,
    name: "AFTV",
    username: "@AFTVmedia",
    sport: "Football",
    role: "Fan Channel",
    followers: "1.6M",
    followersNum: 1600000,
    engagement: "6.0%",
    engagementNum: 6.0,
    verified: true,
    location: "London, UK",
    bio: "Uncensored fan opinions, pre and post-match.",
    avatar: "https://yt3.googleusercontent.com/cD9x1xWSoGy2Sssi-LXXiKg3bqOCxyRshqnrFP43paM8eqqxLi2gbRPMMdfzsGbs5q46Zim_rg=s160-c-k-c0x00ffffff-no-rj",
    logo: "/creators/aftv-logo.png",
    recentPosts: 200,
    avgViews: "400K",
  },
  {
    id: 6,
    name: "The United Stand",
    username: "@UnitedStand",
    sport: "Football",
    role: "Fan Channel",
    followers: "1.8M",
    followersNum: 1800000,
    engagement: "6.5%",
    engagementNum: 6.5,
    verified: true,
    location: "Manchester, UK",
    bio: "Man Utd news, fan reactions.",
    avatar: "https://yt3.googleusercontent.com/gUBxtZkLpcmq-daHKZEe9DfRU9S5wMKVdv3ytRBajd-DaHla8OB3ycx6qbHkBpGa5kQIiCIC9w=s160-c-k-c0x00ffffff-no-rj",
    logo: "/creators/unitedstand-logo.png",
    recentPosts: 210,
    avgViews: "430K",
  },
  {
    id: 7,
    name: "The Hockey Guy",
    username: "@TheHockeyGuy",
    sport: "Ice Hockey",
    role: "Creator/Analyst",
    followers: "730K",
    followersNum: 730000,
    engagement: "7.1%",
    engagementNum: 7.1,
    verified: true,
    location: "British Columbia, Canada",
    bio: "Insightful analysis of all 32 NHL teams.",
    avatar: "https://yt3.googleusercontent.com/m0WHv2vqGOFOv-_b0J8CgWBBr3eip312UgsE7AHQss7Hz0p5ocijUxZADYWkruQxB-Ge-kAeaA=s160-c-k-c0x00ffffff-no-rj",
    logo: "/creators/thehockeyguy-logo.png",
    recentPosts: 240,
    avgViews: "180K",
  },
  {
    id: 8,
    name: "Puck Pedia",
    username: "@PuckPediaTV",
    sport: "Ice Hockey",
    role: "Data/Resource",
    followers: "210K",
    followersNum: 210000,
    engagement: "3.8%",
    engagementNum: 3.8,
    verified: true,
    location: "Calgary, Canada",
    bio: "Financial and statistical hockey resource.",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_kqLat3EhRbUlpuCI5GSkICIG1vH0yLYn4Y7FTf_xVk-A=s160-c-k-c0x00ffffff-no-rj",
    logo: "/creators/puckpedia-logo.png",
    recentPosts: 130,
    avgViews: "90K",
  },
];

const followerRanges = [
  { label: "All", value: "all" },
  { label: "1M+", value: "1m+" },
  { label: "5M+", value: "5m+" },
  { label: "10M+", value: "10m+" },
  { label: "20M+", value: "20m+" },
]

const engagementRanges = [
  { label: "All", value: "all" },
  { label: "5%+", value: "5+" },
  { label: "10%+", value: "10+" },
  { label: "15%+", value: "15+" },
]

const roles = [
  { label: "All Roles", value: "all" },
  { label: "Athlete", value: "Athlete" },
  { label: "Coach", value: "Coach" },
  { label: "Media/Broadcaster", value: "Media/Broadcaster" },
  { label: "Influencer", value: "Influencer" },
]

// ---- Helpers
const formatNumber = (n: number) => new Intl.NumberFormat().format(n)

// Try to read events from localStorage; otherwise fallback to mocks
type EventItem = { id: string; name: string; date?: string }
const getEvents = (): EventItem[] => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("10x_events")
      if (raw) {
        const parsed = JSON.parse(raw) as EventItem[]
        if (Array.isArray(parsed) && parsed.length) return parsed
      }
    } catch {}
  }
  // Fallback demo events
  return [
    { id: "evt_1", name: "NBA Finals Watch Party", date: "2025-06-12" },
    { id: "evt_2", name: "College Football Championship", date: "2025-07-03" },
    { id: "evt_3", name: "US Open Tennis Activation", date: "2025-08-28" },
  ]
}

// ---- Card (supports grid & list + selection)
function CreatorCard({
  creator,
  view,
  checked,
  onToggle,
}: {
  creator: (typeof mockCreators)[0]
  view: "grid" | "list"
  checked: boolean
  onToggle: (id: number, next: boolean) => void
}) {
  if (view === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={checked}
                onCheckedChange={(val) => onToggle(creator.id, Boolean(val))}
                aria-label={`Select ${creator.name}`}
              />
              <Avatar className="h-16 w-16">
                <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                <AvatarFallback className="bg-brand-blue text-white text-lg">
                  {creator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{creator.name}</h3>
                  {creator.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{creator.username}</p>
                <p className="text-sm text-gray-500">{creator.bio}</p>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-center">
              <div>
                <p className="text-sm text-gray-500">Sport</p>
                <Badge variant="outline">{creator.sport}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="font-semibold">{creator.followers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="font-semibold text-green-600">{creator.engagement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Views</p>
                <p className="font-semibold">{creator.avgViews}</p>
              </div>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${checked ? "ring-2 ring-brand-blue" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(val) => onToggle(creator.id, Boolean(val))}
            aria-label={`Select ${creator.name}`}
          />
          <Avatar className="h-12 w-12">
            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
            <AvatarFallback className="bg-brand-blue text-white">
              {creator.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{creator.name}</CardTitle>
              {creator.verified && (
                <Badge variant="secondary" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>
            <CardDescription>{creator.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{creator.bio}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline">{creator.sport}</Badge>
          <Badge variant="secondary">{creator.role}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Followers</p>
            <p className="font-semibold flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {creator.followers}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Engagement</p>
            <p className="font-semibold text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {creator.engagement}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Posts</p>
            <p className="font-semibold">{creator.recentPosts}</p>
          </div>
          <div>
            <p className="text-gray-500">Avg Views</p>
            <p className="font-semibold">{creator.avgViews}</p>
          </div>
        </div>

        <Button className="w-full bg-transparent" size="sm" variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedFollowers, setSelectedFollowers] = useState("all")
  const [selectedEngagement, setSelectedEngagement] = useState("all")
  const [view, setView] = useState<"grid" | "list">("grid")

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [eventId, setEventId] = useState<string>("")
  const [message, setMessage] = useState("")
  const [contactOpen, setContactOpen] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  const filteredCreators = useMemo(() => {
    return mockCreators.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.bio.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSport = selectedSport === "all" || creator.sport === selectedSport
      const matchesRole = selectedRole === "all" || creator.role === selectedRole

      const matchesFollowers =
        selectedFollowers === "all" ||
        (selectedFollowers === "1m+" && creator.followersNum >= 1000000) ||
        (selectedFollowers === "5m+" && creator.followersNum >= 5000000) ||
        (selectedFollowers === "10m+" && creator.followersNum >= 10000000) ||
        (selectedFollowers === "20m+" && creator.followersNum >= 20000000)

      const matchesEngagement =
        selectedEngagement === "all" ||
        (selectedEngagement === "5+" && creator.engagementNum >= 5) ||
        (selectedEngagement === "10+" && creator.engagementNum >= 10) ||
        (selectedEngagement === "15+" && creator.engagementNum >= 15)

      return matchesSearch && matchesSport && matchesRole && matchesFollowers && matchesEngagement
    })
  }, [searchQuery, selectedSport, selectedRole, selectedFollowers, selectedEngagement])

  const selectedCreators = useMemo(
    () => mockCreators.filter((c) => selectedIds.includes(c.id)),
    [selectedIds],
  )

  const totals = useMemo(() => {
    const count = selectedCreators.length
    const totalFollowers = selectedCreators.reduce((sum, c) => sum + c.followersNum, 0)
    const avgEng =
      count === 0 ? 0 : selectedCreators.reduce((sum, c) => sum + c.engagementNum, 0) / count
    return { count, totalFollowers, avgEng }
  }, [selectedCreators])

  const toggleOne = (id: number, next: boolean) => {
    setSelectedIds((prev) => (next ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)))
  }

  const selectAllVisible = () => {
    setSelectedIds((prev) => {
      const visibleIds = filteredCreators.map((c) => c.id)
      const set = new Set(prev)
      visibleIds.forEach((id) => set.add(id))
      return Array.from(set)
    })
  }

  const clearSelection = () => setSelectedIds([])

  const handleExport = () => {
    // Mock export functionality
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Username,Sport,Role,Followers,Engagement,Location\n" +
      filteredCreators
        .map(
          (creator) =>
            `${creator.name},${creator.username},${creator.sport},${creator.role},${creator.followers},${creator.engagement},${creator.location}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "creators_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openContact = () => {
    setSent(false)
    setMessage("")
    setEventId(events[0]?.id || "")
    setContactOpen(true)
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock send to Admin
    // Normally you'd POST selectedIds, eventId, and message to backend
    setTimeout(() => {
      setSent(true)
      clearSelection()
    }, 400)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-captain text-3xl font-bold text-gray-900">Creators</h1>
          <p className="text-gray-600 mt-1">
            Discover and select creators. Use the calculator to review totals, then contact Admin for an event.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {/* Removed Add Creator (admins only) */}
        </div>
      </div>

      {/* Search + Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search creators by name, username, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Sport</Label>
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    {SPORTS.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Followers</Label>
                <Select value={selectedFollowers} onValueChange={setSelectedFollowers}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {followerRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Engagement</Label>
                <Select value={selectedEngagement} onValueChange={setSelectedEngagement}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {engagementRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results + Calculator layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: results */}
        <div className="lg:col-span-9 space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredCreators.length} of {mockCreators.length} creators
              {selectedIds.length > 0 && (
                <span className="ml-2 text-gray-900 font-medium">• {selectedIds.length} selected</span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={selectAllVisible}>
                Select All (this view)
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection} disabled={selectedIds.length === 0}>
                Clear
              </Button>
              <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {filteredCreators.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No creators found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </CardContent>
            </Card>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  view="grid"
                  checked={selectedIds.includes(creator.id)}
                  onToggle={toggleOne}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  view="list"
                  checked={selectedIds.includes(creator.id)}
                  onToggle={toggleOne}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Calculator / Actions */}
        <div className="lg:col-span-3">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                Selection Calculator
              </CardTitle>
              <CardDescription>Review totals, then contact Admin with your selection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Selected</p>
                  <p className="text-xl font-semibold">{totals.count}</p>
                </div>
                <div>
                  <p className="text-gray-500">Avg Engagement</p>
                  <p className="text-xl font-semibold">{totals.avgEng.toFixed(1)}%</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Total Followers</p>
                  <p className="text-2xl font-bold">{formatNumber(totals.totalFollowers)}</p>
                </div>
              </div>

              {selectedCreators.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Selected Creators</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCreators.slice(0, 6).map((c) => (
                      <Badge key={c.id} variant="outline">
                        {c.name}
                      </Badge>
                    ))}
                    {selectedCreators.length > 6 && (
                      <Badge variant="secondary">+{selectedCreators.length - 6} more</Badge>
                    )}
                  </div>
                </div>
              )}

              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={totals.count === 0}>
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Admin</DialogTitle>
                    <DialogDescription>
                      Select the event you&apos;re planning for and include a short note. Your selected creators will be
                      attached.
                    </DialogDescription>
                  </DialogHeader>

                  {sent ? (
                    <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                      Sent to Admin. We&apos;ll notify you when they respond.
                    </div>
                  ) : (
                    <form onSubmit={handleSend} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="event">Event</Label>
                        <Select value={eventId} onValueChange={setEventId}>
                          <SelectTrigger id="event">
                            <SelectValue placeholder="Choose an event" />
                          </SelectTrigger>
                          <SelectContent>
                            {events.map((e) => (
                              <SelectItem key={e.id} value={e.id}>
                                {e.name} {e.date ? `• ${e.date}` : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (optional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Context, deliverables, dates, budget range, etc."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setContactOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={!eventId}>
                          Send to Admin
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full" onClick={clearSelection} disabled={totals.count === 0}>
                Clear Selection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
