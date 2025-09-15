"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  StopCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Link2,
  Clock4,
  Activity,
  Gauge,
} from "lucide-react"

type Msg = { text: string; type: "info" | "success" | "error" }

export default function StreamingPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
  const statsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [streamUrl, setStreamUrl] = useState("")
  const [msg, setMsg] = useState<Msg | null>(null)
  const [fps, setFps] = useState<string>("N/A")
  const [dropped, setDropped] = useState<string>("N/A")
  const [buffer, setBuffer] = useState<string>("N/A")
  const [isPlaying, setIsPlaying] = useState(false)

  // FPS sampling
  const lastFrameSampleRef = useRef<{ t: number; total: number } | null>(null)

  // Load last used URL (nice DX)
  useEffect(() => {
    const last = typeof window !== "undefined" ? localStorage.getItem("stream_url") : null
    if (last) setStreamUrl(last)
  }, [])

  useEffect(() => {
    return () => {
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function showMessage(text: string, type: Msg["type"] = "info") {
    setMsg({ text, type })
  }

  function cleanup() {
    try {
      hlsRef.current?.destroy()
    } catch {}
    hlsRef.current = null
    if (statsTimerRef.current) {
      clearInterval(statsTimerRef.current)
      statsTimerRef.current = null
    }
    lastFrameSampleRef.current = null
    setIsPlaying(false)
    setFps("N/A")
    setDropped("N/A")
    setBuffer("N/A")
  }

  function startStatsTimer() {
    const v = videoRef.current
    if (!v) return
    if (statsTimerRef.current) clearInterval(statsTimerRef.current)

    statsTimerRef.current = setInterval(() => {
      let buf = 0
      try {
        buf = v.buffered.length ? v.buffered.end(v.buffered.length - 1) - v.currentTime : 0
      } catch {
        buf = 0
      }
      setBuffer(`${buf.toFixed(2)}s`)

      const anyVid = v as any
      const quality = typeof anyVid.getVideoPlaybackQuality === "function" ? anyVid.getVideoPlaybackQuality() : null
      const totalFrames: number = quality?.totalVideoFrames ?? anyVid.totalVideoFrames ?? 0
      const droppedFrames: number =
        quality?.droppedVideoFrames ?? anyVid.droppedVideoFrames ?? anyVid.webkitDroppedFrameCount ?? 0

      setDropped(Number.isFinite(droppedFrames) ? String(droppedFrames) : "N/A")

      const now = performance.now()
      if (Number.isFinite(totalFrames)) {
        if (lastFrameSampleRef.current) {
          const dt = (now - lastFrameSampleRef.current.t) / 1000
          const dFrames = totalFrames - lastFrameSampleRef.current.total
          const fpsVal = dt > 0 ? dFrames / dt : 0
          setFps(Number.isFinite(fpsVal) ? `${fpsVal.toFixed(1)}` : "N/A")
        }
        lastFrameSampleRef.current = { t: now, total: totalFrames }
      } else {
        setFps("N/A")
      }
    }, 1000)
  }

  async function loadAndPlay() {
    const url = streamUrl.trim()
    if (!url) {
      showMessage("Please enter a stream URL ending with .m3u8.", "error")
      return
    }
    if (!url.endsWith(".m3u8")) {
      showMessage("This preview expects an HLS playlist (.m3u8).", "error")
      return
    }

    // persist for convenience
    try {
      localStorage.setItem("stream_url", url)
    } catch {}

    cleanup()
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      showMessage("Hls.js is supported. Attempting to load stream…", "info")
      const hls = new Hls({ enableWorker: true })
      hlsRef.current = hls
      hls.loadSource(url)
      hls.attachMedia(video)

      hls.on(Hls.Events.MEDIA_ATTACHED, async () => {
        try {
          await video.play()
          showMessage("Stream successfully loaded and playing.", "success")
          setIsPlaying(true)
          startStatsTimer()
        } catch (e: any) {
          showMessage(`Autoplay was prevented. Click play. ${e?.message ?? ""}`, "error")
        }
      })

      hls.on(Hls.Events.ERROR, (_evt, data) => {
        const fatal = data.fatal
        let text = "An error occurred while loading the stream."
        if (fatal) text += " The error is fatal."
        console.error("[HLS ERROR]", data)
        showMessage(text, "error")
        setIsPlaying(false)
        setFps("N/A")
        setDropped("N/A")
        setBuffer("N/A")
      })
      return
    }

    // Native HLS (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      showMessage("HLS is natively supported. Attempting to load stream…", "info")
      video.src = url
      video.addEventListener(
        "loadedmetadata",
        async () => {
          try {
            await video.play()
            showMessage("Stream successfully loaded and playing.", "success")
            setIsPlaying(true)
            startStatsTimer()
          } catch (e: any) {
            showMessage(`Autoplay was prevented. Click play. ${e?.message ?? ""}`, "error")
          }
        },
        { once: true }
      )
    } else {
      showMessage("Your browser does not support HLS streaming.", "error")
    }
  }

  function stopPlayback() {
    try {
      const v = videoRef.current
      if (v) {
        v.pause()
        v.removeAttribute("src")
        v.load()
      }
    } catch {}
    cleanup()
    showMessage("Playback stopped and player reset.", "info")
  }

  function loadSample(url: string) {
    setStreamUrl(url)
    setTimeout(loadAndPlay, 0)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-captain text-3xl font-bold text-gray-900">Streaming</h1>
          <p className="text-gray-600 mt-1">
            Paste an HLS <code>.m3u8</code> URL and preview it. Ensure the stream server has CORS enabled and is reachable via HTTPS.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {isPlaying ? (
            <Badge className="bg-red-600 hover:bg-red-600">● Live</Badge>
          ) : (
            <Badge variant="outline">Idle</Badge>
          )}
        </div>
      </div>

      {/* Player */}
      <Card className="overflow-hidden border-white/10">
        {/* Video banner */}
        <div className="relative w-full bg-gradient-to-b from-[#0f1f2e] to-black">
          <div className="aspect-video relative">
            <video ref={videoRef} className="absolute inset-0 h-full w-full" controls playsInline preload="metadata" />
            {isPlaying && (
              <div className="absolute left-4 top-4">
                <Badge className="bg-red-600 hover:bg-red-600">● Live</Badge>
              </div>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">Event Live Stream Test</CardTitle>
          <CardDescription>
            Connect your encoder (e.g., OBS → Nginx-RTMP → HLS) and paste the public playlist URL below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* URL + actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                id="streamUrlInput"
                placeholder="Enter your .m3u8 stream URL here…"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadAndPlay()}
                className="pr-24"
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <Button variant="outline" size="sm" onClick={() => setStreamUrl("")}>
                  Clear
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.readText().then(setStreamUrl)}>
                  Paste
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={loadAndPlay} className="bg-brand-blue hover:bg-brand-blue/90">
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <Button variant="outline" onClick={stopPlayback}>
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>

          {/* Quick samples */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Link2 className="h-3.5 w-3.5" />
              Quick test links:
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => loadSample("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")}
            >
              Mux Test
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => loadSample("https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8")}
            >
              Sintel
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => loadSample("https://test-streams.mux.dev/pts_shift/master.m3u8")}
            >
              PTS Shift
            </Button>
          </div>

          {/* Message */}
          {msg && (
            <div
              className={
                "flex items-start gap-2 rounded-md border p-3 text-sm " +
                (msg.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : msg.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-gray-50 border-gray-200 text-gray-800")
              }
            >
              {msg.type === "error" ? (
                <AlertTriangle className="h-4 w-4 mt-0.5" />
              ) : msg.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
              ) : (
                <Info className="h-4 w-4 mt-0.5" />
              )}
              <span>{msg.text}</span>
            </div>
          )}

          <Separator />

          {/* Stats: compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border bg-white p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Activity className="h-3.5 w-3.5" />
                Framerate
              </div>
              <div className="text-2xl font-bold mt-1">{fps}</div>
              <div className="text-xs text-gray-500">frames / second (approx.)</div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Gauge className="h-3.5 w-3.5" />
                Dropped Frames
              </div>
              <div className="text-2xl font-bold mt-1">{dropped}</div>
              <div className="text-xs text-gray-500">since playback start</div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock4 className="h-3.5 w-3.5" />
                Buffer
              </div>
              <div className="text-2xl font-bold mt-1">{buffer}</div>
              <div className="text-xs text-gray-500">seconds ahead</div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            If playback fails, verify CORS headers on your HLS server and that the URL is publicly reachable over HTTPS.
            Some browsers block mixed content (HTTP media on HTTPS sites).
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
