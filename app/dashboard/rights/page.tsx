"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { X, Globe2, ShieldCheck, Scissors, Music, CircleSlash2, Save, Send } from "lucide-react"

// --- Mock: events to apply these rights to (replace with real data later)
const mockEvents = [
  { id: "evt_1", title: "NBA Finals Game 7" },
  { id: "evt_2", title: "College Football Championship" },
  { id: "evt_3", title: "Women's World Cup Final" },
]

// --- Simple country list for suggestions (type then press Enter to add)
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Brazil",
  "Mexico",
  "India",
  "China",
  "South Korea",
  "Argentina",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Ireland",
  "Portugal",
  "Poland",
  "Turkey",
  "South Africa",
  "United Arab Emirates",
]

type FormState = {
  eventId: string
  permittedCountries: string[]
  restrictedCountries: string[]
  watchAlong: boolean
  clipRights: boolean
  clipLengthSec: string
  clipTimeframeHours: string
  clipAttribution: string
  musicAudio: boolean
  musicNotes: string
  sponsorshipNotes: string
  restrictedBrands: string[]
}

export default function RightsPage() {
  const [form, setForm] = useState<FormState>({
    eventId: mockEvents[0]?.id ?? "",
    permittedCountries: [],
    restrictedCountries: [],
    watchAlong: true,
    clipRights: true,
    clipLengthSec: "30",
    clipTimeframeHours: "24",
    clipAttribution: "Must link to the official broadcast.",
    musicAudio: false,
    musicNotes: "You may use live stadium ambience. Do not use broadcast theme music.",
    sponsorshipNotes:
      "Creators are prohibited from accepting sponsorships from direct competitors to our official sponsors.",
    restrictedBrands: ["Energy drink category", "Automotive category"],
  })

  // inputs for token fields
  const [permInput, setPermInput] = useState("")
  const [restInput, setRestInput] = useState("")
  const [brandInput, setBrandInput] = useState("")

  const selectedEvent = useMemo(
    () => mockEvents.find((e) => e.id === form.eventId),
    [form.eventId]
  )

  // --- helpers: add/remove tokens
  const addToken = (value: string, key: "permittedCountries" | "restrictedCountries" | "restrictedBrands") => {
    const clean = value.trim()
    if (!clean) return
    setForm((prev) => {
      const already = new Set(prev[key].map((v) => v.toLowerCase()))
      if (already.has(clean.toLowerCase())) return prev
      return { ...prev, [key]: [...prev[key], clean] }
    })
  }

  const removeToken = (value: string, key: "permittedCountries" | "restrictedCountries" | "restrictedBrands") => {
    setForm((prev) => ({ ...prev, [key]: prev[key].filter((v) => v !== value) }))
  }

  // --- submit handlers (stubbed)
  const handleSaveDraft = () => {
    console.log("[Rights] Save Draft", form)
    alert("Rights saved as draft (mock). Check console for payload.")
  }

  const handleApplyToEvent = () => {
    console.log("[Rights] Save & Apply to Event", { event: selectedEvent, rights: form })
    alert(`Rights applied to "${selectedEvent?.title}" (mock). Check console for payload.`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Event Rights</h1>
          <p className="text-gray-600 mt-1">
            Define what creators are permitted to do for a specific event or as a template.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-blue/90" onClick={handleApplyToEvent}>
            <Send className="mr-2 h-4 w-4" />
            Save & Apply to Event
          </Button>
        </div>
      </div>

      {/* Apply To (Event) */}
      <Card>
        <CardHeader>
          <CardTitle>Apply To</CardTitle>
          <CardDescription>Select an event to apply these rights (or leave for a reusable template)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label className="mb-2 block">Event</Label>
            <Select
              value={form.eventId}
              onValueChange={(v) => setForm((p) => ({ ...p, eventId: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose event" />
              </SelectTrigger>
              <SelectContent>
                {mockEvents.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-blue-600" />
            Geographic Restrictions
          </CardTitle>
          <CardDescription>
            Specify countries where a creator <strong>is allowed</strong> or <strong>is restricted</strong> from streaming.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <datalist id="country-suggestions">
            {COUNTRIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Permitted */}
            <div>
              <Label className="mb-2 block">Permitted Countries</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a country and press Enter"
                  list="country-suggestions"
                  value={permInput}
                  onChange={(e) => setPermInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addToken(permInput, "permittedCountries")
                      setPermInput("")
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addToken(permInput, "permittedCountries")
                    setPermInput("")
                  }}
                >
                  Add
                </Button>
              </div>
              {form.permittedCountries.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.permittedCountries.map((c) => (
                    <Badge key={c} variant="secondary" className="px-2 py-1">
                      {c}
                      <button
                        className="ml-2 opacity-70 hover:opacity-100"
                        onClick={() => removeToken(c, "permittedCountries")}
                        aria-label={`Remove ${c}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to permit all countries (unless restricted).
              </p>
            </div>

            {/* Restricted */}
            <div>
              <Label className="mb-2 block">Restricted Countries</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a country and press Enter"
                  list="country-suggestions"
                  value={restInput}
                  onChange={(e) => setRestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addToken(restInput, "restrictedCountries")
                      setRestInput("")
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addToken(restInput, "restrictedCountries")
                    setRestInput("")
                  }}
                >
                  Add
                </Button>
              </div>
              {form.restrictedCountries.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.restrictedCountries.map((c) => (
                    <Badge key={c} variant="destructive" className="px-2 py-1">
                      {c}
                      <button
                        className="ml-2 opacity-70 hover:opacity-100"
                        onClick={() => removeToken(c, "restrictedCountries")}
                        aria-label={`Remove ${c}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Use this when you have local broadcast deals (e.g., restrict Japan).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watch-Along Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Watch-Along Rights
          </CardTitle>
          <CardDescription>
            Allow creators to provide commentary/reaction without showing the live video feed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <Label className="block">Enabled</Label>
            <p className="text-sm text-gray-600">
              Keeps control of the main broadcast while leveraging creator audiences.
            </p>
          </div>
          <Switch
            checked={form.watchAlong}
            onCheckedChange={(v) => setForm((p) => ({ ...p, watchAlong: v }))}
          />
        </CardContent>
      </Card>

      {/* Highlights / Clips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-yellow-600" />
            Highlights / Clip Rights
          </CardTitle>
          <CardDescription>Grant use of short clips for highlight reels or social posts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="block">Enabled</Label>
              <p className="text-sm text-gray-600">Control clip length, timeframe, and attribution.</p>
            </div>
            <Switch
              checked={form.clipRights}
              onCheckedChange={(v) => setForm((p) => ({ ...p, clipRights: v }))}
            />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${!form.clipRights ? "opacity-50 pointer-events-none" : ""}`}>
            <div>
              <Label className="mb-2 block">Max Clip Length (seconds)</Label>
              <Input
                type="number"
                min={5}
                value={form.clipLengthSec}
                onChange={(e) => setForm((p) => ({ ...p, clipLengthSec: e.target.value }))}
              />
            </div>
            <div>
              <Label className="mb-2 block">Timeframe for Use (hours)</Label>
              <Input
                type="number"
                min={1}
                value={form.clipTimeframeHours}
                onChange={(e) => setForm((p) => ({ ...p, clipTimeframeHours: e.target.value }))}
              />
            </div>
            <div>
              <Label className="mb-2 block">Attribution Requirements</Label>
              <Input
                placeholder="e.g., Must link to official broadcast"
                value={form.clipAttribution}
                onChange={(e) => setForm((p) => ({ ...p, clipAttribution: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Music / Audio Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-600" />
            Music / Audio Rights
          </CardTitle>
          <CardDescription>Clarify what audio from the official feed can be used.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="block">Enabled</Label>
              <p className="text-sm text-gray-600">
                Control use of broadcast music, stadium sounds, and effects.
              </p>
            </div>
            <Switch
              checked={form.musicAudio}
              onCheckedChange={(v) => setForm((p) => ({ ...p, musicAudio: v }))}
            />
          </div>
          <Textarea
            placeholder='e.g., "You may use live stadium audio, but not the broadcast theme music."'
            value={form.musicNotes}
            onChange={(e) => setForm((p) => ({ ...p, musicNotes: e.target.value }))}
            className={!form.musicAudio ? "opacity-50 pointer-events-none" : ""}
          />
        </CardContent>
      </Card>

      {/* Sponsorship Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleSlash2 className="h-5 w-5 text-red-600" />
            Sponsorship Rights
          </CardTitle>
          <CardDescription>
            Protect existing revenue streams. Specify rules and restricted brands.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">Guidelines / Restrictions</Label>
            <Textarea
              rows={4}
              placeholder='e.g., "Creators may not accept sponsors from energy drink or automotive categories."'
              value={form.sponsorshipNotes}
              onChange={(e) => setForm((p) => ({ ...p, sponsorshipNotes: e.target.value }))}
            />
          </div>

          <div>
            <Label className="mb-2 block">Restricted Brands / Categories</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Type a brand or category, press Enter"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addToken(brandInput, "restrictedBrands")
                    setBrandInput("")
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  addToken(brandInput, "restrictedBrands")
                  setBrandInput("")
                }}
              >
                Add
              </Button>
            </div>

            {form.restrictedBrands.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.restrictedBrands.map((b) => (
                  <Badge key={b} variant="outline" className="px-2 py-1">
                    {b}
                    <button
                      className="ml-2 opacity-70 hover:opacity-100"
                      onClick={() => removeToken(b, "restrictedBrands")}
                      aria-label={`Remove ${b}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer actions (duplicate for convenience on long forms) */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={handleSaveDraft}>
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button className="bg-brand-blue hover:bg-brand-blue/90" onClick={handleApplyToEvent}>
          <Send className="mr-2 h-4 w-4" />
          Save & Apply to Event
        </Button>
      </div>
    </div>
  )
}
