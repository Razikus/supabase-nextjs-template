"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Upload,
  ImageIcon,
  Video,
  Save,
  Send,
  Eye,
  X,
  FileText,
  ShieldCheck,
  Megaphone,
  Globe,
  Music,
  Hash,
  AtSign,
  MonitorPlay,      // ✅ added import
  Link as LinkIcon,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { SPORTS } from "@/lib/constants"

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Ultimate Pool Knockout Stage",
    description: "Live knockout round coverage and analysis.",
    sport: "Pool",
    date: "2025-06-08",
    time: "19:00",
    venue: "Morningside Arena, Leicester",
    status: "scheduled",
    viewers: "0",
    creators: ["CueMaster TV", "RackEmUp"],
  },
  {
    id: 2,
    title: "Goodwood Festival of Speed 2025 Weekend",
    description: "Hillclimb runs, paddock access, and creator interviews all weekend.",
    sport: "Motorsport",
    date: "2025-07-12",
    time: "10:00",
    venue: "Goodwood House, West Sussex",
    status: "scheduled",
    viewers: "0",
    creators: ["CarThrottle", "AutoFocus"],
  },
  {
    id: 3,
    title: "WTT — World Table Tennis Semi-Final",
    description: "High-intensity semifinal with live commentary and highlights.",
    sport: "Tennis",
    date: "2025-04-26",
    time: "15:30",
    venue: "Singapore Indoor Stadium",
    status: "scheduled",
    viewers: "0",
    creators: ["TableTennisDaily", "PingSkills"],
  },
];

// Simple sport → image map (local /public assets)
const SPORT_IMAGE_MAP: Record<string, string> = {
  Basketball: "/basketball-player.png",
  Football: "/tom-brady-football-player.png",
  Soccer: "/alex-morgan-soccer-player.png",
  Tennis: "/table-tennis-img.jpg",
  Motorsport: "/motosport-img.jpg",
  Pool: "/pool-img.jpg",
}
const DEFAULT_SPORT_IMAGE = "/sports-stadium-with-athletes-training-dynamic-acti.png"

const eventTypes = [
  { label: "Live Game", value: "live-game" },
  { label: "Press Conference", value: "press-conference" },
  { label: "Training Session", value: "training" },
  { label: "Interview", value: "interview" },
  { label: "Documentary", value: "documentary" },
  { label: "Highlights", value: "highlights" },
]

const venues = [
  "Madison Square Garden, New York",
  "Staples Center, Los Angeles",
  "TD Garden, Boston",
  "United Center, Chicago",
  "American Airlines Arena, Miami",
  "Oracle Arena, San Francisco",
  "Custom Location...",
]

function EventCard({ event }: { event: (typeof mockEvents)[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const imgSrc = SPORT_IMAGE_MAP[event.sport] ?? DEFAULT_SPORT_IMAGE

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      {/* Top sport image */}
      <div className="relative h-40 sm:h-44 w-full">
        <Image
          src={imgSrc}
          alt={`${event.sport} image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="mt-1">{event.description}</CardDescription>
          </div>
          <Badge className={cn("text-white", getStatusColor(event.status))}>{event.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {event.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {event.time}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {event.venue}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline">{event.sport}</Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Eye className="h-4 w-4 mr-1" />
            {event.viewers} viewers
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {event.creators.map((creator) => (
              <Badge key={creator} variant="secondary" className="text-xs">
                {creator}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const DEFAULT_PROMO = `• Must post at least one promotional social post (story) 24h before the event.
• Must tag our official league account in all promotional posts.
• Must link to the official league website or streaming service in the stream description.
• Must use the official hashtag of the event.
• Must not swear, use profanities, or encourage abuse.`

function CreateEventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "",
    eventType: "",
    date: undefined as Date | undefined,
    time: "",
    venue: "",
    customVenue: "",
    isLive: false,
    isPublic: true,
    allowComments: true,
    enableChat: true,
    maxViewers: "",
    tags: [] as string[],
    creators: [] as string[],

    rights: {
      restrictionMode: "permitted" as "permitted" | "restricted",
      countries: [] as string[],
      watchAlong: true,
      highlights: true,
      clipLengthSec: "30",
      clipTimeframeHours: "24",
      attribution: "Must link to the official broadcast.",
      musicAllowed: false,
      musicNotes: "You may use live stadium audio, but not the broadcast theme music.",
      sponsorshipNotes:
        "Creators are prohibited from accepting sponsorships from energy drink or automotive competitors to official sponsors.",
    },

    promotion: {
      requirements: DEFAULT_PROMO,
      tagOfficial: true,
      officialHandle: "@OfficialLeague",
      linkOfficial: true,
      officialUrl: "https://league.example.com/watch",
      useHashtag: true,
      officialHashtag: "#LeagueFinals",
      familyFriendly: true,
    },
  })

  const [newTag, setNewTag] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const [countryInput, setCountryInput] = useState("")
  const addCountry = () => {
    const c = countryInput.trim()
    if (!c) return
    if (!formData.rights.countries.includes(c)) {
      setFormData((prev) => ({ ...prev, rights: { ...prev.rights, countries: [...prev.rights.countries, c] } }))
    }
    setCountryInput("")
  }
  const removeCountry = (c: string) => {
    setFormData((prev) => ({
      ...prev,
      rights: { ...prev.rights, countries: prev.rights.countries.filter((x) => x !== c) },
    }))
  }

  const handleSubmit = (action: "draft" | "schedule" | "publish") => {
    console.log("Submitting event:", { ...formData, action })
    onClose()
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleFileUpload = (type: "image" | "video") => {
    const fileName = `${type}_${Date.now()}.${type === "image" ? "jpg" : "mp4"}`
    setUploadedFiles((prev) => [...prev, fileName])
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Create New Event</CardTitle>
            <CardDescription>Set up a new sports event for your network</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="media">Media & Assets</TabsTrigger>
            <TabsTrigger value="rights">Rights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="promotion">Promotion</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          {/* DETAILS */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="NBA Finals Game 7"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sport *</Label>
                    <Select
                      value={formData.sport}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, sport: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPORTS.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Event Type</Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, eventType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !formData.date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Select
                    value={formData.venue}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, venue: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.venue === "Custom Location..." && (
                  <div className="space-y-2">
                    <Label htmlFor="customVenue">Custom Venue</Label>
                    <Input
                      id="customVenue"
                      placeholder="Enter venue name and location"
                      value={formData.customVenue}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customVenue: e.target.value }))}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Add
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* MEDIA */}
          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Images
                  </CardTitle>
                  <CardDescription>Upload event images, logos, and promotional materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
                    <Button variant="outline" onClick={() => handleFileUpload("image")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Videos
                  </CardTitle>
                  <CardDescription>Upload promotional videos, highlights, or teasers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Drag and drop videos here, or click to browse</p>
                    <Button variant="outline" onClick={() => handleFileUpload("video")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Videos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Uploaded Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFiles((prev) => prev.filter((f) => f !== file))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* RIGHTS */}
          <TabsContent value="rights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Rights Offered to Creator
                </CardTitle>
                <CardDescription>Control territories and usage permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Geo restrictions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <Label className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Restriction Mode
                    </Label>
                    <Select
                      value={formData.rights.restrictionMode}
                      onValueChange={(value: "permitted" | "restricted") =>
                        setFormData((prev) => ({ ...prev, rights: { ...prev.rights, restrictionMode: value } }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permitted">Permitted Countries List</SelectItem>
                        <SelectItem value="restricted">Restricted Countries List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Countries</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a country and click Add (e.g., Japan)"
                        value={countryInput}
                        onChange={(e) => setCountryInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCountry())}
                      />
                      <Button type="button" size="sm" onClick={addCountry}>
                        Add
                      </Button>
                    </div>
                    {formData.rights.countries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.rights.countries.map((c) => (
                          <Badge key={c} variant="secondary" className="cursor-pointer" onClick={() => removeCountry(c)}>
                            {c} <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.rights.restrictionMode === "permitted"
                        ? "Only viewers in these countries may watch the creator's stream."
                        : "Viewers in these countries are blocked from watching the creator's stream."}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Watch-along */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="flex items-center">
                      <MonitorPlay className="h-4 w-4 mr-2" />
                      Watch-Along Rights
                    </Label>
                    <p className="text-sm text-gray-600">Allow commentary/reaction without displaying the live feed.</p>
                  </div>
                  <Switch
                    checked={formData.rights.watchAlong}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, rights: { ...prev.rights, watchAlong: checked } }))
                    }
                  />
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Highlights / Clip Rights</Label>
                      <p className="text-sm text-gray-600">Permit short clips for highlights and social posts.</p>
                    </div>
                    <Switch
                      checked={formData.rights.highlights}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, rights: { ...prev.rights, highlights: checked } }))
                      }
                    />
                  </div>

                  {formData.rights.highlights && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clipLength">Max Clip Length (sec)</Label>
                        <Input
                          id="clipLength"
                          type="number"
                          min={1}
                          value={formData.rights.clipLengthSec}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              rights: { ...prev.rights, clipLengthSec: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clipWindow">Timeframe for Use (hours)</Label>
                        <Input
                          id="clipWindow"
                          type="number"
                          min={1}
                          value={formData.rights.clipTimeframeHours}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              rights: { ...prev.rights, clipTimeframeHours: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="attr">Attribution Requirements</Label>
                        <Input
                          id="attr"
                          placeholder="e.g., Must link to the official broadcast"
                          value={formData.rights.attribution}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, rights: { ...prev.rights, attribution: e.target.value } }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Music / Audio */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center">
                        <Music className="h-4 w-4 mr-2" />
                        Music / Audio Rights
                      </Label>
                      <p className="text-sm text-gray-600">Control usage of broadcast/stadium audio.</p>
                    </div>
                    <Switch
                      checked={formData.rights.musicAllowed}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, rights: { ...prev.rights, musicAllowed: checked } }))
                      }
                    />
                  </div>
                  <Textarea
                    placeholder='Specific instructions, e.g. "You may use the live stadium audio, but not the broadcast theme music."'
                    value={formData.rights.musicNotes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, rights: { ...prev.rights, musicNotes: e.target.value } }))
                    }
                  />
                </div>

                {/* Sponsorship */}
                <div className="space-y-2">
                  <Label>Sponsorship Rights / Restrictions</Label>
                  <Textarea
                    rows={4}
                    placeholder='List restricted brands/categories, e.g. "No energy drink or automotive competitors to official sponsors."'
                    value={formData.rights.sponsorshipNotes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, rights: { ...prev.rights, sponsorshipNotes: e.target.value } }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Streaming Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isLive">Live Stream</Label>
                      <p className="text-sm text-gray-600">Enable live streaming for this event</p>
                    </div>
                    <Switch
                      id="isLive"
                      checked={formData.isLive}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isLive: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableChat">Enable Chat</Label>
                      <p className="text-sm text-gray-600">Allow viewers to chat during the event</p>
                    </div>
                    <Switch
                      id="enableChat"
                      checked={formData.enableChat}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enableChat: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxViewers">Max Viewers (optional)</Label>
                    <Input
                      id="maxViewers"
                      type="number"
                      placeholder="Unlimited"
                      value={formData.maxViewers}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxViewers: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Privacy & Interaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isPublic">Public Event</Label>
                      <p className="text-sm text-gray-600">Make this event visible to everyone</p>
                    </div>
                    <Switch
                      id="isPublic"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowComments">Allow Comments</Label>
                      <p className="text-sm text-gray-600">Let viewers comment on the event</p>
                    </div>
                    <Switch
                      id="allowComments"
                      checked={formData.allowComments}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, allowComments: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PROMOTION */}
          <TabsContent value="promotion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Megaphone className="h-5 w-5 mr-2" />
                  Promotion Requirements
                </CardTitle>
                <CardDescription>Set creator obligations to promote the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Promotion Requirements (Description)</Label>
                  <Textarea
                    rows={6}
                    value={formData.promotion.requirements}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, promotion: { ...prev.promotion, requirements: e.target.value } }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center">
                          <AtSign className="h-4 w-4 mr-2" />
                          Must Tag Official Account
                        </Label>
                        <p className="text-xs text-gray-500">Enforce tagging on all promo posts.</p>
                      </div>
                      <Switch
                        checked={formData.promotion.tagOfficial}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, promotion: { ...prev.promotion, tagOfficial: checked } }))
                        }
                      />
                    </div>
                    {formData.promotion.tagOfficial && (
                      <Input
                        placeholder="@OfficialLeague"
                        value={formData.promotion.officialHandle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            promotion: { ...prev.promotion, officialHandle: e.target.value },
                          }))
                        }
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Must Link to Official Site/Stream
                        </Label>
                        <p className="text-xs text-gray-500">Require an official link in description.</p>
                      </div>
                      <Switch
                        checked={formData.promotion.linkOfficial}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, promotion: { ...prev.promotion, linkOfficial: checked } }))
                        }
                      />
                    </div>
                    {formData.promotion.linkOfficial && (
                      <Input
                        placeholder="https://league.example.com/watch"
                        value={formData.promotion.officialUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            promotion: { ...prev.promotion, officialUrl: e.target.value },
                          }))
                        }
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center">
                          <Hash className="h-4 w-4 mr-2" />
                          Must Use Official Hashtag
                        </Label>
                        <p className="text-xs text-gray-500">Ensure consistent campaign tracking.</p>
                      </div>
                      <Switch
                        checked={formData.promotion.useHashtag}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, promotion: { ...prev.promotion, useHashtag: checked } }))
                        }
                      />
                    </div>
                    {formData.promotion.useHashtag && (
                      <Input
                        placeholder="#LeagueFinals"
                        value={formData.promotion.officialHashtag}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            promotion: { ...prev.promotion, officialHashtag: e.target.value },
                          }))
                        }
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Family-Friendly Content</Label>
                        <p className="text-xs text-gray-500">No swearing, profanities, or abusive content.</p>
                      </div>
                      <Switch
                        checked={formData.promotion.familyFriendly}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, promotion: { ...prev.promotion, familyFriendly: checked } }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PUBLISH */}
          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ready to Publish?</CardTitle>
                <CardDescription>Review your event details and choose how to publish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Event Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Title:</strong> {formData.title || "Untitled Event"}
                    </p>
                    <p>
                      <strong>Sport:</strong> {formData.sport || "Not selected"}
                    </p>
                    <p>
                      <strong>Date:</strong> {formData.date ? format(formData.date, "PPP") : "Not set"} at{" "}
                      {formData.time || "No time"}
                    </p>
                    <p>
                      <strong>Venue:</strong> {formData.venue || "Not selected"}
                    </p>
                    <p>
                      <strong>Type:</strong> {formData.isLive ? "Live Stream" : "Scheduled Event"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={() => handleSubmit("draft")} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline" onClick={() => handleSubmit("schedule")} className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule for Later
                  </Button>
                  <Button onClick={() => handleSubmit("publish")} className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                    <Send className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function EventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  if (showCreateForm) {
    return <CreateEventForm onClose={() => setShowCreateForm(false)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-captain text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Create and manage sports events for your network</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
