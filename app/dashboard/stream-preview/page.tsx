"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Play, CheckCircle2, AlertTriangle, Info } from "lucide-react"

type Msg = { text: string; type: "info" | "success" | "error" }

export default function StreamPreviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
  const statsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [streamUrl, setStreamUrl] = useState("")
  const [msg, setMsg] = useState<Msg | null>(null)
  const [fps, setFps] = useState<string>("N/A")
  const [dropped, setDropped] = useState<string>("N/A")
  const [buffer, setBuffer] = useState<string>("N/A")

  // Track FPS via total frames delta / time
  const lastFrameSampleRef = useRef<{ t: number; total: number } | null>(null)

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
      if (statsTimerRef.current) {
        clearInterval(statsTimerRef.current)
        statsTimerRef.current = null
      }
    }
  }, [])

  function showMessage(text: string, type: Msg["type"] = "info") {
    setMsg({ text, type })
  }

  function startStatsTimer() {
    if (!videoRef.current) return
    if (statsTimerRef.current) clearInterval(statsTimerRef.current)

    statsTimerRef.current = setInterval(() => {
      const v = videoRef.current!
      // Buffer length
      let buf = 0
      try {
        buf = v.buffered.length ? v.buffered.end(v.buffered.length - 1) - v.currentTime : 0
      } catch {
        buf = 0
      }
      setBuffer(`${buf.toFixed(2)}s`)

      // Dropped / total frames + FPS
      const anyVid = v as any
      const quality = typeof anyVid.getVideoPlaybackQuality === "function" ? anyVid.getVideoPlaybackQuality() : null
      const totalFrames: number =
        quality?.totalVideoFrames ?? anyVid.totalVideoFrames ?? 0
      const droppedFrames: number =
        quality?.droppedVideoFrames ??
        anyVid.droppedVideoFrames ??
        anyVid.webkitDroppedFrameCount ??
        0

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

    // reset previous
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }
    if (statsTimerRef.current) {
      clearInterval(statsTimerRef.current)
      statsTimerRef.current = null
    }
    setFps("N/A")
    setDropped("N/A")
    setBuffer("N/A")
    lastFrameSampleRef.current = null

    const video = videoRef.current
    if (!video) return

    // HLS.js path
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
          startStatsTimer()
        } catch (e: any) {
          showMessage(`Autoplay was prevented. Click the play button. ${e?.message ?? ""}`, "error")
        }
      })

      hls.on(Hls.Events.ERROR, (_evt, data) => {
        const fatal = data.fatal
        let text = "An error occurred while loading the stream."
        if (fatal) text += " The error is fatal."
        console.error("[HLS ERROR]", data)
        showMessage(text, "error")
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
            startStatsTimer()
          } catch (e: any) {
            showMessage(`Autoplay was prevented. Click the play button. ${e?.message ?? ""}`, "error")
          }
        },
        { once: true }
      )
    } else {
      showMessage("Your browser does not support HLS streaming.", "error")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-gray-900">Demo Stream Preview</h1>
        <p className="text-gray-600 mt-1">
          Paste an HLS <code>.m3u8</code> URL and preview it here. Ensure your stream server has CORS enabled and is reachable over HTTPS.
        </p>
      </div>

      {/* Player Card */}
      <Card className="overflow-hidden">
        {/* Video area with 16:9 ratio */}
        <div className="relative w-full bg-black">
          <div className="aspect-video">
            <video
              ref={videoRef}
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl">Event Live Stream Test</CardTitle>
          <CardDescription>
            This player is ready to receive a live HLS stream (e.g., from an Nginx-RTMP→HLS pipeline). Enter your playlist URL and click play.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="streamUrlInput"
              placeholder="Enter your .m3u8 stream URL here…"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") loadAndPlay()
              }}
            />
            <Button onClick={loadAndPlay} className="bg-brand-blue hover:bg-brand-blue/90">
              <Play className="h-4 w-4 mr-2" />
              Load & Play Stream
            </Button>
          </div>

          {/* Message box */}
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

          {/* Stats */}
          <div className="rounded-md border bg-gray-50 p-4 text-sm">
            <p className="font-medium">Stream Statistics</p>
            <ul className="mt-2 list-inside list-disc">
              <li>Framerate: {fps}</li>
              <li>Dropped Frames: {dropped}</li>
              <li>Buffer: {buffer}</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500">
            Tip: If playback fails, check your HLS server’s CORS headers and confirm the URL is publicly reachable. Some browsers block non-HTTPS media on HTTPS sites.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
